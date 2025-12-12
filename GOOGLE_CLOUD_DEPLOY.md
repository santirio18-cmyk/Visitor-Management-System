# 🚀 Deploy Backend to Google Cloud Platform

## Quick Deploy Guide for Google Cloud Console

---

## Prerequisites

1. **Google Cloud Account**: Sign up at https://cloud.google.com (Free tier available - $300 credit)
2. **Google Cloud SDK**: Install from https://cloud.google.com/sdk/docs/install

---

## Step 1: Install Google Cloud SDK

### For Mac:
```bash
# Download and install
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Initialize
gcloud init
```

### For Windows:
1. Download installer from: https://cloud.google.com/sdk/docs/install-sdk#windows
2. Run installer
3. Open Command Prompt and run: `gcloud init`

---

## Step 2: Create Google Cloud Project

### Option A: Via Google Cloud Console (Web UI)

1. Go to: https://console.cloud.google.com
2. Click **"Select a project"** → **"New Project"**
3. Enter:
   - **Project name**: `visitor-management-system`
   - **Organization**: (leave default)
   - **Location**: (leave default)
4. Click **"Create"**
5. Wait for project creation (30 seconds)

### Option B: Via Command Line

```bash
gcloud projects create visitor-management-system --name="Visitor Management System"
gcloud config set project visitor-management-system
```

---

## Step 3: Enable Required APIs

### Via Console:
1. Go to: https://console.cloud.google.com/apis/library
2. Search and enable:
   - **Cloud Build API**
   - **App Engine Admin API**
   - **Cloud SQL Admin API** (if using Cloud SQL later)

### Via Command Line:
```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable appengine.googleapis.com
```

---

## Step 4: Deploy to App Engine

### Option A: Deploy via Console (Easiest!)

1. **Go to App Engine**:
   - Visit: https://console.cloud.google.com/appengine
   - Select your project: `visitor-management-system`

2. **Create Application**:
   - Click **"Create Application"**
   - Select **Region**: Choose closest (e.g., `us-central`, `asia-south1`)
   - Click **"Create"**

3. **Deploy via Cloud Shell**:
   - Click the **Cloud Shell icon** (top right, looks like `>_`)
   - Run these commands:

```bash
# Clone your repository
git clone https://github.com/santirio18-cmyk/Visitor-Management-System.git
cd Visitor-Management-System

# Navigate to server directory
cd server

# Deploy
gcloud app deploy
```

4. **Follow prompts**:
   - When asked "Do you want to continue? (Y/n)": Type `Y`
   - Wait 3-5 minutes for deployment

### Option B: Deploy from Local Machine

```bash
# Navigate to server directory
cd server

# Deploy
gcloud app deploy

# Follow prompts
```

---

## Step 5: Set Environment Variables

1. Go to: https://console.cloud.google.com/appengine/versions
2. Click on your service
3. Click **"Edit"**
4. Scroll to **"Environment Variables"**
5. Add:
   - `JWT_SECRET`: `your-secret-key-12345` (any random string)
   - `NODE_ENV`: `production`
   - `PORT`: `8080` (App Engine uses this automatically)

6. Click **"Save"**

---

## Step 6: Get Your Backend URL

After deployment, your backend will be at:
```
https://visitor-management-system.uc.r.appspot.com
```
(Replace `visitor-management-system` with your project ID)

Or check in:
- Go to: https://console.cloud.google.com/appengine
- Your URL will be displayed at the top

---

## Step 7: Update Frontend Config

Update `client/src/config.js`:

```javascript
export const API_BASE_URL = 'https://visitor-management-system.uc.r.appspot.com';
```

Then rebuild and redeploy frontend:
```bash
./deploy-to-github-pages.sh
```

---

## ✅ Your Live URLs

- **Frontend**: `https://santirio18-cmyk.github.io/Visitor-Management-System/`
- **Backend**: `https://visitor-management-system.uc.r.appspot.com`

---

## 📝 Important Notes

1. **Free Tier**:
   - App Engine F1 instance: Free tier available
   - 28 hours/day free
   - After free tier: ~$0.05/hour

2. **Database**:
   - SQLite file is stored in instance
   - For production, consider Cloud SQL (paid)

3. **Scaling**:
   - Set to `min_instances: 0` to save costs
   - First request may be slow (cold start)

---

## 🆘 Troubleshooting

**Deployment failed?**
- Check Cloud Build logs: https://console.cloud.google.com/cloud-build/builds
- Verify `app.yaml` is in `server/` directory
- Check Node.js version matches (nodejs18)

**Backend not responding?**
- Check App Engine logs: https://console.cloud.google.com/logs
- Verify environment variables are set
- Check if port is 8080 (App Engine requirement)

**Need to update code?**
```bash
cd server
gcloud app deploy
```

---

## 🎯 Quick Commands Reference

```bash
# Deploy
cd server
gcloud app deploy

# View logs
gcloud app logs tail

# Open in browser
gcloud app browse

# List versions
gcloud app versions list
```

---

## 💰 Cost Estimate

- **Free Tier**: 28 hours/day of F1 instance
- **After Free Tier**: ~$0.05/hour when running
- **Estimated Monthly**: $0-15 (depending on usage)

---

That's it! Your backend is now on Google Cloud! 🎉


