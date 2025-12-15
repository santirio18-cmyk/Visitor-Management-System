# 🚀 Deploy Backend NOW - Step by Step

## No Service Showing? That's Normal - You Need to Deploy First!

---

## Step 1: Open Cloud Shell

1. Go to: **https://console.cloud.google.com**
2. Make sure your project is selected (top bar)
3. Click the **Cloud Shell icon** (top right, looks like `>_`)
   - This opens a terminal in your browser
   - No installation needed!

---

## Step 2: Clone Your Repository

In the Cloud Shell terminal, type:

```bash
git clone https://github.com/santirio18-cmyk/Visitor-Management-System.git
```

Press Enter and wait for it to finish.

---

## Step 3: Go to Server Folder

```bash
cd Visitor-Management-System/server
```

---

## Step 4: Deploy!

```bash
gcloud app deploy
```

Press Enter.

---

## Step 5: Follow Prompts

1. It will ask: **"Do you want to continue? (Y/n)"**
   - Type: `Y`
   - Press Enter

2. It will ask: **"Please choose the region where you want your App Engine application located"**
   - Type: `1` (for us-central) or `2` (for asia-south1)
   - Press Enter

3. Wait 3-5 minutes for deployment
   - You'll see build logs
   - Don't close the terminal!

---

## Step 6: After Deployment

You'll see:
```
Deployed service [default] to [https://your-project-id.uc.r.appspot.com]
```

**Copy this URL!** This is your backend URL.

---

## Step 7: Set Environment Variable

1. Go to: **https://console.cloud.google.com/appengine/versions**
2. **NOW you'll see your service!** ✅
3. Click on the service
4. Click **"Edit"** (pencil icon)
5. Scroll to **"Environment Variables"**
6. Click **"Add Item"**
7. Add:
   - **Key**: `JWT_SECRET`
   - **Value**: `your-secret-key-12345`
8. Click **"Save"**

---

## Step 8: Update Frontend

1. Edit `client/src/config.js`:
   ```javascript
   export const API_BASE_URL = 'https://your-project-id.uc.r.appspot.com';
   ```
   (Replace with your actual backend URL from Step 6)

2. Deploy frontend:
   ```bash
   cd client
   npm run deploy
   ```

---

## ✅ That's It!

After Step 4 (deploy), your service will appear in the versions page!

---

## 🆘 Troubleshooting

**"gcloud: command not found"?**
- Make sure you're using Cloud Shell (browser terminal)
- Don't use your local terminal

**"Project not found"?**
- Make sure you selected the correct project in Google Cloud Console
- Check top bar shows your project name

**Deployment failed?**
- Check the error message
- Make sure `app.yaml` exists in `server/` folder
- Check Cloud Build logs: https://console.cloud.google.com/cloud-build/builds

---

**Start with Step 1 - Open Cloud Shell and deploy!** 🚀





