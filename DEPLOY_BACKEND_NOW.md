# 🚨 IMPORTANT: Deploy Backend Now!

## The Problem
Your live app can't submit requests because **the backend is not deployed yet**.

The frontend is trying to connect to: `https://visitor-management-api.onrender.com`

But this backend doesn't exist yet!

---

## Quick Fix: Deploy Backend to Render.com (5 minutes)

### Step 1: Go to Render.com
1. Visit: https://render.com
2. Sign up with **GitHub** (same account)

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect repository: `Visitor-Management-System`
3. Configure:
   - **Name**: `visitor-management-api`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

### Step 3: Add Environment Variable
Click **"Advanced"** → **"Add Environment Variable"**:
- **Key**: `JWT_SECRET`
- **Value**: `your-secret-key-12345` (any random string)

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes
3. Copy your backend URL (e.g., `https://visitor-management-api.onrender.com`)

### Step 5: Update Frontend (If URL is different)
If your backend URL is different, update `client/src/config.js`:
```javascript
export const API_BASE_URL = 'https://your-actual-backend-url.onrender.com';
```

Then:
```bash
cd client
npm run deploy
```

---

## After Deployment

1. ✅ Backend will be live at: `https://visitor-management-api.onrender.com`
2. ✅ Frontend will connect automatically
3. ✅ Submit requests will work!

---

## Test It

1. Visit: https://santirio18-cmyk.github.io/Visitor-Management-System/
2. Fill out the form
3. Click "Submit Request"
4. Should work now! 🎉

---

**Deploy the backend now and your live app will work!**

