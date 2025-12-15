const express = require('express');
const { body, validationResult } = require('express-validator');
const { getDb } = require('../database/db');
const { authenticate, authorize } = require('../middleware/auth');
const { differenceInDays, parseISO, isAfter, addDays, startOfDay } = require('date-fns');
const emailService = require('../services/emailService');
const XLSX = require('xlsx');

const router = express.Router();

// Public endpoint - Create visit request (No login required)
router.post('/public', [
  body('start_date').isISO8601().withMessage('Valid start date is required'),
  body('end_date').optional().isISO8601().withMessage('Valid end date is required'),
  body('purpose').trim().notEmpty().withMessage('Visiting purpose is required'),
  body('company_name').trim().notEmpty().withMessage('Company name is required'),
  body('contact_number').trim().notEmpty().withMessage('Contact number is required'),
  body('visitor_name').trim().notEmpty().withMessage('Your name is required'),
  body('visitor_email').isEmail().withMessage('Valid email is required'),
  body('coming_from').trim().notEmpty().withMessage('Coming from location is required'),
  body('visitor_type').isIn(['Internal', 'External']).withMessage('Visitor type must be Internal or External'),
  body('number_of_visitors').isInt({ min: 1 }).withMessage('Number of visitors must be at least 1'),
  body('additional_visitor_names').optional().trim()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { start_date, end_date, purpose, company_name, contact_number, number_of_visitors, visitor_name, visitor_email, additional_visitor_names, coming_from, visitor_type } = req.body;
  
  // Validate Internal employees must use @tvs.in email
  if (visitor_type === 'Internal' && visitor_email && !visitor_email.endsWith('@tvs.in')) {
    return res.status(400).json({ 
      error: 'Internal employees must use @tvs.in email address' 
    });
  }
  
  const db = getDb();

  try {
    const startDate = parseISO(start_date);
    const endDateValue = end_date ? parseISO(end_date) : startDate;
    const today = startOfDay(new Date());
    const minDate = addDays(today, 2);

    // Check if start date is at least 2 days from today
    if (!isAfter(startDate, minDate) && differenceInDays(startDate, today) < 2) {
      return res.status(400).json({ 
        error: 'Start date must be at least 2 days from today' 
      });
    }

    // Check if end date is after start date
    if (end_date && isAfter(startDate, endDateValue)) {
      return res.status(400).json({ 
        error: 'End date must be after or equal to start date' 
      });
    }

    // Use start_date as visit_date for backward compatibility
    const visit_date = start_date;

    db.run(
      `INSERT INTO visit_requests 
       (visitor_id, visitor_name, visitor_email, visit_date, start_date, end_date, purpose, company_name, contact_number, number_of_visitors, additional_visitor_names, coming_from, visitor_type, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [null, visitor_name, visitor_email, visit_date, start_date, end_date || start_date, purpose, company_name, contact_number, number_of_visitors || 1, additional_visitor_names || null, coming_from || null, visitor_type],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to create visit request' });
        }

        // Get the created request
        db.get(
          `SELECT r.*, m.name as manager_name 
           FROM visit_requests r
           LEFT JOIN users m ON r.manager_id = m.id
           WHERE r.id = ?`,
          [this.lastID],
          async (err, request) => {
            if (err) {
              return res.status(500).json({ error: 'Failed to fetch created request' });
            }
            
            // Send emails asynchronously (don't wait for them)
            emailService.sendRequestSubmittedEmail(request).catch(err => 
              console.error('Failed to send submission email:', err)
            );
            emailService.sendNewRequestNotificationEmail(request).catch(err => 
              console.error('Failed to send notification email:', err)
            );
            
            res.status(201).json({ 
              request,
              message: 'Visit request submitted successfully! The warehouse manager will review your request.'
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(400).json({ error: 'Invalid date format' });
  }
});

// Create visit request (Authenticated Visitor only)
router.post('/', authenticate, authorize('visitor'), [
  body('start_date').isISO8601().withMessage('Valid start date is required'),
  body('end_date').optional().isISO8601().withMessage('Valid end date is required'),
  body('purpose').trim().notEmpty().withMessage('Purpose is required'),
  body('company_name').trim().notEmpty().withMessage('Company name is required'),
  body('contact_number').trim().notEmpty().withMessage('Contact number is required'),
  body('number_of_visitors').isInt({ min: 1 }).withMessage('Number of visitors must be at least 1')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { start_date, end_date, purpose, company_name, contact_number, number_of_visitors } = req.body;
  const db = getDb();

  try {
    const startDate = parseISO(start_date);
    const endDateValue = end_date ? parseISO(end_date) : startDate;
    const today = startOfDay(new Date());
    const minDate = addDays(today, 2);

    // Check if start date is at least 2 days from today
    if (!isAfter(startDate, minDate) && differenceInDays(startDate, today) < 2) {
      return res.status(400).json({ 
        error: 'Start date must be at least 2 days from today' 
      });
    }

    // Check if end date is after start date
    if (end_date && isAfter(startDate, endDateValue)) {
      return res.status(400).json({ 
        error: 'End date must be after or equal to start date' 
      });
    }

    // Use start_date as visit_date for backward compatibility
    const visit_date = start_date;

    db.run(
      `INSERT INTO visit_requests 
       (visitor_id, visitor_name, visitor_email, visit_date, start_date, end_date, purpose, company_name, contact_number, number_of_visitors, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [req.user.id, req.user.name, req.user.email, visit_date, start_date, end_date || start_date, purpose, company_name, contact_number, number_of_visitors || 1],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to create visit request' });
        }

        // Get the created request
        db.get(
          `SELECT r.*, COALESCE(r.visitor_name, u.name) as visitor_name, 
                  COALESCE(r.visitor_email, u.email) as visitor_email,
                  m.name as manager_name 
           FROM visit_requests r 
           LEFT JOIN users u ON r.visitor_id = u.id 
           LEFT JOIN users m ON r.manager_id = m.id
           WHERE r.id = ?`,
          [this.lastID],
          (err, request) => {
            if (err) {
              return res.status(500).json({ error: 'Failed to fetch created request' });
            }
            res.status(201).json({ request });
          }
        );
      }
    );
  } catch (error) {
    res.status(400).json({ error: 'Invalid date format' });
  }
});

// Get all requests (Visitor sees own, Manager sees all)
router.get('/', authenticate, (req, res) => {
  const db = getDb();
  let query;
  let params = [];

  if (req.user.role === 'visitor') {
    query = `SELECT r.*, 
             COALESCE(r.visitor_name, u.name) as visitor_name, 
             COALESCE(r.visitor_email, u.email) as visitor_email,
             m.name as manager_name,
             s.name as second_level_approver_name,
             t.name as third_level_approver_name
             FROM visit_requests r
             LEFT JOIN users u ON r.visitor_id = u.id
             LEFT JOIN users m ON r.manager_id = m.id
             LEFT JOIN users s ON r.second_level_approver_id = s.id
             LEFT JOIN users t ON r.third_level_approver_id = t.id
             WHERE r.visitor_id = ?
             ORDER BY r.created_at DESC`;
    params = [req.user.id];
  } else if (req.user.role === 'warehouse_manager') {
    query = `SELECT r.*, 
             COALESCE(r.visitor_name, u.name) as visitor_name, 
             COALESCE(r.visitor_email, u.email) as visitor_email,
             m.name as manager_name,
             s.name as second_level_approver_name,
             t.name as third_level_approver_name
             FROM visit_requests r
             LEFT JOIN users u ON r.visitor_id = u.id
             LEFT JOIN users m ON r.manager_id = m.id
             LEFT JOIN users s ON r.second_level_approver_id = s.id
             LEFT JOIN users t ON r.third_level_approver_id = t.id
             ORDER BY r.created_at DESC`;
  } else if (req.user.role === 'second_level_approver') {
    query = `SELECT r.*, 
             COALESCE(r.visitor_name, u.name) as visitor_name, 
             COALESCE(r.visitor_email, u.email) as visitor_email,
             m.name as manager_name,
             s.name as second_level_approver_name,
             t.name as third_level_approver_name
             FROM visit_requests r
             LEFT JOIN users u ON r.visitor_id = u.id
             LEFT JOIN users m ON r.manager_id = m.id
             LEFT JOIN users s ON r.second_level_approver_id = s.id
             LEFT JOIN users t ON r.third_level_approver_id = t.id
             WHERE r.status = 'pending_second_approval' OR r.second_level_approver_id = ?
             ORDER BY r.created_at DESC`;
    params = [req.user.id];
  } else if (req.user.role === 'third_level_approver') {
    query = `SELECT r.*, 
             COALESCE(r.visitor_name, u.name) as visitor_name, 
             COALESCE(r.visitor_email, u.email) as visitor_email,
             m.name as manager_name,
             s.name as second_level_approver_name,
             t.name as third_level_approver_name
             FROM visit_requests r
             LEFT JOIN users u ON r.visitor_id = u.id
             LEFT JOIN users m ON r.manager_id = m.id
             LEFT JOIN users s ON r.second_level_approver_id = s.id
             LEFT JOIN users t ON r.third_level_approver_id = t.id
             WHERE r.status = 'pending_third_approval' 
                OR r.third_level_approver_id = ?
             ORDER BY r.created_at DESC`;
    params = [req.user.id];
  } else {
    query = `SELECT r.*, 
             COALESCE(r.visitor_name, u.name) as visitor_name, 
             COALESCE(r.visitor_email, u.email) as visitor_email,
             m.name as manager_name,
             s.name as second_level_approver_name,
             t.name as third_level_approver_name
             FROM visit_requests r
             LEFT JOIN users u ON r.visitor_id = u.id
             LEFT JOIN users m ON r.manager_id = m.id
             LEFT JOIN users s ON r.second_level_approver_id = s.id
             LEFT JOIN users t ON r.third_level_approver_id = t.id
             ORDER BY r.created_at DESC`;
  }

  db.all(query, params, (err, requests) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch requests' });
    }
    res.json({ requests });
  });
});

// Get single request
router.get('/:id', authenticate, (req, res) => {
  const db = getDb();
  const { id } = req.params;

  db.get(
    `SELECT r.*, 
     COALESCE(r.visitor_name, u.name) as visitor_name, 
     COALESCE(r.visitor_email, u.email) as visitor_email,
     m.name as manager_name,
     s.name as second_level_approver_name,
     t.name as third_level_approver_name
     FROM visit_requests r
     LEFT JOIN users u ON r.visitor_id = u.id
     LEFT JOIN users m ON r.manager_id = m.id
     LEFT JOIN users s ON r.second_level_approver_id = s.id
     LEFT JOIN users t ON r.third_level_approver_id = t.id
     WHERE r.id = ?`,
    [id],
    (err, request) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (!request) {
        return res.status(404).json({ error: 'Request not found' });
      }
      
      // Visitors can only see their own requests
      if (req.user.role === 'visitor' && request.visitor_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      res.json({ request });
    }
  );
});

// Approve/Reject/Pass to Second Level (First Level Manager)
router.patch('/:id/status', authenticate, authorize('warehouse_manager'), [
  body('status').isIn(['approved', 'rejected', 'pass_to_second_level']).withMessage('Status must be approved, rejected, or pass_to_second_level'),
  body('manager_notes').optional().trim(),
  body('second_level_approver_id').optional().isInt().withMessage('Second level approver ID must be a number')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { status, manager_notes, second_level_approver_id } = req.body;
  const db = getDb();

  // Check if request exists
  db.get('SELECT * FROM visit_requests WHERE id = ?', [id], (err, request) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    if (request.status !== 'pending') {
      return res.status(400).json({ error: 'Request has already been processed' });
    }

    function executeUpdate(updateQuery, updateParams) {
      db.run(updateQuery, updateParams, function(err) {
        if (err) {
          console.error('Update error:', err);
          return res.status(500).json({ error: 'Failed to update request: ' + err.message });
        }

        // Get updated request
        db.get(
          `SELECT r.*, 
           COALESCE(r.visitor_name, u.name) as visitor_name, 
           COALESCE(r.visitor_email, u.email) as visitor_email,
           m.name as manager_name,
           s.name as second_level_approver_name
           FROM visit_requests r
           LEFT JOIN users u ON r.visitor_id = u.id
           LEFT JOIN users m ON r.manager_id = m.id
           LEFT JOIN users s ON r.second_level_approver_id = s.id
           WHERE r.id = ?`,
          [id],
          async (err, updatedRequest) => {
            if (err) {
              return res.status(500).json({ error: 'Failed to fetch updated request' });
            }
            
            // Send email notification based on status
            if (status === 'approved') {
              emailService.sendRequestApprovedEmail(updatedRequest).catch(err => 
                console.error('Failed to send approval email:', err)
              );
            } else if (status === 'rejected') {
              emailService.sendRequestRejectedEmail(updatedRequest).catch(err => 
                console.error('Failed to send rejection email:', err)
              );
            } else if (status === 'pass_to_second_level') {
              // Send notification to second level approver
              emailService.sendNewRequestNotificationEmail(updatedRequest).catch(err => 
                console.error('Failed to send second level notification:', err)
              );
            }
            
            res.json({ request: updatedRequest });
          }
        );
      });
    }

    // Determine update query based on status
    if (status === 'pass_to_second_level') {
      // Get a second level approver if not provided
      if (!second_level_approver_id) {
        db.get('SELECT id FROM users WHERE role = ? LIMIT 1', ['second_level_approver'], (err, approver) => {
          if (err) {
            return res.status(500).json({ error: 'Database error finding approver' });
          }
          if (!approver) {
            return res.status(400).json({ error: 'No second level approver available' });
          }
          const updateQuery = `UPDATE visit_requests 
                               SET status = ?, manager_id = ?, second_level_approver_id = ?, manager_notes = ?, updated_at = CURRENT_TIMESTAMP
                               WHERE id = ?`;
          const updateParams = ['pending_second_approval', req.user.id, approver.id, manager_notes || null, id];
          executeUpdate(updateQuery, updateParams);
        });
      } else {
        const updateQuery = `UPDATE visit_requests 
                             SET status = ?, manager_id = ?, second_level_approver_id = ?, manager_notes = ?, updated_at = CURRENT_TIMESTAMP
                             WHERE id = ?`;
        const updateParams = ['pending_second_approval', req.user.id, second_level_approver_id, manager_notes || null, id];
        executeUpdate(updateQuery, updateParams);
      }
    } else {
      const updateQuery = `UPDATE visit_requests 
                           SET status = ?, manager_id = ?, manager_notes = ?, updated_at = CURRENT_TIMESTAMP
                           WHERE id = ?`;
      const updateParams = [status, req.user.id, manager_notes || null, id];
      executeUpdate(updateQuery, updateParams);
    }
  });
});

// Approve/Reject/Pass to Third Level (Second Level Approver)
router.patch('/:id/second-level-status', authenticate, authorize('second_level_approver'), [
  body('status').isIn(['approved', 'rejected', 'pass_to_third_level']).withMessage('Status must be approved, rejected, or pass_to_third_level'),
  body('second_level_notes').optional().trim(),
  body('third_level_approver_id').optional().isInt().withMessage('Third level approver ID must be a number')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { status, second_level_notes, third_level_approver_id } = req.body;
  const db = getDb();

  // Check if request exists and is pending second level approval
  db.get('SELECT * FROM visit_requests WHERE id = ?', [id], (err, request) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    if (request.status !== 'pending_second_approval') {
      return res.status(400).json({ error: 'Request is not pending second level approval' });
    }

    // Helper function to execute update and return response
    function executeUpdate(updateQuery, updateParams) {
      db.run(updateQuery, updateParams, function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to update request' });
        }

        // Get updated request
        db.get(
          `SELECT r.*, 
           COALESCE(r.visitor_name, u.name) as visitor_name, 
           COALESCE(r.visitor_email, u.email) as visitor_email,
           m.name as manager_name,
           s.name as second_level_approver_name,
           t.name as third_level_approver_name
           FROM visit_requests r
           LEFT JOIN users u ON r.visitor_id = u.id
           LEFT JOIN users m ON r.manager_id = m.id
           LEFT JOIN users s ON r.second_level_approver_id = s.id
           LEFT JOIN users t ON r.third_level_approver_id = t.id
           WHERE r.id = ?`,
          [id],
          async (err, updatedRequest) => {
            if (err) {
              return res.status(500).json({ error: 'Failed to fetch updated request' });
            }
            
            // Send email notification to third level approver
            emailService.sendThirdLevelNotificationEmail(updatedRequest).catch(err => 
              console.error('Failed to send third level notification:', err)
            );
            
            res.json({ request: updatedRequest });
          }
        );
      });
    }

    // Handle pass to third level
    if (status === 'pass_to_third_level') {
      // Get a third level approver if not provided
      if (!third_level_approver_id) {
        db.get('SELECT id FROM users WHERE role = ? LIMIT 1', ['third_level_approver'], (err, approver) => {
          if (err) {
            return res.status(500).json({ error: 'Database error finding approver' });
          }
          if (!approver) {
            return res.status(400).json({ error: 'No third level approver available' });
          }
          const updateQuery = `UPDATE visit_requests 
                               SET status = ?, second_level_approver_id = ?, third_level_approver_id = ?, second_level_notes = ?, updated_at = CURRENT_TIMESTAMP
                               WHERE id = ?`;
          const updateParams = ['pending_third_approval', req.user.id, approver.id, second_level_notes || null, id];
          executeUpdate(updateQuery, updateParams);
        });
      } else {
        const updateQuery = `UPDATE visit_requests 
                             SET status = ?, second_level_approver_id = ?, third_level_approver_id = ?, second_level_notes = ?, updated_at = CURRENT_TIMESTAMP
                             WHERE id = ?`;
        const updateParams = ['pending_third_approval', req.user.id, third_level_approver_id, second_level_notes || null, id];
        executeUpdate(updateQuery, updateParams);
      }
    } else {
      // Approve or reject
      db.run(
        `UPDATE visit_requests 
         SET status = ?, second_level_approver_id = ?, second_level_notes = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [status, req.user.id, second_level_notes || null, id],
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Failed to update request' });
          }

          // Get updated request
          db.get(
            `SELECT r.*, 
             COALESCE(r.visitor_name, u.name) as visitor_name, 
             COALESCE(r.visitor_email, u.email) as visitor_email,
             m.name as manager_name,
             s.name as second_level_approver_name,
             t.name as third_level_approver_name
             FROM visit_requests r
             LEFT JOIN users u ON r.visitor_id = u.id
             LEFT JOIN users m ON r.manager_id = m.id
             LEFT JOIN users s ON r.second_level_approver_id = s.id
             LEFT JOIN users t ON r.third_level_approver_id = t.id
             WHERE r.id = ?`,
            [id],
            async (err, updatedRequest) => {
              if (err) {
                return res.status(500).json({ error: 'Failed to fetch updated request' });
              }
              
              // Send email notification
              if (status === 'approved') {
                emailService.sendRequestApprovedEmail(updatedRequest).catch(err => 
                  console.error('Failed to send approval email:', err)
                );
              } else if (status === 'rejected') {
                emailService.sendRequestRejectedEmail(updatedRequest).catch(err => 
                  console.error('Failed to send rejection email:', err)
                );
              }
              
              res.json({ request: updatedRequest });
            }
          );
        }
      );
    }
  });
});

// Approve/Reject request (Third Level Approver)
router.patch('/:id/third-level-status', authenticate, authorize('third_level_approver'), [
  body('status').isIn(['approved', 'rejected']).withMessage('Status must be approved or rejected'),
  body('third_level_notes').optional().trim()
], (req, res) => {
  const { id } = req.params;
  const { status, third_level_notes } = req.body;
  const db = getDb();

  // Check if request exists and is pending third level approval
  db.get('SELECT * FROM visit_requests WHERE id = ?', [id], (err, request) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    if (request.status !== 'pending_third_approval') {
      return res.status(400).json({ error: 'Request is not pending third level approval' });
    }

    db.run(
      `UPDATE visit_requests 
       SET status = ?, third_level_approver_id = ?, third_level_notes = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [status, req.user.id, third_level_notes || null, id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to update request' });
        }

        // Get updated request
        db.get(
          `SELECT r.*, 
           COALESCE(r.visitor_name, u.name) as visitor_name, 
           COALESCE(r.visitor_email, u.email) as visitor_email,
           m.name as manager_name,
           s.name as second_level_approver_name,
           t.name as third_level_approver_name
           FROM visit_requests r
           LEFT JOIN users u ON r.visitor_id = u.id
           LEFT JOIN users m ON r.manager_id = m.id
           LEFT JOIN users s ON r.second_level_approver_id = s.id
           LEFT JOIN users t ON r.third_level_approver_id = t.id
           WHERE r.id = ?`,
          [id],
          async (err, updatedRequest) => {
            if (err) {
              return res.status(500).json({ error: 'Failed to fetch updated request' });
            }
            
            // Send email notification
            if (status === 'approved') {
              emailService.sendRequestApprovedEmail(updatedRequest).catch(err => 
                console.error('Failed to send approval email:', err)
              );
            } else if (status === 'rejected') {
              emailService.sendRequestRejectedEmail(updatedRequest).catch(err => 
                console.error('Failed to send rejection email:', err)
              );
            }
            
            res.json({ request: updatedRequest });
          }
        );
      }
    );
  });
});

// Delete request (Visitor only, if pending)
router.delete('/:id', authenticate, authorize('visitor'), (req, res) => {
  const { id } = req.params;
  const db = getDb();

  db.get('SELECT * FROM visit_requests WHERE id = ? AND visitor_id = ?', [id, req.user.id], (err, request) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    if (request.status !== 'pending') {
      return res.status(400).json({ error: 'Cannot delete processed request' });
    }

    db.run('DELETE FROM visit_requests WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete request' });
      }
      res.json({ message: 'Request deleted successfully' });
    });
  });
});

// Export requests to Excel
router.get('/export/excel', authenticate, (req, res) => {
  const db = getDb();
  const { status } = req.query; // Optional filter by status
  let query;
  let params = [];

  // Use same query logic as GET /api/requests
  if (req.user.role === 'visitor') {
    query = `SELECT r.*, 
             COALESCE(r.visitor_name, u.name) as visitor_name, 
             COALESCE(r.visitor_email, u.email) as visitor_email,
             m.name as manager_name,
             s.name as second_level_approver_name,
             t.name as third_level_approver_name
             FROM visit_requests r
             LEFT JOIN users u ON r.visitor_id = u.id
             LEFT JOIN users m ON r.manager_id = m.id
             LEFT JOIN users s ON r.second_level_approver_id = s.id
             LEFT JOIN users t ON r.third_level_approver_id = t.id
             WHERE r.visitor_id = ?`;
    params = [req.user.id];
    if (status) {
      query += ' AND r.status = ?';
      params.push(status);
    }
    query += ' ORDER BY r.created_at DESC';
  } else if (req.user.role === 'warehouse_manager') {
    query = `SELECT r.*, 
             COALESCE(r.visitor_name, u.name) as visitor_name, 
             COALESCE(r.visitor_email, u.email) as visitor_email,
             m.name as manager_name,
             s.name as second_level_approver_name,
             t.name as third_level_approver_name
             FROM visit_requests r
             LEFT JOIN users u ON r.visitor_id = u.id
             LEFT JOIN users m ON r.manager_id = m.id
             LEFT JOIN users s ON r.second_level_approver_id = s.id
             LEFT JOIN users t ON r.third_level_approver_id = t.id`;
    if (status) {
      query += ' WHERE r.status = ?';
      params.push(status);
    }
    query += ' ORDER BY r.created_at DESC';
  } else if (req.user.role === 'second_level_approver') {
    query = `SELECT r.*, 
             COALESCE(r.visitor_name, u.name) as visitor_name, 
             COALESCE(r.visitor_email, u.email) as visitor_email,
             m.name as manager_name,
             s.name as second_level_approver_name,
             t.name as third_level_approver_name
             FROM visit_requests r
             LEFT JOIN users u ON r.visitor_id = u.id
             LEFT JOIN users m ON r.manager_id = m.id
             LEFT JOIN users s ON r.second_level_approver_id = s.id
             LEFT JOIN users t ON r.third_level_approver_id = t.id
             WHERE r.status = 'pending_second_approval' OR r.second_level_approver_id = ?`;
    params = [req.user.id];
    if (status) {
      query += ' AND r.status = ?';
      params.push(status);
    }
    query += ' ORDER BY r.created_at DESC';
  } else if (req.user.role === 'third_level_approver') {
    query = `SELECT r.*, 
             COALESCE(r.visitor_name, u.name) as visitor_name, 
             COALESCE(r.visitor_email, u.email) as visitor_email,
             m.name as manager_name,
             s.name as second_level_approver_name,
             t.name as third_level_approver_name
             FROM visit_requests r
             LEFT JOIN users u ON r.visitor_id = u.id
             LEFT JOIN users m ON r.manager_id = m.id
             LEFT JOIN users s ON r.second_level_approver_id = s.id
             LEFT JOIN users t ON r.third_level_approver_id = t.id
             WHERE r.status = 'pending_third_approval' 
                OR r.third_level_approver_id = ?`;
    params = [req.user.id];
    if (status) {
      query += ' AND r.status = ?';
      params.push(status);
    }
    query += ' ORDER BY r.created_at DESC';
  } else {
    query = `SELECT r.*, 
             COALESCE(r.visitor_name, u.name) as visitor_name, 
             COALESCE(r.visitor_email, u.email) as visitor_email,
             m.name as manager_name,
             s.name as second_level_approver_name,
             t.name as third_level_approver_name
             FROM visit_requests r
             LEFT JOIN users u ON r.visitor_id = u.id
             LEFT JOIN users m ON r.manager_id = m.id
             LEFT JOIN users s ON r.second_level_approver_id = s.id
             LEFT JOIN users t ON r.third_level_approver_id = t.id`;
    if (status) {
      query += ' WHERE r.status = ?';
      params.push(status);
    }
    query += ' ORDER BY r.created_at DESC';
  }

  db.all(query, params, (err, requests) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch requests' });
    }

    // Prepare data for Excel
    const excelData = requests.map(req => ({
      'Request ID': req.id,
      'Visitor Name': req.visitor_name || req.visitor_name || 'N/A',
      'Visitor Email': req.visitor_email || 'N/A',
      'Company Name': req.company_name || 'N/A',
      'Start Date': req.start_date || req.visit_date || 'N/A',
      'End Date': req.end_date || req.start_date || req.visit_date || 'N/A',
      'Purpose': req.purpose || 'N/A',
      'Number of Visitors': req.number_of_visitors || 1,
      'Visitor Type': req.visitor_type || 'N/A',
      'Status': req.status || 'N/A',
      'Manager': req.manager_name || 'N/A',
      'Second Level Approver': req.second_level_approver_name || 'N/A',
      'Third Level Approver': req.third_level_approver_name || 'N/A',
      'Manager Notes': req.manager_notes || '',
      'Second Level Notes': req.second_level_notes || '',
      'Third Level Notes': req.third_level_notes || '',
      'Created At': req.created_at || 'N/A',
      'Updated At': req.updated_at || 'N/A'
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // Set column widths
    const colWidths = [
      { wch: 10 }, // Request ID
      { wch: 20 }, // Visitor Name
      { wch: 30 }, // Visitor Email
      { wch: 20 }, // Company Name
      { wch: 15 }, // Visit Date
      { wch: 30 }, // Purpose
      { wch: 15 }, // Number of Visitors
      { wch: 15 }, // Visitor Type
      { wch: 20 }, // Status
      { wch: 25 }, // Manager
      { wch: 25 }, // Second Level Approver
      { wch: 25 }, // Third Level Approver
      { wch: 30 }, // Manager Notes
      { wch: 30 }, // Second Level Notes
      { wch: 30 }, // Third Level Notes
      { wch: 20 }, // Created At
      { wch: 20 }  // Updated At
    ];
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, 'Visit Requests');

    // Generate Excel buffer
    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // Set response headers
    const filename = `visit_requests_${status || 'all'}_${new Date().toISOString().split('T')[0]}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Send Excel file
    res.send(excelBuffer);
  });
});

module.exports = router;

