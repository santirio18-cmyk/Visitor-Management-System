# 🚀 Google Cloud - Simple Steps (Like Petty Cash)

## You Already Started! Just Finish It

---

## In Cloud Shell (Where You Are Now):

### Step 1: Pull Latest Code
```bash
cd Visitor-Management-System/server
git pull
```

### Step 2: Deploy
```bash
gcloud app deploy
```

Type `Y` when asked.

Wait 3-5 minutes - Done! ✅

---

## Your Backend URL:

**https://carbon-theorem-474515-b2.et.r.appspot.com**

---

## After Deployment:

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

**That's it! Same as petty cash system!** 🎉

