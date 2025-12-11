import React, { useState } from 'react';
import { format, addDays, startOfDay } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';
import '../Dashboard/Dashboard.css';
import '../Auth/Auth.css';
import './PublicForm.css';

const PublicRequestForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    visitor_name: '',
    visitor_email: '',
    visit_date: '',
    purpose: '',
    visitor_type: '',
    company_name: '',
    contact_number: '',
    number_of_visitors: 1,
    additional_visitor_names: '',
    coming_from: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState(null);
  
  // Manager login state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});

  const getMinDate = () => {
    const today = startOfDay(new Date());
    return format(addDays(today, 2), 'yyyy-MM-dd');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: name === 'number_of_visitors' ? parseInt(value) || 1 : value
    };
    
    // Clear additional_visitor_names if number of visitors becomes 1
    if (name === 'number_of_visitors' && parseInt(value) === 1) {
      newFormData.additional_visitor_names = '';
    }
    
    setFormData(newFormData);
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    // Clear additional_visitor_names error if number of visitors changes
    if (name === 'number_of_visitors' && errors.additional_visitor_names) {
      setErrors({ ...errors, additional_visitor_names: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const minDate = getMinDate();
    const selectedDate = formData.visit_date;

    if (!formData.visitor_name.trim()) {
      newErrors.visitor_name = 'Your name is required';
    }

    if (!formData.visitor_email.trim()) {
      newErrors.visitor_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.visitor_email)) {
      newErrors.visitor_email = 'Valid email is required';
    }

    if (!formData.visit_date) {
      newErrors.visit_date = 'Visit date is required';
    } else if (selectedDate < minDate) {
      newErrors.visit_date = `Visit date must be at least 2 days from today (minimum: ${minDate})`;
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }

    if (!formData.visitor_type) {
      newErrors.visitor_type = 'Please select visitor type';
    }

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required';
    }

    if (!formData.contact_number.trim()) {
      newErrors.contact_number = 'Contact number is required';
    }

    if (!formData.coming_from.trim()) {
      newErrors.coming_from = 'Coming from location is required';
    }

    if (formData.number_of_visitors < 1) {
      newErrors.number_of_visitors = 'Number of visitors must be at least 1';
    }

    // Additional visitor names is required if number of visitors > 1
    if (formData.number_of_visitors > 1 && !formData.additional_visitor_names.trim()) {
      newErrors.additional_visitor_names = `Please provide names of ${formData.number_of_visitors - 1} additional visitor(s)`;
    }

    if (formData.number_of_visitors > 1 && !formData.additional_visitor_names.trim()) {
      newErrors.additional_visitor_names = 'Please provide names of additional visitors';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/requests/public`, formData);
      setRequestId(response.data.request.id);
      setSubmitted(true);
      toast.success('Visit request submitted successfully!');
    } catch (error) {
      console.error('Submit error:', error);
      if (error.response) {
        // Server responded with error
        const errorMessage = error.response.data?.error || error.response.data?.message || 'Failed to submit request. Please try again.';
        toast.error(errorMessage);
        if (error.response.data?.errors) {
          const formErrors = {};
          error.response.data.errors.forEach(err => {
            formErrors[err.param] = err.msg;
          });
          setErrors(formErrors);
        }
      } else if (error.request) {
        // Request made but no response (backend not reachable)
        toast.error('⚠️ Backend server is not available. Please deploy the backend first. See DEPLOY_BACKEND_NOW.md for instructions.');
      } else {
        // Something else happened
        toast.error('An error occurred. Please try again.');
      }
      const errorMessage = error.response?.data?.error || error.response?.data?.errors?.[0]?.msg || 'Failed to create request';
      toast.error(errorMessage);
      if (error.response?.data?.errors) {
        const formErrors = {};
        error.response.data.errors.forEach(err => {
          formErrors[err.param] = err.msg;
        });
        setErrors(formErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="public-page-container">
        <div className="public-page-content" style={{ maxWidth: '800px', margin: '0 auto', gridTemplateColumns: '1fr' }}>
          <div className="simple-form-container">
            <div className="simple-form-card">
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', color: '#28a745', marginBottom: '20px' }}>✓</div>
                <h2 className="simple-form-title" style={{ color: '#28a745' }}>Request Submitted Successfully!</h2>
                <p className="simple-form-subtitle" style={{ marginBottom: '30px' }}>
                  Your visit request has been submitted. The warehouse manager will review your request and you will be notified via email.
                </p>
                <p style={{ marginBottom: '20px', color: '#666' }}>
                  <strong>Request ID:</strong> #{requestId}
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '30px' }}>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                setFormData({
                  visitor_name: '',
                  visitor_email: '',
                  visit_date: '',
                  purpose: '',
                  visitor_type: '',
                  company_name: '',
                  contact_number: '',
                  number_of_visitors: 1,
                  additional_visitor_names: '',
                  coming_from: ''
                });
                    }}
                    className="simple-btn simple-btn-submit"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    if (loginErrors[name]) {
      setLoginErrors({ ...loginErrors, [name]: '' });
    }
  };

  const handleManagerLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginErrors({});

    try {
      const user = await login(loginData.email, loginData.password);
      if (user.role === 'warehouse_manager' || user.role === 'second_level_approver') {
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error('This login is for approvers only');
        setLoginErrors({ email: 'Approver access required' });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
      setLoginErrors({ email: error.response?.data?.error || 'Invalid credentials' });
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="public-page-container">
      <div className="public-page-content">
        {/* Left Side - Request Form */}
        <div className="public-form-section">
          <div className="simple-form-container">
            <div className="simple-form-card">
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                <div style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-1px', marginBottom: '3px' }}>
                  <span style={{ color: '#ff6600' }}>my</span><span style={{ color: '#0066cc' }}>TVS</span>
                </div>
                <h1 style={{ fontSize: '16px', fontWeight: '600', color: '#1a365d', marginBottom: '3px', marginTop: '2px' }}>
                  Visitor Management System
                </h1>
                <p className="simple-form-subtitle" style={{ fontSize: '12px', fontWeight: '700', color: '#2c5282', lineHeight: '1.2', marginBottom: '8px' }}>
                  Please fill in the details below. Visit date must be at least 2 days from today.
                </p>
              </div>
        
        <form onSubmit={handleSubmit} className="simple-form">
          <div className="simple-form-field">
            <label>Your Name *</label>
            <input
              type="text"
              name="visitor_name"
              className={`simple-input ${errors.visitor_name ? 'error' : ''}`}
              value={formData.visitor_name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
            {errors.visitor_name && (
              <span className="simple-error">{errors.visitor_name}</span>
            )}
          </div>

          <div className="simple-form-field">
            <label>Your Email *</label>
            <input
              type="email"
              name="visitor_email"
              className={`simple-input ${errors.visitor_email ? 'error' : ''}`}
              value={formData.visitor_email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
            {errors.visitor_email && (
              <span className="simple-error">{errors.visitor_email}</span>
            )}
          </div>

          <div className="simple-form-row">
            <div className="simple-form-field">
              <label>Visit Date *</label>
              <input
                type="date"
                name="visit_date"
                className={`simple-input ${errors.visit_date ? 'error' : ''}`}
                value={formData.visit_date}
                onChange={handleChange}
                min={getMinDate()}
                required
                placeholder="Select date"
              />
              {errors.visit_date && (
                <span className="simple-error">{errors.visit_date}</span>
              )}
            </div>

            <div className="simple-form-field">
              <label>Number of Visitors *</label>
              <input
                type="number"
                name="number_of_visitors"
                className={`simple-input ${errors.number_of_visitors ? 'error' : ''}`}
                value={formData.number_of_visitors}
                onChange={handleChange}
                min="1"
                required
                placeholder="1"
              />
              {errors.number_of_visitors && (
                <span className="simple-error">{errors.number_of_visitors}</span>
              )}
            </div>
          </div>

          <div className="simple-form-field">
            <label>Visitor Type *</label>
            <select
              name="visitor_type"
              className={`simple-select ${errors.visitor_type ? 'error' : ''}`}
              value={formData.visitor_type}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option value="Internal">Internal</option>
              <option value="External">External</option>
            </select>
            {errors.visitor_type && (
              <span className="simple-error">{errors.visitor_type}</span>
            )}
          </div>

          <div className="simple-form-field">
            <label>Company Name *</label>
            <input
              type="text"
              name="company_name"
              className={`simple-input ${errors.company_name ? 'error' : ''}`}
              value={formData.company_name}
              onChange={handleChange}
              required
              placeholder="Enter your company name"
            />
            {errors.company_name && (
              <span className="simple-error">{errors.company_name}</span>
            )}
          </div>

          <div className="simple-form-field">
            <label>Contact Number *</label>
            <input
              type="tel"
              name="contact_number"
              className={`simple-input ${errors.contact_number ? 'error' : ''}`}
              value={formData.contact_number}
              onChange={handleChange}
              required
              placeholder="Enter your contact number"
            />
            {errors.contact_number && (
              <span className="simple-error">{errors.contact_number}</span>
            )}
          </div>

          <div className="simple-form-field">
            <label>Coming From *</label>
            <input
              type="text"
              name="coming_from"
              className={`simple-input ${errors.coming_from ? 'error' : ''}`}
              value={formData.coming_from}
              onChange={handleChange}
              required
              placeholder="Enter your location/city (e.g., New York, NY)"
            />
            {errors.coming_from && (
              <span className="simple-error">{errors.coming_from}</span>
            )}
          </div>

          <div className="simple-form-field">
            <label>Visiting Purpose *</label>
            <textarea
              name="purpose"
              className={`simple-textarea ${errors.purpose ? 'error' : ''}`}
              value={formData.purpose}
              onChange={handleChange}
              rows="2"
              required
              placeholder="Briefly describe the purpose of your visit"
            />
            {errors.purpose && (
              <span className="simple-error">{errors.purpose}</span>
            )}
          </div>

          {formData.number_of_visitors > 1 && (
            <div className="simple-form-field" style={{ marginBottom: '0' }}>
              <label>Additional Visitor Names *</label>
              <textarea
                name="additional_visitor_names"
                className={`simple-textarea ${errors.additional_visitor_names ? 'error' : ''}`}
                value={formData.additional_visitor_names}
                onChange={handleChange}
                rows="2"
                required={formData.number_of_visitors > 1}
                placeholder="Enter names of other visitors (one per line or separated by commas)"
                style={{ minHeight: '35px', maxHeight: '50px' }}
              />
              {errors.additional_visitor_names && (
                <span className="simple-error">{errors.additional_visitor_names}</span>
              )}
              <small style={{ color: '#666', fontSize: '11px', marginTop: '2px', display: 'block' }}>
                List the names of the {formData.number_of_visitors - 1} additional visitor(s)
              </small>
            </div>
          )}

          <div className="simple-form-actions">
            <button
              type="submit"
              className="simple-btn simple-btn-submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
            </div>
          </div>
        </div>

        {/* Right Side - Manager Login */}
        <div className="manager-login-section">
          <div className="manager-login-card">
            <h3 className="manager-login-title">Approver Login</h3>
            <p className="manager-login-subtitle">Access the dashboard to review and manage visit requests</p>
            
            <form onSubmit={handleManagerLogin} className="manager-login-form">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-input ${loginErrors.email ? 'error' : ''}`}
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  placeholder="manager@warehouse.com"
                />
                {loginErrors.email && (
                  <div className="form-error">{loginErrors.email}</div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-input ${loginErrors.password ? 'error' : ''}`}
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  placeholder="Enter password"
                />
                {loginErrors.password && (
                  <div className="form-error">{loginErrors.password}</div>
                )}
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loginLoading}
                style={{ width: '100%', marginTop: '10px' }}
              >
                {loginLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicRequestForm;

