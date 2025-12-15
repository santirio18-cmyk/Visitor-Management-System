import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import RequestForm from './RequestForm';
import RequestList from './RequestList';
import './Dashboard.css';

const VisitorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

  const handleRequestCreated = (newRequest) => {
    setRequests([newRequest, ...requests]);
    setShowForm(false);
    toast.success('Visit request submitted successfully!');
  };

  const handleRequestDeleted = (requestId) => {
    setRequests(requests.filter(req => req.id !== requestId));
    toast.success('Request deleted successfully');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo-text">
              <span className="logo-orange">my</span><span className="logo-blue">TVS</span>
            </div>
            <h1 style={{ marginLeft: '20px' }}>Visitor Dashboard</h1>
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
          {!showForm ? (
            <>
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">My Visit Requests</h2>
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn btn-primary"
                  >
                    + New Request
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="loading">Loading requests...</div>
              ) : (
                <RequestList
                  requests={requests}
                  userRole="visitor"
                  onDelete={handleRequestDeleted}
                />
              )}
            </>
          ) : (
            <RequestForm
              onCancel={() => setShowForm(false)}
              onSuccess={handleRequestCreated}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default VisitorDashboard;

