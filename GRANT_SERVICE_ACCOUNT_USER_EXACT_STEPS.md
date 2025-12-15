# 🔧 Grant Service Account User Role - Exact Steps

## ❌ Still Getting Permission Error

The error persists: "You do not have permission to act as '***@appspot.gserviceaccount.com'"

This means the role wasn't granted correctly. Let's do it step-by-step.

---

## ✅ Exact Steps to Fix

### Step 1: Find App Engine Default Service Account

1. **Go to:** Google Cloud Console → IAM & Admin → Service Accounts
   - Direct: https://console.cloud.google.com/iam-admin/serviceaccounts?project=carbon-theorem-474515-b2

2. **Look for:** Service account ending with `@appspot.gserviceaccount.com`
   - Format: `[PROJECT_NUMBER]@appspot.gserviceaccount.com`
   - Example: `544067807813@appspot.gserviceaccount.com`

3. **Click** on this service account

### Step 2: Grant Service Account User Role

1. **Click** "Permissions" tab (at the top)

2. **Click** "Grant Access" button

3. **In "New principals" field:**
   - Enter: `github-actions-deployer@carbon-theorem-474515-b2.iam.gserviceaccount.com`
   - (Replace with your exact GitHub Actions service account email)

4. **In "Select a role" dropdown:**
   - Type: `Service Account User`
   - Select: **Service Account User** (`roles/iam.serviceAccountUser`)

5. **Click** "Save"

### Step 3: Verify

After saving, you should see:
- In the Permissions list:
  - Principal: `github-actions-deployer@carbon-theorem-474515-b2.iam.gserviceaccount.com`
  - Role: `Service Account User`

---

## 🔍 Alternative: Grant at Project Level

If the above doesn't work, try granting at project level:

1. **Go to:** Google Cloud Console → IAM & Admin → IAM
   - Direct: https://console.cloud.google.com/iam-admin/iam?project=carbon-theorem-474515-b2

2. **Find:** `github-actions-deployer@carbon-theorem-474515-b2.iam.gserviceaccount.com`

3. **Click** the pencil icon (Edit)

4. **Add role:** `Service Account User`

5. **Save**

---

## 🆘 If Still Not Working

### Check Service Account Email

The error shows your service account is:
`github-actions-deployer@***.iam.gserviceaccount.com`

**Verify the exact email:**
1. Go to: Service Accounts
2. Find your GitHub Actions service account
3. Copy the exact email
4. Use that exact email when granting permissions

### Wait for Propagation

After granting:
- **Wait 2-3 minutes** for permissions to propagate
- Then retry deployment

---

## 📋 Quick Checklist

- [ ] Found App Engine default service account (`@appspot.gserviceaccount.com`)
- [ ] Clicked "Permissions" tab
- [ ] Clicked "Grant Access"
- [ ] Added GitHub Actions service account email
- [ ] Selected "Service Account User" role
- [ ] Clicked "Save"
- [ ] Waited 2-3 minutes
- [ ] Verified permission appears in list

---

## 🚀 After Fixing

1. **Wait:** 2-3 minutes for permissions to propagate

2. **Retry Deployment:**
   - Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
   - Click "Deploy Backend to Google Cloud"
   - Click "Run workflow"
   - Select `main` branch
   - Click "Run workflow"

---

**Follow these exact steps and wait 2-3 minutes before retrying!** 🔧
