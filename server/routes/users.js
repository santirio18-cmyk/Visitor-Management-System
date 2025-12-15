const express = require('express');
const { getDb } = require('../database/db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all users (Manager only)
router.get('/', authenticate, authorize('warehouse_manager'), (req, res) => {
  const db = getDb();
  
  db.all(
    'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC',
    [],
    (err, users) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch users' });
      }
      res.json({ users });
    }
  );
});

module.exports = router;





