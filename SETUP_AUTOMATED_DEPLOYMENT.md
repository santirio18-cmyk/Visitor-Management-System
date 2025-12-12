# 🚀 Setup Automated Backend Deployment

## What This Does

When you push changes to the `server/` folder, GitHub Actions will **automatically deploy** to Google Cloud App Engine - no manual steps needed!

## Setup Steps

### Step 1: Create Service Account in Google Cloud

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Select your project: `carbon-theorem-474515-b2`
3. Click **"Create Service Account"**
4. Name: `github-actions-deployer`
5. Click **"Create and Continue"**
6. Role: **"App Engine Admin"** and **"Cloud Build Service Account"**
7. Click **"Continue"** → **"Done"**

### Step 2: Create Key for Service Account

1. Click on the service account you just created
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Select **"JSON"**
5. Click **"Create"** - this downloads a JSON file
6. **Save this file** - you'll need it in Step 3

### Step 3: Add Secrets to GitHub

1. Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/settings/secrets/actions
2. Click **"New repository secret"**

**Add these 2 secrets:**

**Secret 1:**
- **Name**: `GCP_SA_KEY`
- **Value**: Paste the **entire contents** of the JSON file you downloaded
- Click **"Add secret"**

**Secret 2:**
- **Name**: `GCP_PROJECT_ID`
- **Value**: `carbon-theorem-474515-b2`
- Click **"Add secret"**

### Step 4: Test It!

1. Make a small change to any file in `server/` folder
2. Commit and push:
   ```bash
   git add server/
   git commit -m "Test automated deployment"
   git push origin main
   ```
3. Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
4. You should see a workflow running!
5. Wait 2-3 minutes for deployment to complete

---

## How It Works

- **Push to `main` branch** → GitHub Actions triggers
- **Checks if `server/` files changed** → Only deploys if backend changed
- **Authenticates to Google Cloud** → Uses service account
- **Deploys to App Engine** → Automatic!

---

## Benefits

✅ **No manual steps** - Just push code
✅ **Automatic deployment** - Happens on every push
✅ **Only deploys when needed** - Only if `server/` files change
✅ **Same as your petty cash app** - Automated workflow!

---

## Troubleshooting

**Workflow fails?**
- Check: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
- Click on the failed workflow to see error details
- Make sure secrets are set correctly

**Not deploying?**
- Make sure you're pushing to `main` branch
- Make sure files in `server/` folder changed
- Check workflow is enabled in repository settings

---

That's it! Once set up, you'll never need to manually deploy again! 🎉


