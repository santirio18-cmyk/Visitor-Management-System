# 📦 Cloud Storage Bucket Setup for Database Persistence

## Current Situation

You mentioned there are **2 buckets already** in your Google Cloud Storage. We need to configure the application to use one of them for database persistence.

---

## Quick Setup Steps

### Step 1: Check Your Existing Buckets

1. Go to: https://console.cloud.google.com/storage/browser
2. Note the names of your 2 existing buckets
3. Choose one to use for the database (or we can create a new one)

### Step 2: Configure Bucket Name

**Option A: Use Existing Bucket**

Update `server/app.yaml` to specify which bucket to use:

```yaml
env_variables:
  NODE_ENV: production
  PORT: 8080
  JWT_SECRET: visitor-management-secret-key-2024
  GCS_BUCKET_NAME: your-existing-bucket-name  # Add this line
```

**Option B: Let Code Auto-Detect**

The code will try to use: `{PROJECT_ID}-db` as bucket name automatically.

If your project ID is `carbon-theorem-474515-b2`, it will look for bucket: `carbon-theorem-474515-b2-db`

### Step 3: Verify Bucket Permissions

Make sure the App Engine service account has access:

1. Go to: https://console.cloud.google.com/storage/browser
2. Click on your chosen bucket
3. Go to **"Permissions"** tab
4. Ensure `PROJECT_NUMBER-compute@developer.gserviceaccount.com` has:
   - **Storage Object Admin** role (or at least **Storage Object Creator** and **Storage Object Viewer**)

### Step 4: Deploy

```bash
cd server
gcloud app deploy
```

---

## What Bucket Names Are You Using?

Please share:
1. **Bucket 1 name**: _______________
2. **Bucket 2 name**: _______________

Then I can update the code to use the correct one, or help you choose which one to use.

---

## Recommended Bucket Name

If you want to create a dedicated bucket for the database:

- **Name**: `visitor-management-db` or `{project-id}-db`
- **Location**: `asia-southeast2` (match your App Engine region)
- **Storage Class**: `Standard`
- **Access Control**: Uniform (or Fine-grained with proper permissions)

---

## How It Works

1. **On Startup**: Downloads `vendor_management.db` from Cloud Storage bucket
2. **During Operation**: Uploads database every 5 minutes
3. **On Shutdown**: Uploads database before closing

This ensures your data persists even when App Engine instances restart!

---

## Troubleshooting

**If bucket doesn't exist:**
- Code will try to create it automatically
- Or create it manually in Cloud Console

**If permission errors:**
- Grant **Storage Object Admin** to App Engine service account
- Check IAM permissions in Cloud Console

**If data still not persisting:**
- Check logs: `gcloud app logs tail --service=default`
- Look for Cloud Storage upload/download messages

---

**Please share your bucket names and I'll help configure it!** 🚀
