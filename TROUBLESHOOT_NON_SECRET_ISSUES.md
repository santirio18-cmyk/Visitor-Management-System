# 🔧 Troubleshoot Non-Secret Issues

## ✅ Secrets Verified - Check Other Issues

If secrets are correct but deployment still fails, check these:

---

## 🔍 Common Non-Secret Issues

### Issue 1: Service Account Permissions

**Error:** "Permission denied" or "Access denied"

**Check:**
1. Go to: Google Cloud Console → IAM & Admin → Service Accounts
2. Find your service account
3. Verify it has these roles:
   - ✅ **App Engine Admin** (`roles/appengine.admin`)
   - ✅ **Storage Admin** (`roles/storage.admin`)
   - ✅ **Service Account User** (`roles/iam.serviceAccountUser`)

**Fix:**
- Add missing roles to service account
- Wait 1-2 minutes for permissions to propagate

---

### Issue 2: App Engine Region Mismatch

**Error:** "Region not found" or deployment fails

**Check:**
- Your App Engine region: `asia-southeast2` (from dashboard)
- Make sure region is correct

**Note:** Region is set when App Engine is first created and cannot be changed.

---

### Issue 3: Invalid app.yaml Configuration

**Error:** "Invalid configuration" or "YAML parse error"

**Check:**
- `app.yaml` syntax is correct
- Runtime version: `nodejs20` (supported)
- Environment: `standard` (correct)

**Current config looks good:**
```yaml
runtime: nodejs20
env: standard
instance_class: F1
```

---

### Issue 4: Missing Dependencies

**Error:** "Build failed" or "npm install failed"

**Check:**
- `package.json` exists in `server/` folder ✅
- All dependencies are listed ✅
- No syntax errors in package.json ✅

**Current package.json looks good!**

---

### Issue 5: Database File Issues

**Error:** "Database error" or "Cannot create database"

**Note:** SQLite database will be created automatically on first run.
- Database file: `server/database/vendor_management.db`
- Should be created automatically
- Check `.gcloudignore` doesn't exclude it

---

### Issue 6: Port Configuration

**Error:** "Port already in use" or connection issues

**Check:**
- `app.yaml` sets: `PORT: 8080` ✅
- `index.js` uses: `process.env.PORT || 8080` ✅
- Should work correctly

---

## 🔍 Check Workflow Logs

After deployment runs, check:

1. **Which step failed?**
   - Configuration Check → Secret issue (but you said secrets are OK)
   - App Engine Access → Permission issue
   - Deploy step → Build/deployment issue

2. **What's the exact error message?**
   - Copy the full error
   - Look for specific error codes
   - Check gcloud error details

---

## 📋 Diagnostic Checklist

If secrets are correct, verify:

- [ ] Service account has App Engine Admin role
- [ ] Service account has Storage Admin role
- [ ] Service account has Service Account User role
- [ ] App Engine is enabled (✅ confirmed)
- [ ] app.yaml syntax is correct (✅ looks good)
- [ ] package.json exists and is valid (✅ looks good)
- [ ] No build errors in code

---

## 🚀 After Triggering

**Monitor the workflow:**
- Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
- Click latest workflow run
- Check each step for errors

**If it fails:**
- Click on failed step (red X)
- Scroll to see full error message
- Share error message for help

---

## 🆘 Most Likely Issues (If Secrets OK)

1. **Service Account Permissions** (most common)
   - Check IAM roles
   - Add missing roles

2. **Build Errors**
   - Check code syntax
   - Verify all dependencies

3. **App Engine Configuration**
   - Verify region matches
   - Check app.yaml settings

---

**Deployment triggered! Check GitHub Actions and share any error messages you see.** 🔍
