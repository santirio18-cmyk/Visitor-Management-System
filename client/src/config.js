// API Configuration
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (isLocalhost 
    ? 'http://localhost:5001' 
    : 'https://carbon-theorem-474515-b2.et.r.appspot.com');

