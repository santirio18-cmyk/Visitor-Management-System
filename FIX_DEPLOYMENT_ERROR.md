# 🔧 Fix Deployment Error - Node.js Runtime

## Error Fixed!

The error was: **"Runtime nodejs18 is end of support"**

## ✅ Solution Applied

I've updated `server/app.yaml` to use `nodejs20` instead of `nodejs18`.

---

## Now Deploy Again

In Cloud Shell, run:

```bash
cd Visitor-Management-System/server
gcloud app deploy
```

Type `Y` when asked, and it should work now! ✅

---

## Your Backend URL Will Be:

**https://carbon-theorem-474515-b2.et.r.appspot.com**

---

## After Successful Deployment:

1. **Set Environment Variable:**
   - Go to: https://console.cloud.google.com/appengine/versions
   - Click your service → Edit
   - Add: `JWT_SECRET` = `your-secret-key-12345`

2. **Update Frontend:**
   - Edit `client/src/config.js`:
     ```javascript
     export const API_BASE_URL = 'https://carbon-theorem-474515-b2.et.r.appspot.com';
     ```
   - Deploy: `cd client && npm run deploy`

---

**Try deploying again - it should work now!** 🚀

