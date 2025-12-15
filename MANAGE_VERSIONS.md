# 📋 Managing App Engine Versions

## You Have 2 Versions - This is Normal!

Each time you deploy, Google Cloud creates a new version. The one with **100%** is the active one.

---

## Check Which Version is Active:

1. Go to: https://console.cloud.google.com/appengine/versions
2. Look for the version with **"100%"** in the Traffic column
3. That's your active version!

---

## If You Want to Delete Old Version:

1. Go to: https://console.cloud.google.com/appengine/versions
2. Click on the old version (the one without 100%)
3. Click **"Delete"** button
4. Confirm deletion

**Note:** You can keep both versions - it doesn't hurt anything!

---

## Check if Backend is Working:

### Test the Active Version:
Visit: https://carbon-theorem-474515-b2.et.r.appspot.com/api/health

Should show: `{"status":"OK","message":"Server is running"}`

---

## If Backend Still Not Working:

### Check Logs for Active Version:
In Cloud Shell:
```bash
gcloud app logs tail -s default
```

This shows errors from the active version.

---

## Quick Test:

1. Visit: https://carbon-theorem-474515-b2.et.r.appspot.com/
2. Should show API info (not "Service Unavailable")

---

**The version with 100% traffic is your active one - test that!** ✅





