# 🚀 Deploy Your Visitor Management System - Step by Step

## Your Live URLs Will Be:
- **Frontend (Public App)**: `https://your-app-name.netlify.app`
- **Backend API**: `https://your-backend.onrender.com`

---

## Part 1: Deploy Backend (API) to Render.com

### Step 1: Create Render Account
1. Go to **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with your **GitHub account** (easiest way)

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository:
   - Select: `santirio18-cmyk/Visitor-Management-System`
   - Click **"Connect"**

### Step 3: Configure Backend Service
Fill in these settings:

- **Name**: `visitor-management-api` (or any name you like)
- **Region**: Choose closest to you (e.g., `Singapore` or `Oregon`)
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: **Free** (select this)

### Step 4: Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"** and add:

```
NODE_ENV=production
PORT=10000
JWT_SECRET=your-super-secret-jwt-key-change-this
```

(Replace `your-super-secret-jwt-key-change-this` with a random string)

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Copy your backend URL (e.g., `https://visitor-management-api.onrender.com`)

---

## Part 2: Deploy Frontend to Netlify

### Step 1: Create Netlify Account
1. Go to **https://netlify.com**
2. Click **"Sign up"**
3. Sign up with your **GitHub account**

### Step 2: Deploy from GitHub
1. Click **"Add new site"** → **"Import an existing project"**
2. Select **"Deploy with GitHub"**
3. Authorize Netlify to access your GitHub
4. Select repository: `Visitor-Management-System`

### Step 3: Configure Build Settings
Netlify will auto-detect, but verify:

- **Base directory**: (leave empty)
- **Build command**: `cd client && npm install && npm run build`
- **Publish directory**: `client/build`

### Step 4: Add Environment Variable
1. Click **"Site settings"** → **"Environment variables"**
2. Add new variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: Your Render backend URL (from Part 1, Step 5)
     - Example: `https://visitor-management-api.onrender.com`

### Step 5: Deploy
1. Click **"Deploy site"**
2. Wait 3-5 minutes
3. Your app will be live at: `https://random-name-12345.netlify.app`

### Step 6: Change Site Name (Optional)
1. Go to **"Site settings"** → **"Change site name"**
2. Change to: `visitor-management-system` (or your preferred name)
3. Your new URL: `https://visitor-management-system.netlify.app`

---

## Part 3: Update Frontend Config

After deployment, update the config to use the live backend URL.

The frontend will automatically use `REACT_APP_API_URL` environment variable.

---

## ✅ Verification Checklist

- [ ] Backend deployed on Render.com
- [ ] Backend URL copied (e.g., `https://visitor-management-api.onrender.com`)
- [ ] Frontend deployed on Netlify
- [ ] Environment variable `REACT_APP_API_URL` set in Netlify
- [ ] Frontend URL working (e.g., `https://visitor-management-system.netlify.app`)
- [ ] Test the app: Submit a visitor request
- [ ] Test login: Approver login works

---

## 🎉 Your Public URLs

Once deployed, you'll have:

1. **Public App URL**: `https://visitor-management-system.netlify.app`
   - Share this with anyone!
   - Visitors can submit requests here
   - Approvers can login here

2. **Backend API**: `https://visitor-management-api.onrender.com`
   - This runs in the background
   - Don't share this directly

---

## 📝 Important Notes

1. **Free Tier Limits**:
   - Render: Backend sleeps after 15 minutes of inactivity (wakes up on first request)
   - Netlify: 100GB bandwidth/month (usually enough)

2. **Database**:
   - SQLite file is stored on Render
   - Data persists between deployments

3. **Email Setup**:
   - You'll need to configure email in Render's environment variables
   - Add your email credentials to Render dashboard

---

## 🆘 Troubleshooting

**Backend not working?**
- Check Render logs: Click on your service → "Logs"
- Verify environment variables are set
- Check if `PORT` is set correctly

**Frontend can't connect to backend?**
- Verify `REACT_APP_API_URL` in Netlify matches your Render URL
- Check browser console for CORS errors
- Rebuild frontend after changing environment variables

**Need help?**
- Render docs: https://render.com/docs
- Netlify docs: https://docs.netlify.com

---

## 🚀 Quick Start Commands

After deployment, you can update code:
```bash
git add .
git commit -m "Update app"
git push origin main
```

Both Netlify and Render will auto-deploy on push!





