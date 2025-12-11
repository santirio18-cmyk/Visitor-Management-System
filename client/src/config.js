// API Configuration
// For production, update this to your backend URL after deploying
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:5001' 
    : 'https://visitor-management-api.onrender.com'); // Render.com backend URL - Update if using Google Cloud

