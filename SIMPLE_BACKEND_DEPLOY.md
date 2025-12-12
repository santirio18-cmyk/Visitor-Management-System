# 🚀 Simple Backend Deploy - Just Like Before!

## Easiest Way - Render.com (2 Steps!)

### Step 1: Go to Render.com
1. Visit: **https://render.com**
2. Sign up with **GitHub** (same account)

### Step 2: Deploy
1. Click **"New +"** → **"Web Service"**
2. Connect: `Visitor-Management-System`
3. Set these 3 things:
   - **Root Directory**: `server`
   - **Build**: `npm install`
   - **Start**: `npm start`
4. Click **"Create Web Service"**
5. Wait 5 minutes - Done! ✅

---

## That's It!

Your backend will be at: `https://visitor-management-api.onrender.com`

---

## Update Frontend (One Time)

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

**That's all! Simple like before!** 🎉


