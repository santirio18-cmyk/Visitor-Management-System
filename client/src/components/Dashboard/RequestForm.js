import React, { useState } from 'react';
import { format, addDays, startOfDay, parseISO } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';

const RequestForm = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    visit_date: '',
    purpose: '',
    company_name: '',
    contact_number: '',
    number_of_visitors: 1
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const getMinDate = () => {
    const today = startOfDay(new Date());
    return format(addDays(today, 2), 'yyyy-MM-dd');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'number_of_visitors' ? parseInt(value) || 1 : value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const minDate = getMinDate();
    const selectedDate = formData.visit_date;

    if (!formData.visit_date) {
      newErrors.visit_date = 'Visit date is required';
    } else if (selectedDate < minDate) {
      newErrors.visit_date = `Visit date must be at least 2 days from today (minimum: ${minDate})`;
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required';
    }

    if (!formData.contact_number.trim()) {
      newErrors.contact_number = 'Contact number is required';
    }

    if (formData.number_of_visitors < 1) {
      newErrors.number_of_visitors = 'Number of visitors must be at least 1';
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
      const response = await axios.post(`${API_BASE_URL}/api/requests`, formData);
      onSuccess(response.data.request);
    } catch (error) {
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

  return (
    <div className="simple-form-container">
      <div className="simple-form-card">
        <h2 className="simple-form-title">Request Warehouse Visit</h2>
        <p className="simple-form-subtitle">Please fill in the details below. Visit date must be at least 2 days from today.</p>
        
        <form onSubmit={handleSubmit} className="simple-form">
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
            <label>Purpose of Visit *</label>
            <textarea
              name="purpose"
              className={`simple-textarea ${errors.purpose ? 'error' : ''}`}
              value={formData.purpose}
              onChange={handleChange}
              rows="3"
              required
              placeholder="Briefly describe the purpose of your visit"
            />
            {errors.purpose && (
              <span className="simple-error">{errors.purpose}</span>
            )}
          </div>

          <div className="simple-form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="simple-btn simple-btn-cancel"
              disabled={loading}
            >
              Cancel
            </button>
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
  );
};

export default RequestForm;

