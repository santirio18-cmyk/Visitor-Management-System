# 🔧 Fix Deployment Error - Exit Code 1

## ❌ Error: "Process completed with exit code 1"

This means the `gcloud app deploy` command failed. Let's diagnose and fix it.

---

## 🔍 Step-by-Step Diagnosis

### Step 1: Check GitHub Secrets

**Go to:** https://github.com/santirio18-cmyk/Visitor-Management-System/settings/secrets/actions

**Verify these secrets exist:**
- ✅ `GCP_SA_KEY` - Service account JSON key
- ✅ `GCP_PROJECT_ID` - Google Cloud project ID

**If missing, add them:**
1. Click **"New repository secret"**
2. Name: `GCP_SA_KEY`
3. Value: Paste entire service account JSON (from Google Cloud)
4. Click **"Add secret"**
5. Repeat for `GCP_PROJECT_ID`

---

### Step 2: Verify Service Account Key Format

The `GCP_SA_KEY` should be valid JSON:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...",
  ...
}
```

**Common issues:**
- ❌ Missing quotes or brackets
- ❌ Extra spaces or line breaks
- ❌ Expired key
- ❌ Wrong service account

---

### Step 3: Check Service Account Permissions

**Go to:** Google Cloud Console → IAM & Admin → Service Accounts

**Find your service account** and verify it has these roles:
- ✅ **App Engine Admin** (`roles/appengine.admin`)
- ✅ **Storage Admin** (`roles/storage.admin`)
- ✅ **Service Account User** (`roles/iam.serviceAccountUser`)

**To add roles:**
1. Click on service account
2. Click **"Permissions"** tab
3. Click **"Grant Access"**
4. Add roles above
5. Save

---

### Step 4: Verify App Engine is Enabled

**Go to:** https://console.cloud.google.com/appengine

**Check:**
- ✅ App Engine is enabled
- ✅ Region is selected
- ✅ Project matches your `GCP_PROJECT_ID`

**If not enabled:**
1. Click **"Create Application"**
2. Select region (e.g., `us-central`)
3. Click **"Create"**
4. Wait for initialization

---

### Step 5: Check Project ID

**Verify your project ID:**
- Go to: Google Cloud Console → Dashboard
- Check **Project ID** (not Project Name)
- Should match: `carbon-theorem-474515-b2` (or your actual ID)

**Update secret if wrong:**
- Go to: GitHub → Settings → Secrets
- Edit `GCP_PROJECT_ID`
- Use correct project ID

---

## 🔧 Quick Fixes

### Fix 1: Add Better Error Handling

Update the workflow to show more details:

```yaml
- name: Deploy to App Engine
  run: |
    cd server
    echo "Deploying to project: ${{ secrets.GCP_PROJECT_ID }}"
    gcloud config set project ${{ secrets.GCP_PROJECT_ID }}
    gcloud app deploy app.yaml --quiet --verbosity=debug
```

### Fix 2: Test Locally First

Test deployment locally before pushing:

```bash
# Authenticate
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Deploy
cd server
gcloud app deploy app.yaml
```

If this works locally, the issue is with GitHub secrets.

---

## 📋 Checklist Before Retry

- [ ] `GCP_SA_KEY` secret exists in GitHub
- [ ] `GCP_PROJECT_ID` secret exists in GitHub
- [ ] Service account key is valid JSON
- [ ] Service account has App Engine Admin role
- [ ] App Engine is enabled in Google Cloud
- [ ] Project ID matches in both places
- [ ] `app.yaml` file exists in `server/` folder

---

## 🚀 Retry Deployment

### Option 1: Re-run Workflow
1. Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
2. Click failed workflow
3. Click **"Re-run all jobs"**

### Option 2: Fix Secrets and Push
1. Fix secrets (if needed)
2. Push again:
   ```bash
   git commit --allow-empty -m "Retry deployment"
   git push origin main
   ```

---

## 🆘 Most Common Issues

### Issue 1: Missing GCP_SA_KEY
**Symptom:** Authentication fails
**Fix:** Add service account JSON as `GCP_SA_KEY` secret

### Issue 2: Wrong Project ID
**Symptom:** "Project not found"
**Fix:** Update `GCP_PROJECT_ID` secret with correct ID

### Issue 3: Insufficient Permissions
**Symptom:** "Permission denied"
**Fix:** Add App Engine Admin role to service account

### Issue 4: App Engine Not Enabled
**Symptom:** "App Engine application not found"
**Fix:** Enable App Engine in Google Cloud Console

---

## 📞 Need More Help?

**Share:**
1. Which step failed (from workflow logs)
2. Full error message
3. Screenshot of error (if possible)

I can help diagnose the specific issue!

---

**Next Steps:** Check your GitHub secrets and verify they're correct! 🔍
