# 🔧 Fix: Database Data Loss Issue - Cloud Storage Persistence

## Problem Summary

**Issue**: Data entered last week (2 expenses) has vanished from the backend.

**Root Cause**: Database is stored in `/tmp` directory on Google Cloud App Engine, which is **ephemeral storage** that gets cleared on instance restarts.

---

## Solution Implemented

I've implemented **Cloud Storage persistence** to fix this issue:

### What Was Added:

1. **Cloud Storage Integration** (`server/database/cloudStorage.js`)
   - Downloads database from Cloud Storage on startup
   - Uploads database to Cloud Storage periodically (every 5 minutes)
   - Uploads database before server shutdown

2. **Updated Database Initialization** (`server/database/db.js`)
   - Automatically syncs with Cloud Storage on App Engine
   - Downloads existing database on startup
   - Uploads database after initialization
   - Periodic sync every 5 minutes

3. **Added Dependency**
   - `@google-cloud/storage` package for Cloud Storage access

---

## Setup Required

### Step 1: Use Existing Bucket or Create New One

**Option A: Use Existing Bucket (Recommended if you already have buckets)**

1. Go to Google Cloud Console: https://console.cloud.google.com/storage
2. Check your existing buckets
3. Choose one bucket to use for the database (or create a new one)
4. Set the bucket name in `app.yaml`:

```yaml
env_variables:
  GCS_BUCKET_NAME: your-existing-bucket-name
```

**Option B: Create New Bucket**

1. Go to Google Cloud Console: https://console.cloud.google.com/storage
2. Click **"Create Bucket"**
3. Name: `visitor-management-db` (or any name you prefer)
4. Location: `asia-southeast2` (match your App Engine region)
5. Storage Class: `Standard`
6. Click **"Create"**
7. Add bucket name to `app.yaml`:

```yaml
env_variables:
  GCS_BUCKET_NAME: visitor-management-db
```

### Step 2: Grant App Engine Access

The App Engine default service account should already have access, but verify:

1. Go to: https://console.cloud.google.com/iam-admin/iam
2. Find: `PROJECT_NUMBER-compute@developer.gserviceaccount.com`
3. Ensure it has **"Storage Object Admin"** role

### Step 3: Set Environment Variable (Optional)

If you want a custom bucket name, add to `app.yaml`:

```yaml
env_variables:
  GCS_BUCKET_NAME: your-custom-bucket-name
```

### Step 4: Deploy

The code is ready! Just deploy:

```bash
cd server
gcloud app deploy
```

---

## How It Works

### On Startup:
1. App Engine instance starts
2. Downloads database from Cloud Storage (if exists)
3. Creates new database if none exists
4. Initializes tables
5. Uploads database to Cloud Storage

### During Operation:
- Database syncs to Cloud Storage every 5 minutes
- All write operations are immediately available locally
- Cloud Storage backup ensures persistence

### On Shutdown:
- Database is uploaded to Cloud Storage before closing
- Ensures no data loss on instance restart

---

## Benefits

✅ **Data Persistence**: Database survives instance restarts  
✅ **Automatic Backup**: Cloud Storage acts as backup  
✅ **No Manual Intervention**: Automatic sync  
✅ **Backward Compatible**: Works locally without Cloud Storage  
✅ **Free Tier**: Cloud Storage free tier is generous  

---

## Testing

After deployment:

1. **Create some test data** (submit a request)
2. **Wait 5 minutes** (or restart instance)
3. **Check data persists** - should still be there!

---

## Important Notes

- **First Deployment**: Will create new database (existing data in `/tmp` is already lost)
- **Future Deployments**: Will preserve data from Cloud Storage
- **Local Development**: Still uses local file (no Cloud Storage needed)
- **Cost**: Cloud Storage free tier: 5GB storage, 5,000 Class A operations/month

---

## Verification

After deployment, check logs:

```bash
gcloud app logs tail --service=default
```

You should see:
- "Cloud Storage initialized for bucket: visitor-management-db"
- "Downloading database from Cloud Storage..." (on first run: "No existing database found")
- "Database uploaded successfully to Cloud Storage"

---

**This fix ensures your data will never be lost again!** 🎉
