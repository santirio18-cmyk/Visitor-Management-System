# ⚠️ Backend Not Deployed - That's Why It's Failing!

## The Problem
Your live app is trying to connect to: `https://visitor-management-api.onrender.com`

But this backend **doesn't exist yet** - that's why requests are failing!

---

## ✅ Solution: Deploy Backend Now (5 Minutes)

### Step 1: Go to Render.com
1. Visit: **https://render.com**
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with your **GitHub account** (easiest way)

### Step 2: Create New Web Service
1. Click **"New +"** button (top right)
2. Click **"Web Service"**
3. Click **"Connect account"** → Select **GitHub**
4. Authorize Render to access your repositories
5. Select repository: **`Visitor-Management-System`**
6. Click **"Connect"**

### Step 3: Configure the Service
Fill in these settings:

- **Name**: `visitor-management-api`
- **Region**: Choose closest (e.g., `Singapore` or `Oregon`)
- **Branch**: `main`
- **Root Directory**: `server` ⚠️ **IMPORTANT!**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Select **"Free"**

### Step 4: Add Environment Variable
1. Scroll down to **"Environment Variables"** section
2. Click **"Add Environment Variable"**
3. Add:
   - **Key**: `JWT_SECRET`
   - **Value**: `your-secret-key-12345` (any random string, like `abc123xyz789`)
4. Click **"Add"**

### Step 5: Deploy!
1. Scroll to bottom
2. Click **"Create Web Service"**
3. Wait 5-10 minutes for deployment
4. You'll see logs showing the build progress

### Step 6: Get Your Backend URL
After deployment completes:
1. You'll see a URL like: `https://visitor-management-api.onrender.com`
2. Copy this URL
3. Test it: Visit `https://your-backend-url.onrender.com/api/health`
   - Should show: `{"status":"OK","message":"Server is running"}`

---

## ✅ After Backend is Deployed

1. **Frontend is already configured** to use: `https://visitor-management-api.onrender.com`
2. **If your backend URL is different**, update `client/src/config.js`:
   ```javascript
   export const API_BASE_URL = 'https://your-actual-backend-url.onrender.com';
   ```
3. **Redeploy frontend:**
   ```bash
   cd client
   npm run deploy
   ```

---

## 🧪 Test It

1. Visit: https://santirio18-cmyk.github.io/Visitor-Management-System/
2. Fill out the visitor form
3. Click "Submit Request"
4. Should work now! 🎉

---

## 📝 Quick Checklist

- [ ] Signed up on Render.com
- [ ] Created Web Service
- [ ] Set Root Directory to `server`
- [ ] Added `JWT_SECRET` environment variable
- [ ] Deployed (wait 5-10 minutes)
- [ ] Tested backend URL (`/api/health`)
- [ ] Tested form submission on live site

---

## 🆘 Still Not Working?

**Check these:**
1. Backend URL is correct in `client/src/config.js`
2. Backend is actually running (check Render dashboard)
3. Backend logs show no errors
4. CORS is enabled (already done in code)

**Common Issues:**
- **"Not Found"**: Backend not deployed or wrong URL
- **"Connection refused"**: Backend not running
- **"CORS error"**: Already fixed in code, but check if backend URL is correct

---

**Deploy the backend now and your app will work!** 🚀





