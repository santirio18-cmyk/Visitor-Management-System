# 🚀 Deploy Visitor Management System - Same as Expense Tracker!

## Quick Deploy Guide (GitHub Pages + Backend)

Since your expense tracker used **GitHub Pages**, we'll do the same for the frontend, and deploy the backend separately.

---

## Part 1: Deploy Frontend to GitHub Pages (5 minutes)

### Option 1: Quick Deploy Script (Easiest!)

Just run:
```bash
./deploy-to-github-pages.sh
```

This will:
1. Build your React app
2. Copy files to `docs/` folder
3. Push to GitHub

Then:
1. Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/settings/pages
2. Set Source to: **`/docs` folder**
3. Click **"Save"**
4. Your app will be live in 1-2 minutes!

### Option 2: Manual Deploy

**Step 1: Build the React App**
```bash
cd client
npm install
npm run build
```

**Step 2: Copy to docs folder**
```bash
cd ..
mkdir -p docs
cp -r client/build/* docs/
```

**Step 3: Commit and Push**
```bash
git add docs/
git commit -m "Deploy to GitHub Pages"
git push origin main
```

**Step 4: Enable GitHub Pages**
1. Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/settings/pages
2. Set Source to: **`/docs` folder**
3. Click **"Save"**

### Step 4: Your Live URL
After 1-2 minutes, your app will be live at:
```
https://santirio18-cmyk.github.io/Visitor-Management-System/
```

---

## Part 2: Deploy Backend to Render.com (Free)

### Step 1: Go to Render.com
1. Visit: https://render.com
2. Sign up with **GitHub** (same account)

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect repository: `Visitor-Management-System`
3. Configure:
   - **Name**: `visitor-management-api`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

### Step 3: Add Environment Variables
Add these in Render dashboard:
```
NODE_ENV=production
PORT=10000
JWT_SECRET=your-secret-key-12345
```

### Step 4: Get Backend URL
After deployment (5-10 minutes), copy your backend URL:
```
https://visitor-management-api.onrender.com
```

---

## Part 3: Connect Frontend to Backend

### Update Frontend Config

1. In your GitHub repository, go to **Settings** → **Pages**
2. Add environment variable (if supported) OR
3. Update `client/src/config.js` before building:

```javascript
export const API_BASE_URL = 'https://visitor-management-api.onrender.com';
```

Then rebuild:
```bash
cd client
npm run build
git add .
git commit -m "Update API URL for production"
git push origin main
```

---

## ✅ Final URLs

- **Frontend (Public App)**: `https://santirio18-cmyk.github.io/Visitor-Management-System/`
- **Backend API**: `https://visitor-management-api.onrender.com`

---

## 🎯 Quick Commands

```bash
# Build frontend
cd client && npm run build

# Commit and push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# Your app will be live in 1-2 minutes!
```

---

## 📝 Notes

1. **GitHub Pages** is free and easy (just like your expense tracker!)
2. **Render** backend is free (may sleep after 15 min inactivity)
3. Every time you push to GitHub, Pages auto-updates
4. Backend needs to be deployed separately on Render

---

## 🆘 Troubleshooting

**Frontend not loading?**
- Check GitHub Pages settings: Settings → Pages
- Wait 1-2 minutes after enabling
- Check if `index.html` is in the root or `client/build`

**Backend not connecting?**
- Verify backend URL in `client/src/config.js`
- Rebuild frontend after changing config
- Check Render logs for errors

---

That's it! Same easy process as your expense tracker! 🎉

