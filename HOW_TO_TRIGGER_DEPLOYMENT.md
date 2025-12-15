# 🚀 How to Trigger Backend Deployment

## Quick Guide: Trigger Deployment

There are **3 ways** to trigger the backend deployment:

---

## ✅ Method 1: Push Changes to GitHub (Automatic) ⭐ Recommended

The deployment **automatically triggers** when you push changes to the `server/` folder.

### Steps:

1. **Stage the changes:**
   ```bash
   git add server/scripts/createApprovers.js
   ```

2. **Commit the changes:**
   ```bash
   git commit -m "Add Bharat as third level approver"
   ```

3. **Push to GitHub:**
   ```bash
   git push origin main
   ```

4. **Check GitHub Actions:**
   - Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
   - You'll see a new workflow run: **"Deploy Backend to Google Cloud"**
   - Click on it to watch the deployment progress
   - Takes **2-3 minutes** to complete

5. **Wait for completion:**
   - Look for green checkmarks ✅
   - All steps should pass:
     - ✅ Checkout code
     - ✅ Setup Node.js
     - ✅ Authenticate to Google Cloud
     - ✅ Set up Cloud SDK
     - ✅ Deploy to App Engine

---

## ✅ Method 2: Manual Trigger via GitHub Actions UI

You can manually trigger the workflow from GitHub:

### Steps:

1. **Go to GitHub Actions:**
   - Visit: https://github.com/santirio18-cmyk/Visitor-Management-System/actions

2. **Select the workflow:**
   - Click on **"Deploy Backend to Google Cloud"** (left sidebar)

3. **Click "Run workflow" button:**
   - Top right corner
   - Select branch: **main**
   - Click **"Run workflow"**

4. **Monitor the deployment:**
   - Watch the workflow run in real-time
   - Wait for completion (2-3 minutes)

---

## ✅ Method 3: Manual Deployment via Google Cloud Shell

If you prefer to deploy directly:

### Steps:

1. **Open Google Cloud Shell:**
   - Go to: https://console.cloud.google.com/
   - Click the Cloud Shell icon (top right)

2. **Navigate to your project:**
   ```bash
   cd Visitor-Management-System/server
   ```

3. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

4. **Deploy:**
   ```bash
   gcloud app deploy app.yaml --quiet --project=YOUR_PROJECT_ID
   ```
   (Replace `YOUR_PROJECT_ID` with your actual project ID)

5. **Wait for deployment:**
   - Type `Y` when prompted
   - Takes 2-3 minutes

---

## 📋 What Triggers Automatic Deployment?

The workflow automatically runs when:

✅ **Push to `main` branch** AND
✅ **Changes in `server/**` folder** OR
✅ **Changes to `.github/workflows/deploy-backend.yml`**

---

## 🔍 How to Check Deployment Status

### Option 1: GitHub Actions
- URL: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
- Look for latest workflow run
- Check if it's ✅ green (success) or ❌ red (failed)

### Option 2: Google Cloud Console
- Go to: https://console.cloud.google.com/appengine
- Check App Engine deployments
- Look for latest version

### Option 3: Test Backend Health
```bash
curl https://carbon-theorem-474515-b2.et.r.appspot.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

---

## ⚠️ Troubleshooting

### If deployment fails:

1. **Check GitHub Actions logs:**
   - Click on the failed workflow
   - Check which step failed
   - Read error messages

2. **Common issues:**
   - ❌ Missing secrets (GCP_SA_KEY, GCP_PROJECT_ID)
   - ❌ Google Cloud authentication issues
   - ❌ Build errors in server code

3. **Fix and retry:**
   - Fix the issue
   - Push again or trigger manually

---

## 🎯 Quick Command Reference

```bash
# Check current status
git status

# Stage changes
git add server/scripts/createApprovers.js

# Commit
git commit -m "Add Bharat as third level approver"

# Push (triggers auto-deployment)
git push origin main

# Check deployment status
# Visit: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
```

---

## ✅ After Deployment

Once deployment completes:

1. **Verify Bharat account:**
   - Login: `bharath.chandrasekaran@tvs.in`
   - Password: `Bh@rath2024#TVS!Approver3`
   - Should see Third Level Approver Dashboard

2. **Test approval flow:**
   - Submit a test request
   - Jagadeesan → Varadan → Bharat
   - All three levels should work

---

**Ready to deploy! Choose any method above.** 🚀

