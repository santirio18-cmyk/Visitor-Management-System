# 🔧 Redeploy Backend to Fix CORS (PATCH Method)

## The Issue
The live backend on Google Cloud doesn't have `PATCH` in the allowed CORS methods, causing "failed to update request" errors.

## Quick Fix

### Step 1: Go to Google Cloud Shell
1. Visit: https://shell.cloud.google.com
2. Select your project: `carbon-theorem-474515-b2`

### Step 2: Pull Latest Code
```bash
cd Visitor-Management-System/server/Visitor-Management-System/server
git pull
```

### Step 3: Deploy
```bash
gcloud app deploy
```
Type `Y` when asked.

### Step 4: Wait 2-3 Minutes
The deployment takes 2-3 minutes.

---

## What Was Fixed
✅ Added `PATCH` to CORS allowed methods in `server/index.js`
✅ This allows approve/reject actions to work

---

## After Deployment
1. Wait 2-3 minutes
2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
3. Test the live app again

---

**Backend URL:** https://carbon-theorem-474515-b2.et.r.appspot.com


