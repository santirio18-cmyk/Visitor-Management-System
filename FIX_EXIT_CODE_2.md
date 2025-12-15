# 🔧 Fix Exit Code 2 Error

## ❌ Error: "Process completed with exit code 2"

**Exit code 2** from `gcloud` typically means:
- Configuration error
- Invalid app.yaml settings
- Missing required files
- Permission/authentication issue

---

## 🔍 What Changed

I've updated the workflow to provide **much more detailed diagnostics**:

1. ✅ **Configuration Check** - Shows project ID, files, app.yaml content
2. ✅ **App Engine Verification** - Verifies access and authentication
3. ✅ **Detailed Deployment** - Shows full error output with `--verbosity=debug`

---

## 🚀 Next Steps

### Option 1: Push Updated Workflow (Recommended)

The improved workflow will show exactly what's failing:

```bash
git add .github/workflows/deploy-backend.yml
git commit -m "Add detailed diagnostics for deployment"
git push origin main
```

This will trigger a new deployment with **full error details**.

### Option 2: Check Common Issues

**Common causes of exit code 2:**

1. **Invalid app.yaml**
   - Check syntax
   - Verify runtime version
   - Check environment variables

2. **Missing package.json**
   - Should exist in `server/` folder
   - Should have valid dependencies

3. **Invalid Project ID**
   - Verify `GCP_PROJECT_ID` secret
   - Should be: `carbon-theorem-474515-b2`

4. **Service Account Permissions**
   - Needs App Engine Admin role
   - Needs Storage Admin role

---

## 📋 Pre-Deployment Checklist

Before pushing, verify:

- [ ] `app.yaml` exists in `server/` folder
- [ ] `package.json` exists in `server/` folder
- [ ] `GCP_PROJECT_ID` = `carbon-theorem-474515-b2`
- [ ] `GCP_SA_KEY` = Valid JSON service account key
- [ ] Service account has App Engine Admin role
- [ ] App Engine is enabled (✅ confirmed)

---

## 🔍 What to Look For in Next Run

After pushing the updated workflow, check:

1. **Configuration Check step:**
   - Project ID shown correctly?
   - app.yaml content visible?
   - package.json exists?

2. **App Engine Verification step:**
   - App description shows?
   - Authentication successful?

3. **Deploy step:**
   - Full error message
   - Specific line that failed
   - gcloud error details

---

## 🆘 Common Exit Code 2 Causes

### Issue 1: Invalid app.yaml Syntax
**Error:** "YAML parse error" or "Invalid configuration"
**Fix:** Check app.yaml syntax, indentation

### Issue 2: Missing package.json
**Error:** "package.json not found"
**Fix:** Ensure package.json exists in server/

### Issue 3: Invalid Runtime
**Error:** "Runtime nodejs20 not supported"
**Fix:** Check if runtime version is correct

### Issue 4: Permission Denied
**Error:** "Permission denied" or "Access denied"
**Fix:** Check service account roles

### Issue 5: Invalid Project
**Error:** "Project not found"
**Fix:** Verify GCP_PROJECT_ID secret

---

## 📝 Next Action

**Push the updated workflow** to get detailed error output:

```bash
git add .github/workflows/deploy-backend.yml
git commit -m "Add detailed diagnostics for deployment"
git push origin main
```

Then check GitHub Actions for the **full error message**!

---

**The improved workflow will show exactly what's wrong!** 🔍
