# 🔧 Fix Bucket Permission Error

## The Error:
"service account does not have access to the bucket"

## Quick Fix - Enable Cloud Build API

In Cloud Shell, run:

```bash
gcloud services enable cloudbuild.googleapis.com
```

Wait 30 seconds, then try again:

```bash
gcloud app deploy
```

---

## If Still Not Working:

### Option 1: Enable APIs via Console
1. Go to: https://console.cloud.google.com/apis/library
2. Search for "Cloud Build API"
3. Click "Enable"
4. Wait 1 minute
5. Try `gcloud app deploy` again

### Option 2: Check App Engine Status
1. Go to: https://console.cloud.google.com/appengine
2. Make sure App Engine is fully initialized
3. If you see any warnings, fix them first

---

## After Fixing:

Run again:
```bash
gcloud app deploy
```

Type `Y` when asked.

---

**Try the Cloud Build API enable command first!** 🚀

