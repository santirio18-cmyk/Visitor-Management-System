import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import RequestList from './RequestList';
import './Dashboard.css';

const SecondLevelApproverDashboard = () => {
  const { user, logout } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/requests`);
      setRequests(response.data.requests);
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, status, secondLevelNotes) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/requests/${requestId}/second-level-status`,
        { status, second_level_notes: secondLevelNotes }
      );
      setRequests(requests.map(req => 
        req.id === requestId ? response.data.request : req
      ));
      toast.success(`Request ${status} successfully`);
      fetchRequests(); // Refresh to get updated list
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update request');
    }
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending_second_approval').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo-text">
              <span className="logo-orange">my</span><span className="logo-blue">TVS</span>
            </div>
            <h1 style={{ marginLeft: '20px' }}>Second Level Approver Dashboard</h1>
            <div className="header-actions">
              <span className="user-info">Welcome, {user?.name}</span>
              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Requests</div>
            </div>
            <div className="stat-card stat-pending">
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-label">Pending Approval</div>
            </div>
            <div className="stat-card stat-approved">
              <div className="stat-value">{stats.approved}</div>
              <div className="stat-label">Approved</div>
            </div>
            <div className="stat-card stat-rejected">
              <div className="stat-value">{stats.rejected}</div>
              <div className="stat-label">Rejected</div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Second Level Approval Requests</h2>
              <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
                These requests have been passed to you for final approval.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading requests...</div>
          ) : (
            <RequestList
              requests={requests}
              userRole="second_level_approver"
              onStatusUpdate={handleStatusUpdate}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default SecondLevelApproverDashboard;

