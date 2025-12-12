# 🚀 Deploy Backend to Google Cloud Console - Step by Step

## Quick Guide to Deploy Backend Using Google Cloud

---

## Step 1: Create Google Cloud Account

1. Go to: **https://console.cloud.google.com**
2. Click **"Get Started for Free"**
3. Sign up (Free tier includes $300 credit)
4. Complete account setup

---

## Step 2: Create New Project

1. In Google Cloud Console, click **"Select a project"** (top bar)
2. Click **"New Project"**
3. Enter:
   - **Project name**: `visitor-management-system`
   - **Location**: (leave default)
4. Click **"Create"**
5. Wait 30 seconds for project creation

---

## Step 3: Enable App Engine

1. Go to: **https://console.cloud.google.com/appengine**
2. Select your project: `visitor-management-system`
3. Click **"Create Application"**
4. Choose **Region**: 
   - `us-central` (Iowa, USA) - Recommended
   - OR `asia-south1` (Mumbai, India) - Closer to you
5. Click **"Create"**
6. Wait 1-2 minutes

---

## Step 4: Install Google Cloud SDK (One Time)

### For Mac:
```bash
# Download and install
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Initialize
gcloud init
```

### Or Use Cloud Shell (Easier - No Installation!)

1. In Google Cloud Console, click the **Cloud Shell icon** (top right, looks like `>_`)
2. This opens a browser-based terminal - no installation needed!

---

## Step 5: Deploy Backend

### Option A: Using Cloud Shell (Easiest!)

1. Click **Cloud Shell icon** (`>_`) in Google Cloud Console
2. Run these commands:

```bash
# Clone your repository
git clone https://github.com/santirio18-cmyk/Visitor-Management-System.git
cd Visitor-Management-System/server

# Deploy
gcloud app deploy
```

3. When asked:
   - **"Do you want to continue? (Y/n)"**: Type `Y` and press Enter
   - Wait 3-5 minutes for deployment

### Option B: From Your Local Machine

```bash
# Navigate to server folder
cd "/Users/santhoshpremkumar/Vendor Management System/server"

# Deploy
gcloud app deploy
```

---

## Step 6: Set Environment Variables

1. Go to: **https://console.cloud.google.com/appengine/versions**
2. Select your project
3. Click on your service
4. Click **"Edit"** (pencil icon)
5. Scroll to **"Environment Variables"**
6. Click **"Add Item"** and add:
   - **Key**: `JWT_SECRET`
   - **Value**: `your-secret-key-12345` (any random string)
7. Click **"Save"**

---

## Step 7: Get Your Backend URL

After deployment, your backend will be at:
```
https://visitor-management-system.uc.r.appspot.com
```

(Replace `visitor-management-system` with your actual project ID)

**To find your exact URL:**
1. Go to: **https://console.cloud.google.com/appengine**
2. Your URL is displayed at the top

---

## Step 8: Update Frontend Config

1. Edit `client/src/config.js`:
   ```javascript
   export const API_BASE_URL = 'https://visitor-management-system.uc.r.appspot.com';
   ```
   (Replace with your actual backend URL)

2. Deploy frontend:
   ```bash
   cd client
   npm run deploy
   ```

---

## ✅ Test Your Backend

Visit: `https://your-backend-url.uc.r.appspot.com/api/health`

Should show:
```json
{"status":"OK","message":"Server is running"}
```

---

## 📝 Quick Commands Reference

```bash
# Deploy backend
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

## 💰 Cost

- **Free Tier**: 28 hours/day of F1 instance
- **After Free Tier**: ~$0.05/hour when running
- **Estimated Monthly**: $0-15 (depending on usage)

---

## 🆘 Troubleshooting

**Deployment failed?**
- Check Cloud Build logs: https://console.cloud.google.com/cloud-build/builds
- Verify `app.yaml` is in `server/` directory
- Check Node.js version (should be nodejs18)

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

## ✅ Checklist

- [ ] Google Cloud account created
- [ ] Project created
- [ ] App Engine enabled
- [ ] Backend deployed
- [ ] Environment variables set
- [ ] Backend URL copied
- [ ] Frontend config updated
- [ ] Frontend redeployed
- [ ] Tested form submission

---

**That's it! Your backend will be live on Google Cloud!** 🎉


