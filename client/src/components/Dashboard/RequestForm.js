import React, { useState } from 'react';
import { format, startOfDay } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';

const RequestForm = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    purpose: '',
    company_name: '',
    contact_number: '',
    number_of_visitors: 1
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const getMinDate = () => {
    const today = startOfDay(new Date());
    return format(today, 'yyyy-MM-dd');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Restrict contact_number to digits only and max 10 characters
    if (name === 'contact_number') {
      processedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    }
    
    const newFormData = {
      ...formData,
      [name]: name === 'number_of_visitors' ? parseInt(value) || 1 : processedValue
    };
    
    // If start_date changes and end_date is before new start_date, clear end_date
    if (name === 'start_date' && newFormData.end_date && newFormData.end_date < value) {
      newFormData.end_date = '';
    }
    
    setFormData(newFormData);
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    // Clear end_date error if start_date changes
    if (name === 'start_date' && errors.end_date) {
      setErrors({ ...errors, end_date: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const minDate = getMinDate();
    const selectedStartDate = formData.start_date;
    const selectedEndDate = formData.end_date;

    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    } else if (selectedStartDate < minDate) {
      newErrors.start_date = 'Start date cannot be in the past';
    }

    if (selectedEndDate && selectedEndDate < selectedStartDate) {
      newErrors.end_date = 'End date must be after or equal to start date';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required';
    }

    if (!formData.contact_number.trim()) {
      newErrors.contact_number = 'Contact number is required';
    } else if (!/^[0-9]{10}$/.test(formData.contact_number.trim())) {
      newErrors.contact_number = 'Contact number must be exactly 10 digits';
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
        <p className="simple-form-subtitle">Please fill in the details below. Select your visit date.</p>
        
        <form onSubmit={handleSubmit} className="simple-form">
          <div className="simple-form-row">
            <div className="simple-form-field">
              <label>Start Date *</label>
              <input
                type="date"
                name="start_date"
                className={`simple-input ${errors.start_date ? 'error' : ''}`}
                value={formData.start_date}
                onChange={handleChange}
                min={getMinDate()}
                required
                placeholder="Select start date"
              />
              {errors.start_date && (
                <span className="simple-error">{errors.start_date}</span>
              )}
            </div>

            <div className="simple-form-field">
              <label>End Date (Optional)</label>
              <input
                type="date"
                name="end_date"
                className={`simple-input ${errors.end_date ? 'error' : ''}`}
                value={formData.end_date}
                onChange={handleChange}
                min={formData.start_date || getMinDate()}
                placeholder="Select end date"
              />
              {errors.end_date && (
                <span className="simple-error">{errors.end_date}</span>
              )}
            </div>
          </div>

          <div className="simple-form-row">
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
            <label>Contact Number * (10 digits only)</label>
            <input
              type="tel"
              name="contact_number"
              className={`simple-input ${errors.contact_number ? 'error' : ''}`}
              value={formData.contact_number}
              onChange={handleChange}
              maxLength="10"
              pattern="[0-9]{10}"
              required
              placeholder="Enter 10-digit contact number"
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

