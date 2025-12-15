import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import RequestList from './RequestList';
import './Dashboard.css';

const ThirdLevelApproverDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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

  const handleStatusUpdate = async (requestId, status, thirdLevelNotes) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/requests/${requestId}/third-level-status`,
        { status, third_level_notes: thirdLevelNotes }
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
    pending: requests.filter(r => r.status === 'pending_third_approval').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Third Level Approver Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={() => { logout(); navigate('/'); }} className="btn btn-secondary">
          Logout
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Requests</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending Approval</div>
        </div>
        <div className="stat-card approved">
          <div className="stat-value">{stats.approved}</div>
          <div className="stat-label">Approved</div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-value">{stats.rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>

      <RequestList
        requests={requests}
        onStatusUpdate={handleStatusUpdate}
        userRole="third_level_approver"
      />
    </div>
  );
};

export default ThirdLevelApproverDashboard;




