# ✅ Grant Permission on App Engine Service Account

## 🔍 What I See

You're currently viewing the **"Default compute service account"** permissions.

But you need to grant permission on the **"App Engine default service account"** instead!

---

## ✅ Correct Steps

### Step 1: Go to App Engine Default Service Account

1. **Click on:** `carbon-theorem-474515-b2@appspot.gserviceaccount.com` in the list
   - It's shown as: "App Engine default service account"
   - Or go directly to Service Accounts list

2. **Click** on the App Engine default service account

### Step 2: Grant Service Account User Role

1. **Click** "Permissions" tab (or "Principals with access" tab)

2. **Click** "+ Grant access" button

3. **In "New principals" field:**
   - Enter: `github-actions-deployer@carbon-theorem-474515-b2.iam.gserviceaccount.com`

4. **In "Select a role" dropdown:**
   - Search: `Service Account User`
   - Select: **Service Account User** (`roles/iam.serviceAccountUser`)

5. **Click** "Save"

### Step 3: Verify

After saving, you should see in the permissions list:
- **Principal:** `github-actions-deployer@carbon-theorem-474515-b2.iam.gserviceaccount.com`
- **Role:** `Service Account User`

---

## 🎯 Key Difference

- ❌ **Wrong:** Granting on "Default compute service account"
- ✅ **Correct:** Granting on "App Engine default service account" (`@appspot.gserviceaccount.com`)

---

## 📋 Quick Steps

1. ✅ Go back to Service Accounts list
2. ✅ Click on: `carbon-theorem-474515-b2@appspot.gserviceaccount.com` (App Engine default)
3. ✅ Click "Permissions" tab
4. ✅ Click "+ Grant access"
5. ✅ Add: `github-actions-deployer@carbon-theorem-474515-b2.iam.gserviceaccount.com`
6. ✅ Role: Service Account User
7. ✅ Save
8. ✅ Wait 2-3 minutes
9. ✅ Retry deployment

---

**Click on the App Engine default service account and grant the permission there!** 🎯
