# 🎯 Simple GitHub Actions Setup (5 Steps)

## Quick Setup Guide

---

## ✅ Step 1: Create Service Account (Google Cloud)

**URL**: https://console.cloud.google.com/iam-admin/serviceaccounts

**IMPORTANT**: Make sure you're in project `carbon-theorem-474515-b2` (check dropdown at top)

1. Click **"Create Service Account"** (NOT "Create Project" - use existing project!)
2. Name: `github-actions-deployer`
3. Click **"Create and Continue"**
4. Add 2 roles:
   - `App Engine Admin`
   - `Cloud Build Service Account`
5. Click **"Done"**

**Note**: You're creating a SERVICE ACCOUNT inside your existing project, not a new project!

---

## ✅ Step 2: Download Key

1. Click on the service account you just created
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Select **"JSON"**
5. Click **"Create"** → File downloads
6. **Save this file!**

---

## ✅ Step 3: Add Secrets to GitHub

**URL**: https://github.com/santirio18-cmyk/Visitor-Management-System/settings/secrets/actions

### Secret 1:
- **Name**: `GCP_SA_KEY`
- **Value**: Paste **entire contents** of the JSON file
- Click **"Add secret"**

### Secret 2:
- **Name**: `GCP_PROJECT_ID`
- **Value**: `carbon-theorem-474515-b2`
- Click **"Add secret"**

---

## ✅ Step 4: Push Workflow File

The file is already created. Just push it:

```bash
cd "/Users/santhoshpremkumar/Vendor Management System"
git add .github/workflows/deploy-backend.yml
git commit -m "Add automated deployment"
git push origin main
```

---

## ✅ Step 5: Test It!

1. Make a small change to any file in `server/` folder
2. Commit and push:
   ```bash
   git add server/
   git commit -m "Test auto-deploy"
   git push origin main
   ```
3. Check: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
4. You should see a workflow running! ✅

---

## 🎉 Done!

Now every time you push backend changes, it deploys automatically!

**No more manual Cloud Shell steps needed!** 🚀

---

## 📝 What Gets Deployed Automatically?

✅ Any changes to files in `server/` folder
✅ Backend code updates
✅ Database changes
✅ Configuration updates

**Frontend changes** still need: `cd client && npm run deploy`

---

That's it! Simple 5-step setup! 🎯

