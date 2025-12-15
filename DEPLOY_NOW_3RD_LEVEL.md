# Deploy 3rd Level Approval System - Quick Steps

## ✅ Frontend: DEPLOYED
The frontend has been successfully deployed to GitHub Pages with the 3rd level approver dashboard.

## 🔄 Backend: Needs Manual Trigger

Since the git push is blocked by workflow permissions, you need to manually trigger the backend deployment:

### Option 1: Manual GitHub Actions Trigger (Easiest)

1. **Go to GitHub Actions:**
   - Open: https://github.com/santirio18-cmyk/Visitor-Management-System/actions

2. **Click "Run workflow" button:**
   - Look for the "Deploy Backend to Google Cloud" workflow
   - Click the "Run workflow" dropdown button (top right)
   - Select branch: `main`
   - Click the green "Run workflow" button

3. **Wait for deployment:**
   - Watch the workflow run (takes 5-10 minutes)
   - You'll see it deploy the backend to Google Cloud
   - The database will automatically create the 3rd level approver account

4. **Check logs:**
   - After deployment, check Google Cloud Console > App Engine > Logs
   - Look for: `✓ Approver created: Bharath Chandrasekaran`

### Option 2: Push via GitHub Web Interface

1. Go to: https://github.com/santirio18-cmyk/Visitor-Management-System
2. The code is already committed locally
3. You can manually upload the changed files via GitHub web interface if needed

## 🧪 After Deployment - Test Login

Once backend is deployed, test with:

- **Email:** `bharath.chandrasekaran@tvs.in`
- **Password:** `Bh@rath2024#TVS!Approver3`

## 📋 What Will Happen

1. Backend server restarts on Google Cloud
2. Database initialization runs automatically
3. Creates/updates the 3rd level approver account:
   - Name: Bharath Chandrasekaran
   - Email: bharath.chandrasekaran@tvs.in
   - Role: third_level_approver
4. Frontend already has the 3rd level dashboard (deployed)

## ✅ Verification

After deployment completes:

1. **Login Test:**
   - Try logging in with the 3rd level approver credentials
   - Should see "Third Level Approver Dashboard"

2. **Check Backend Logs:**
   - Google Cloud Console > App Engine > Logs
   - Search for: "Approver created" or "Bharath"

3. **Clear Browser Cache:**
   - If dashboard doesn't show, use incognito mode
   - Or hard refresh: Cmd+Shift+R (Mac) / Ctrl+F5 (Windows)

## 🎯 Current Status

- ✅ Frontend: Deployed with 3rd level dashboard
- ⏳ Backend: Waiting for manual workflow trigger
- ✅ Code: All changes committed and ready




