# ⚠️ Deployment Failed - Troubleshooting Guide

## 🔍 What Happened

The GitHub Actions workflow **"Add Bharat as third level approver"** has **FAILED** ❌

**Details:**
- **Workflow:** Deploy Backend to Google Cloud
- **Commit:** b6b98c4
- **Status:** Failed (red X)
- **Time:** ~30 seconds

---

## 🔎 How to Check Failure Details

### Step 1: Click on the Failed Workflow
1. Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
2. Click on the failed run: **"Add Bharat as third level approver"**

### Step 2: Check Which Step Failed
Look for the step with a ❌ red X. Common failure points:

- ❌ **Checkout code** - Rare, usually works
- ❌ **Setup Node.js** - Rare, usually works
- ❌ **Authenticate to Google Cloud** - **MOST COMMON**
  - Issue: Missing or invalid `GCP_SA_KEY` secret
  - Issue: Service account key expired or incorrect
- ❌ **Set up Cloud SDK** - Rare, usually works
- ❌ **Deploy to App Engine** - **COMMON**
  - Issue: Missing `GCP_PROJECT_ID` secret
  - Issue: App Engine not enabled
  - Issue: Insufficient permissions
  - Issue: Build errors in code

### Step 3: Read Error Messages
- Click on the failed step
- Scroll down to see the error output
- Look for specific error messages

---

## 🔧 Common Issues & Solutions

### Issue 1: Missing GCP_SA_KEY Secret

**Error:** `Error: Missing credentials`

**Solution:**
1. Go to: Repository Settings → Secrets and variables → Actions
2. Check if `GCP_SA_KEY` exists
3. If missing, add it:
   - Get service account JSON key from Google Cloud
   - Add as secret: `GCP_SA_KEY`
   - Paste entire JSON content

### Issue 2: Missing GCP_PROJECT_ID Secret

**Error:** `Error: Missing project ID`

**Solution:**
1. Go to: Repository Settings → Secrets and variables → Actions
2. Add secret: `GCP_PROJECT_ID`
3. Value: Your Google Cloud project ID (e.g., `carbon-theorem-474515-b2`)

### Issue 3: Invalid Service Account Key

**Error:** `Error: Invalid credentials` or `Authentication failed`

**Solution:**
1. Verify service account key is valid
2. Check if service account has required roles:
   - App Engine Admin
   - Storage Admin
   - Service Account User
3. Regenerate key if needed

### Issue 4: App Engine Not Enabled

**Error:** `Error: App Engine application not found`

**Solution:**
1. Go to: Google Cloud Console → App Engine
2. Enable App Engine if not enabled
3. Select region
4. Wait for initialization

### Issue 5: Build Errors

**Error:** `Error: Build failed` or syntax errors

**Solution:**
1. Check server code for syntax errors
2. Verify all dependencies in `package.json`
3. Test locally first: `cd server && npm install && npm start`

---

## 📋 Quick Checklist

Before retrying, verify:

- ✅ `GCP_SA_KEY` secret exists in GitHub
- ✅ `GCP_PROJECT_ID` secret exists in GitHub
- ✅ Service account key is valid JSON
- ✅ Service account has App Engine Admin role
- ✅ App Engine is enabled in Google Cloud
- ✅ Server code has no syntax errors
- ✅ `app.yaml` file exists in `server/` folder

---

## 🔄 How to Retry

### Option 1: Re-run Failed Workflow
1. Go to the failed workflow run
2. Click **"Re-run all jobs"** or **"Re-run failed jobs"**
3. Wait for completion

### Option 2: Fix and Push Again
1. Fix the issue (based on error message)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Fix deployment issue"
   git push origin main
   ```

### Option 3: Manual Trigger
1. Go to: Actions → Deploy Backend to Google Cloud
2. Click **"Run workflow"**
3. Select branch: `main`
4. Click **"Run workflow"**

---

## 🆘 Need Help?

**Share the error message from the failed step, and I can help you fix it!**

Common error patterns:
- `Error: Missing credentials` → Check secrets
- `Error: Permission denied` → Check service account roles
- `Error: Build failed` → Check code syntax
- `Error: App Engine not found` → Enable App Engine

---

**Next Step:** Click on the failed workflow run and share the error message! 🔍

