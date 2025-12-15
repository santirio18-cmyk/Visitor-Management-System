# 🔧 Fix Service Account Permission Error

## ❌ New Error Found!

**Error:** "You do not have permission to act as '***@appspot.gserviceaccount.com'"

**Cause:** Your service account needs permission to impersonate the App Engine default service account.

---

## ✅ Solution: Grant Service Account User Role

### Step 1: Find Your Service Account Email

The error shows your service account is:
`github-actions-deployer@***.iam.gserviceaccount.com`

**To find it:**
1. Go to: Google Cloud Console → IAM & Admin → Service Accounts
2. Look for service account used in GitHub Actions
3. Copy the email address

### Step 2: Grant Service Account User Role

**Option A: Via Google Cloud Console (Easiest)**

1. **Go to:** Google Cloud Console → IAM & Admin → Service Accounts
   - Direct: https://console.cloud.google.com/iam-admin/serviceaccounts

2. **Find:** App Engine default service account
   - Name: `***@appspot.gserviceaccount.com` (where *** is your project number)
   - Or search for: `appspot.gserviceaccount.com`

3. **Click** on the App Engine default service account

4. **Click** "Permissions" tab

5. **Click** "Grant Access"

6. **Add Principal:**
   - Enter: `github-actions-deployer@***.iam.gserviceaccount.com`
   - (Replace *** with your project ID)

7. **Select Role:**
   - Search for: `Service Account User`
   - Select: **Service Account User** (`roles/iam.serviceAccountUser`)

8. **Click** "Save"

**Option B: Via gcloud CLI**

```bash
# Set variables
PROJECT_ID="carbon-theorem-474515-b2"
SERVICE_ACCOUNT="github-actions-deployer@${PROJECT_ID}.iam.gserviceaccount.com"
APP_ENGINE_SA="${PROJECT_ID}@appspot.gserviceaccount.com"

# Grant Service Account User role
gcloud iam service-accounts add-iam-policy-binding \
  ${APP_ENGINE_SA} \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/iam.serviceAccountUser" \
  --project=${PROJECT_ID}
```

---

## 🔍 Verify Permissions

After granting the role, verify:

1. **Go to:** Service Accounts → App Engine default service account
2. **Click** "Permissions" tab
3. **Verify:** `github-actions-deployer@***.iam.gserviceaccount.com` has:
   - ✅ **Service Account User** role

---

## 🚀 After Fixing Permissions

1. **Wait:** 1-2 minutes for permissions to propagate

2. **Retry Deployment:**
   - Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
   - Click "Deploy Backend to Google Cloud"
   - Click "Run workflow"
   - Select `main` branch
   - Click "Run workflow"

---

## 📋 Quick Steps Summary

1. ✅ Go to: Service Accounts
2. ✅ Find: App Engine default service account (`***@appspot.gserviceaccount.com`)
3. ✅ Click: "Permissions" tab
4. ✅ Click: "Grant Access"
5. ✅ Add: Your GitHub Actions service account email
6. ✅ Role: **Service Account User**
7. ✅ Save
8. ✅ Wait 1-2 minutes
9. ✅ Retry deployment

---

## 🎯 What This Fixes

**Before:** Service account can't impersonate App Engine service account
**After:** Service account can deploy to App Engine ✅

---

**Grant the Service Account User role and retry deployment!** 🚀
