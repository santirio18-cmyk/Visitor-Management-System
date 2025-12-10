import React from 'react';
import { format, parseISO } from 'date-fns';
import './Dashboard.css';

const RequestModal = ({
  request,
  userRole,
  onClose,
  onApprove,
  onReject,
  onPassToSecondLevel,
  managerNotes,
  onManagerNotesChange
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Visit Request Details</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="detail-row">
            <strong>Visit Date:</strong>
            <span>{format(parseISO(request.visit_date), 'MMMM dd, yyyy')}</span>
          </div>

          <div className="detail-row">
            <strong>Visitor:</strong>
            <span>{request.visitor_name} ({request.visitor_email})</span>
          </div>

          <div className="detail-row">
            <strong>Visitor Type:</strong>
            <span>{request.visitor_type || 'Not specified'}</span>
          </div>

          <div className="detail-row">
            <strong>Company:</strong>
            <span>{request.company_name}</span>
          </div>

          <div className="detail-row">
            <strong>Contact Number:</strong>
            <span>{request.contact_number}</span>
          </div>

          <div className="detail-row">
            <strong>Number of Visitors:</strong>
            <span>{request.number_of_visitors}</span>
          </div>

          <div className="detail-row">
            <strong>Coming From:</strong>
            <span>{request.coming_from || 'Not specified'}</span>
          </div>

          <div className="detail-row">
            <strong>Visiting Purpose:</strong>
            <span>{request.purpose}</span>
          </div>

          {request.additional_visitor_names && (
            <div className="detail-row">
              <strong>Additional Visitors:</strong>
              <span style={{ whiteSpace: 'pre-line' }}>{request.additional_visitor_names}</span>
            </div>
          )}

          <div className="detail-row">
            <strong>Status:</strong>
            <span className={`status-badge status-${request.status.replace('_', '-')}`}>
              {request.status === 'pending_second_approval' ? 'Pending 2nd Level' : request.status}
            </span>
          </div>

          {request.manager_name && (
            <div className="detail-row">
              <strong>Processed by:</strong>
              <span>{request.manager_name}</span>
            </div>
          )}

          {request.manager_notes && (
            <div className="detail-row">
              <strong>First Level Manager Notes:</strong>
              <span>{request.manager_notes}</span>
            </div>
          )}

          {request.second_level_approver_name && (
            <div className="detail-row">
              <strong>Second Level Approver:</strong>
              <span>{request.second_level_approver_name}</span>
            </div>
          )}

          {request.second_level_notes && (
            <div className="detail-row">
              <strong>Second Level Notes:</strong>
              <span>{request.second_level_notes}</span>
            </div>
          )}

          {userRole === 'warehouse_manager' && request.status === 'pending' && (
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">Manager Notes (Optional)</label>
              <textarea
                className="form-textarea"
                value={managerNotes}
                onChange={(e) => onManagerNotesChange(e.target.value)}
                placeholder="Add any notes or comments..."
                rows="3"
              />
            </div>
          )}

          {userRole === 'second_level_approver' && request.status === 'pending_second_approval' && (
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">Second Level Notes (Optional)</label>
              <textarea
                className="form-textarea"
                value={managerNotes}
                onChange={(e) => onManagerNotesChange(e.target.value)}
                placeholder="Add any notes or comments..."
                rows="3"
              />
            </div>
          )}

          <div className="detail-row">
            <strong>Submitted:</strong>
            <span>{format(parseISO(request.created_at), 'MMM dd, yyyy HH:mm')}</span>
          </div>
        </div>

        <div className="modal-footer">
          {userRole === 'warehouse_manager' && request.status === 'pending' && (
            <>
              <button
                onClick={onReject}
                className="btn btn-danger"
              >
                Reject
              </button>
              <button
                onClick={onPassToSecondLevel}
                className="btn"
                style={{ background: '#ff9800', color: 'white' }}
              >
                Pass to 2nd Level
              </button>
              <button
                onClick={onApprove}
                className="btn btn-success"
              >
                Approve
              </button>
            </>
          )}
          {userRole === 'second_level_approver' && request.status === 'pending_second_approval' && (
            <>
              <button
                onClick={onReject}
                className="btn btn-danger"
              >
                Reject
              </button>
              <button
                onClick={onApprove}
                className="btn btn-success"
              >
                Approve
              </button>
            </>
          )}
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;

