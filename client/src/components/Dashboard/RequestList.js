import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import RequestModal from './RequestModal';

const RequestList = ({ requests, userRole, onStatusUpdate, onDelete }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [managerNotes, setManagerNotes] = useState('');

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleApprove = async () => {
    if (selectedRequest && onStatusUpdate) {
      await onStatusUpdate(selectedRequest.id, 'approved', managerNotes);
      setShowModal(false);
      setManagerNotes('');
    }
  };

  const handleReject = async () => {
    if (selectedRequest && onStatusUpdate) {
      await onStatusUpdate(selectedRequest.id, 'rejected', managerNotes);
      setShowModal(false);
      setManagerNotes('');
    }
  };

  const handlePassToSecondLevel = async () => {
    if (selectedRequest && onStatusUpdate) {
      await onStatusUpdate(selectedRequest.id, 'pass_to_second_level', managerNotes);
      setShowModal(false);
      setManagerNotes('');
    }
  };

  const handlePassToThirdLevel = async () => {
    if (selectedRequest && onStatusUpdate) {
      await onStatusUpdate(selectedRequest.id, 'pass_to_third_level', managerNotes);
      setShowModal(false);
      setManagerNotes('');
    }
  };

  const handleDelete = async (requestId) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/requests/${requestId}`);
        onDelete(requestId);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to delete request');
      }
    }
  };

  if (requests.length === 0) {
    return (
      <div className="card">
        <p className="empty-state">No visit requests found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Visit Date</th>
                <th>Company</th>
                <th>Visitor</th>
                <th>Purpose</th>
                <th>Visitors</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{format(parseISO(request.visit_date), 'MMM dd, yyyy')}</td>
                  <td>{request.company_name}</td>
                  <td>
                    <div>{request.visitor_name}</div>
                    <small style={{ color: '#666' }}>{request.visitor_email}</small>
                  </td>
                  <td>
                    <div className="purpose-cell">
                      {request.purpose.length > 50
                        ? `${request.purpose.substring(0, 50)}...`
                        : request.purpose}
                    </div>
                  </td>
                  <td>{request.number_of_visitors}</td>
                  <td>
                    <span className={`status-badge status-${request.status.replace('_', '-')}`}>
                      {request.status === 'pending_second_approval' ? 'Pending 2nd Level' : 
                       request.status === 'pending_third_approval' ? 'Pending 3rd Level' : 
                       request.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="btn btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '14px' }}
                      >
                        View
                      </button>
                      {userRole === 'visitor' && request.status === 'pending' && (
                        <button
                          onClick={() => handleDelete(request.id)}
                          className="btn btn-danger"
                          style={{ padding: '6px 12px', fontSize: '14px', marginLeft: '8px' }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedRequest && (
        <RequestModal
          request={selectedRequest}
          userRole={userRole}
          onClose={() => {
            setShowModal(false);
            setManagerNotes('');
          }}
          onApprove={handleApprove}
          onReject={handleReject}
          onPassToSecondLevel={handlePassToSecondLevel}
          onPassToThirdLevel={handlePassToThirdLevel}
          managerNotes={managerNotes}
          onManagerNotesChange={setManagerNotes}
        />
      )}
    </>
  );
};

export default RequestList;

