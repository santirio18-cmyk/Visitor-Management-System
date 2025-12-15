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

  const handleExportExcel = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/requests/export/excel`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to export Excel');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `visit_requests_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Excel file downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download Excel file');
      console.error('Export error:', error);
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
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo-text">
              <span className="logo-orange">my</span><span className="logo-blue">TVS</span>
            </div>
            <h1 style={{ marginLeft: '20px' }}>Third Level Approver Dashboard</h1>
            <div className="header-actions">
              <span className="user-info">Welcome, {user?.name}</span>
              <button onClick={() => { logout(); navigate('/'); }} className="btn btn-secondary">
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h2 className="card-title">Third Level Approval Requests</h2>
                  <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
                    These requests require your final approval decision.
                  </p>
                </div>
                <button
                  onClick={handleExportExcel}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span>📥</span> Download Excel
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading requests...</div>
          ) : (
            <RequestList
              requests={requests}
              userRole="third_level_approver"
              onStatusUpdate={handleStatusUpdate}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ThirdLevelApproverDashboard;




