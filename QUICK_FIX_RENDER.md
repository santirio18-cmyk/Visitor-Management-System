# 🚀 Quick Fix - Use Render.com Instead (Easier!)

## Google Cloud is Having Issues - Let's Use Render.com

Render.com is much simpler and works immediately!

---

## Step 1: Go to Render.com
1. Visit: **https://render.com**
2. Sign up with **GitHub** (same account)

## Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect: `Visitor-Management-System`
3. Set these 3 things:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Click **"Create Web Service"**
5. Wait 5 minutes - Done! ✅

## Step 3: Add Environment Variable
1. In Render dashboard, go to **"Environment"** tab
2. Click **"Add Environment Variable"**
3. Add:
   - **Key**: `JWT_SECRET`
   - **Value**: `your-secret-key-12345`
4. Save

## Step 4: Get Your Backend URL
After deployment, you'll get: `https://visitor-management-api.onrender.com`

## Step 5: Update Frontend
Edit `client/src/config.js`:
```javascript
export const API_BASE_URL = 'https://visitor-management-api.onrender.com';
```

Then:
```bash
cd client
npm run deploy
```

---

## That's It!

Render.com is much simpler - no Cloud Shell, no complex setup!

**Try Render.com - it's easier!** 🚀

