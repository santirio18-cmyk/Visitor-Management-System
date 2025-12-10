# 🔄 How to Update Live Server

## Quick Update Process

Whenever you make changes to your code, follow these steps to update the live server:

---

## Method 1: Using the Deploy Script (Easiest!)

### Step 1: Make Your Changes
Edit any files in:
- `client/src/` (React components)
- `client/public/` (static files)
- `server/` (backend - deploy separately)

### Step 2: Run the Deploy Script
```bash
./deploy-to-github-pages.sh
```

That's it! The script will:
1. ✅ Build your React app
2. ✅ Copy files to `docs/` folder
3. ✅ Commit and push to GitHub
4. ✅ GitHub Pages auto-deploys (1-2 minutes)

### Step 3: Wait and Refresh
1. Wait 1-2 minutes for GitHub Pages to update
2. Visit: https://santirio18-cmyk.github.io/Visitor-Management-System/
3. Do a **hard refresh** (Ctrl+Shift+R or Cmd+Shift+R) to clear cache

---

## Method 2: Manual Update

### Step 1: Make Your Changes
Edit your code files.

### Step 2: Build the App
```bash
cd client
npm run build
```

### Step 3: Copy to Docs Folder
```bash
cd ..
rm -rf docs/*
cp -r client/build/* docs/
touch docs/.nojekyll
```

### Step 4: Commit and Push
```bash
git add docs/
git commit -m "Update live site"
git push origin main
```

### Step 5: Wait and Check
- Wait 1-2 minutes
- Visit your live URL
- Hard refresh to see changes

---

## Method 3: Automatic Deployment (GitHub Actions)

For automatic deployment on every push, we can set up GitHub Actions. But for now, the script method is easiest.

---

## 🔍 How to Verify Your Changes Are Live

### Check 1: GitHub Actions
1. Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
2. Look for latest workflow run
3. Should show green checkmark ✅

### Check 2: GitHub Pages Settings
1. Go to: Settings → Pages
2. Verify source is `/docs` folder
3. Should show "Your site is live at..."

### Check 3: Browser DevTools
1. Open your live site
2. Press F12 (DevTools)
3. Go to Network tab
4. Hard refresh (Ctrl+Shift+R)
5. Check if files load with 200 status (not 404)

---

## 📝 Common Update Scenarios

### Scenario 1: Update Frontend Code
```bash
# Edit files in client/src/
# Then run:
./deploy-to-github-pages.sh
```

### Scenario 2: Update Backend Code
```bash
# Edit files in server/
# Then deploy to Google Cloud:
cd server
gcloud app deploy
```

### Scenario 3: Update Both Frontend and Backend
```bash
# 1. Deploy frontend
./deploy-to-github-pages.sh

# 2. Deploy backend (separate terminal)
cd server
gcloud app deploy
```

### Scenario 4: Update API URL in Frontend
```bash
# 1. Edit client/src/config.js
# 2. Update API_BASE_URL to your backend URL
# 3. Deploy frontend
./deploy-to-github-pages.sh
```

---

## ⚠️ Important Notes

1. **Always Build Before Deploying**
   - Don't push `client/src/` directly
   - Always run `npm run build` first
   - Only push `docs/` folder contents

2. **Cache Issues**
   - Users may see old version due to browser cache
   - Hard refresh (Ctrl+Shift+R) clears cache
   - Or wait 5-10 minutes for cache to expire

3. **GitHub Pages Delay**
   - Changes take 1-2 minutes to appear
   - Check GitHub Actions to see deployment status

4. **Backend Updates**
   - Frontend and backend deploy separately
   - Update backend URL in `config.js` if backend URL changes

---

## 🚀 Quick Reference

```bash
# Update frontend (most common)
./deploy-to-github-pages.sh

# Update backend
cd server && gcloud app deploy

# Check deployment status
# Visit: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
```

---

## ✅ Deployment Checklist

Before deploying, make sure:
- [ ] Code changes are saved
- [ ] No syntax errors
- [ ] `npm run build` completes successfully
- [ ] `docs/` folder has latest build files
- [ ] Git is configured correctly
- [ ] You have push access to repository

After deploying:
- [ ] Wait 1-2 minutes
- [ ] Check GitHub Actions (green checkmark)
- [ ] Visit live URL
- [ ] Hard refresh to see changes
- [ ] Test the app functionality

---

## 🆘 Troubleshooting

**Changes not showing?**
1. Wait 2-3 minutes (GitHub Pages delay)
2. Hard refresh browser (Ctrl+Shift+R)
3. Check GitHub Actions for errors
4. Verify `docs/` folder has latest files

**Build fails?**
1. Check for syntax errors in code
2. Run `npm install` in `client/` folder
3. Check console for error messages

**404 errors?**
1. Clear browser cache
2. Check if files exist in `docs/static/`
3. Verify GitHub Pages source is `/docs`

---

That's it! Your workflow is now automated! 🎉

