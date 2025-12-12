// API Configuration
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
// Force correct backend URL - no fallback to placeholder
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (isLocalhost 
    ? 'http://localhost:5001' 
    : 'https://carbon-theorem-474515-b2.et.r.appspot.com');

// Log for debugging (remove in production if needed)
if (!isLocalhost && !process.env.REACT_APP_API_URL) {
  console.log('Using backend URL:', 'https://carbon-theorem-474515-b2.et.r.appspot.com');
}

