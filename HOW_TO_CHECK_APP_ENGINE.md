# 🔍 How to Check if App Engine is Enabled

## Quick Guide: Verify App Engine Status

---

## ✅ Method 1: Check via Google Cloud Console (Easiest)

### Step 1: Go to App Engine Dashboard
**Direct URL:** https://console.cloud.google.com/appengine

Or navigate:
1. Go to: https://console.cloud.google.com/
2. Make sure correct project is selected (top bar)
3. Click **☰ Menu** (hamburger icon, top left)
4. Scroll down to **Serverless** section
5. Click **App Engine**

### Step 2: Check Status

**If App Engine is ENABLED:**
- ✅ You'll see the App Engine dashboard
- ✅ Shows: "Application: [your-app-name]"
- ✅ Shows: "Location: [region]" (e.g., us-central)
- ✅ Shows: "Created: [date]"
- ✅ You can see: Services, Versions, Instances tabs

**If App Engine is NOT ENABLED:**
- ❌ You'll see: "App Engine application not found"
- ❌ Button: **"Create Application"**
- ❌ Message: "Get started by creating an App Engine application"

---

## ✅ Method 2: Check via gcloud CLI

### Step 1: Install gcloud CLI (if not installed)
```bash
# macOS
brew install google-cloud-sdk

# Or download from:
# https://cloud.google.com/sdk/docs/install
```

### Step 2: Authenticate
```bash
gcloud auth login
```

### Step 3: Set Project
```bash
gcloud config set project YOUR_PROJECT_ID
# Replace YOUR_PROJECT_ID with: carbon-theorem-474515-b2
```

### Step 4: Check App Engine Status
```bash
gcloud app describe
```

**If Enabled:**
```
application: your-app-name
locationId: us-central
name: projects/YOUR_PROJECT_ID/apps/YOUR_APP_ID
```

**If Not Enabled:**
```
ERROR: (gcloud.app.describe) App Engine application not found.
```

---

## ✅ Method 3: Check via API/Web

### Using Browser Console

1. Go to: https://console.cloud.google.com/appengine
2. Open browser Developer Tools (F12)
3. Check Network tab
4. Look for API calls to `appengine.googleapis.com`
5. Check response - if 404, App Engine not enabled

---

## 🚀 How to Enable App Engine (If Not Enabled)

### Step 1: Go to App Engine
**URL:** https://console.cloud.google.com/appengine

### Step 2: Click "Create Application"

### Step 3: Select Region
Choose a region:
- **us-central** (Iowa, USA) - Recommended for most
- **us-east** (South Carolina, USA)
- **europe-west** (Belgium)
- **asia-east** (Taiwan)

**Note:** Once selected, region cannot be changed!

### Step 4: Click "Create"

### Step 5: Wait for Initialization
- Takes 1-2 minutes
- You'll see: "Creating your App Engine application..."
- When done: "Your App Engine application has been created!"

---

## 📋 Quick Checklist

- [ ] Go to: https://console.cloud.google.com/appengine
- [ ] Check if dashboard loads (enabled) or shows "Create Application" (not enabled)
- [ ] If not enabled, click "Create Application"
- [ ] Select region (e.g., us-central)
- [ ] Wait for initialization
- [ ] Verify dashboard shows your app

---

## 🔍 What to Look For

### ✅ App Engine ENABLED:
```
App Engine Dashboard shows:
- Application name
- Region/Location
- Services, Versions, Instances tabs visible
- No "Create Application" button
```

### ❌ App Engine NOT ENABLED:
```
Shows:
- "App Engine application not found"
- "Create Application" button
- "Get started by creating an App Engine application"
```

---

## 🆘 Troubleshooting

### Issue: "Project not found"
**Solution:** 
- Check you're in the correct project
- Verify project ID: `carbon-theorem-474515-b2`
- Switch project in top bar

### Issue: "Permission denied"
**Solution:**
- You need **App Engine Admin** role
- Contact project owner to grant access

### Issue: "Billing not enabled"
**Solution:**
- App Engine requires billing account
- Go to: Billing → Link billing account
- Free tier available (with limits)

---

## 📝 Your Project Details

**Project ID:** `carbon-theorem-474515-b2`

**Check URL:** https://console.cloud.google.com/appengine?project=carbon-theorem-474515-b2

---

## ✅ After Enabling App Engine

Once enabled:
1. ✅ App Engine dashboard will load
2. ✅ You can deploy applications
3. ✅ GitHub Actions deployment will work
4. ✅ Your backend will deploy successfully

---

**Quick Check:** Visit https://console.cloud.google.com/appengine and see if dashboard loads! 🚀
