# 🔧 Fix Live App - Unable to Submit Request

## Problem
The live app can't submit requests because the backend is not deployed yet.

## Solution: Deploy Backend First

### Option 1: Deploy to Google Cloud (Recommended)

1. **Deploy Backend:**
   ```bash
   cd server
   gcloud app deploy
   ```

2. **Get Your Backend URL:**
   After deployment, you'll get a URL like:
   ```
   https://visitor-management-system.uc.r.appspot.com
   ```

3. **Update Frontend Config:**
   Edit `client/src/config.js`:
   ```javascript
   export const API_BASE_URL = 'https://your-actual-backend-url.uc.r.appspot.com';
   ```
   (Replace with your actual backend URL)

4. **Rebuild and Deploy Frontend:**
   ```bash
   cd client
   npm run deploy
   ```

### Option 2: Quick Fix - Use Render.com (Easier)

1. **Go to Render.com:**
   - Visit: https://render.com
   - Sign up with GitHub

2. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect: `Visitor-Management-System`
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `npm start`
   - Plan: Free

3. **Add Environment Variable:**
   - Key: `JWT_SECRET`
   - Value: `your-secret-key-12345`

4. **Get Backend URL:**
   After deployment: `https://visitor-management-api.onrender.com`

5. **Update Frontend:**
   Edit `client/src/config.js`:
   ```javascript
   export const API_BASE_URL = 'https://visitor-management-api.onrender.com';
   ```

6. **Deploy Frontend:**
   ```bash
   cd client
   npm run deploy
   ```

---

## Quick Steps Summary

1. Deploy backend (Google Cloud or Render)
2. Copy backend URL
3. Update `client/src/config.js` with backend URL
4. Run `cd client && npm run deploy`
5. Wait 1-2 minutes
6. Test the live app!

---

## Current Status

- ✅ Frontend deployed: https://santirio18-cmyk.github.io/Visitor-Management-System/
- ❌ Backend not deployed yet (that's why requests fail)

Once backend is deployed and config is updated, everything will work! 🎉


