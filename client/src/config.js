// API Configuration
// For production, update this to your backend URL after deploying
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:5001' 
    : 'https://your-backend-url.uc.r.appspot.com'); // Update this with your Google Cloud backend URL

