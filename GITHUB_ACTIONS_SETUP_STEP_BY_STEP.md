# 🚀 GitHub Actions Setup - Step by Step

## Complete Guide to Automate Backend Deployment

Follow these steps to set up automatic deployment - **just like your petty cash app!**

---

## Step 1: Create Service Account in Google Cloud (5 minutes)

### 1.1 Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Make sure you're in the correct project: `carbon-theorem-474515-b2`
   - If not, click the project dropdown at the top and select it

### 1.2 Create Service Account
1. Click **"Create Service Account"** (blue button at the top)
2. Fill in:
   - **Service account name**: `github-actions-deployer`
   - **Service account ID**: (auto-filled, leave as is)
   - **Description**: `Service account for GitHub Actions to deploy to App Engine`
3. Click **"Create and Continue"**

### 1.3 Assign Roles
1. In **"Grant this service account access to project"**:
   - Click **"Select a role"** dropdown
   - Search and select: **"App Engine Admin"**
   - Click **"Add Another Role"**
   - Search and select: **"Cloud Build Service Account"**
2. Click **"Continue"**

### 1.4 Grant Access (Optional)
- Leave empty or skip
- Click **"Done"**

✅ **Step 1 Complete!** You should see the service account in the list.

---

## Step 2: Create Key for Service Account (2 minutes)

### 2.1 Open Service Account
1. Click on the service account you just created: `github-actions-deployer`
2. You'll see details about the service account

### 2.2 Create Key
1. Click the **"Keys"** tab (at the top)
2. Click **"Add Key"** → **"Create new key"**
3. Select **"JSON"** (not P12)
4. Click **"Create"**
5. **A JSON file will download automatically** - **SAVE THIS FILE!**
   - It contains your credentials
   - You'll need it in Step 3

✅ **Step 2 Complete!** You have the JSON key file downloaded.

---

## Step 3: Add Secrets to GitHub (3 minutes)

### 3.1 Go to GitHub Repository Settings
1. Visit: https://github.com/santirio18-cmyk/Visitor-Management-System
2. Click **"Settings"** tab (top right of repository)
3. In the left sidebar, click **"Secrets and variables"** → **"Actions"**

### 3.2 Add First Secret: GCP_SA_KEY
1. Click **"New repository secret"** (green button)
2. Fill in:
   - **Name**: `GCP_SA_KEY` (exactly this, case-sensitive)
   - **Secret**: Open the JSON file you downloaded in Step 2
     - Copy **ALL the contents** (Ctrl+A, Ctrl+C or Cmd+A, Cmd+C)
     - Paste it into the Secret field
3. Click **"Add secret"**

### 3.3 Add Second Secret: GCP_PROJECT_ID
1. Click **"New repository secret"** again
2. Fill in:
   - **Name**: `GCP_PROJECT_ID` (exactly this, case-sensitive)
   - **Secret**: `carbon-theorem-474515-b2`
3. Click **"Add secret"**

✅ **Step 3 Complete!** You should see 2 secrets listed:
- `GCP_SA_KEY`
- `GCP_PROJECT_ID`

---

## Step 4: Push Workflow File to GitHub (1 minute)

The workflow file is already created, but we need to push it:

### 4.1 Check if File Exists
The file `.github/workflows/deploy-backend.yml` should already be in your repository.

### 4.2 If Not Pushed Yet
If you see an error when trying to push, do this:

```bash
# Make sure you're in the project directory
cd "/Users/santhoshpremkumar/Vendor Management System"

# Add the workflow file
git add .github/workflows/deploy-backend.yml

# Commit
git commit -m "Add automated backend deployment workflow"

# Push
git push origin main
```

✅ **Step 4 Complete!** The workflow file is now on GitHub.

---

## Step 5: Test the Automation (2 minutes)

### 5.1 Make a Small Change
1. Make any small change to a file in `server/` folder
   - For example: Add a comment to `server/index.js`
2. Commit and push:
   ```bash
   git add server/
   git commit -m "Test automated deployment"
   git push origin main
   ```

### 5.2 Check GitHub Actions
1. Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
2. You should see a workflow running!
3. Click on it to see the progress
4. Wait 2-3 minutes for deployment to complete

### 5.3 Verify Deployment
1. Check if deployment succeeded (green checkmark ✅)
2. Your backend should be updated automatically!

✅ **Step 5 Complete!** Automation is working!

---

## 🎉 You're Done!

Now whenever you:
1. **Push code to `main` branch**
2. **Change files in `server/` folder**

GitHub Actions will **automatically deploy** to Google Cloud - no manual steps needed!

---

## 📋 Quick Reference

### What Happens Automatically:
```
You push code
    ↓
GitHub Actions detects changes in server/ folder
    ↓
Authenticates to Google Cloud (using secrets)
    ↓
Deploys to App Engine
    ↓
Backend is live! ✅
```

### Manual Steps (Only if needed):
- If you change frontend → Still need to run `npm run deploy` in `client/` folder
- If you change backend → **Automatic!** Just push code

---

## 🆘 Troubleshooting

### Workflow Not Running?
- Check: Did you push to `main` branch?
- Check: Did files in `server/` folder change?
- Check: Is workflow file in `.github/workflows/` folder?

### Workflow Failing?
- Check: Are secrets set correctly? (Step 3)
- Check: Is service account created? (Step 1)
- Check: Does service account have correct roles? (Step 1.3)

### Need Help?
- Check workflow logs: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
- Click on failed workflow → See error details

---

## ✅ Checklist

- [ ] Service account created in Google Cloud
- [ ] Service account has "App Engine Admin" role
- [ ] Service account has "Cloud Build Service Account" role
- [ ] JSON key downloaded
- [ ] `GCP_SA_KEY` secret added to GitHub
- [ ] `GCP_PROJECT_ID` secret added to GitHub
- [ ] Workflow file pushed to GitHub
- [ ] Tested with a small change

---

**That's it! Your backend will now deploy automatically! 🚀**





