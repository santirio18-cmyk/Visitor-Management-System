# 🚀 Simple Push to Update Live Server

## How to Update Live Server - Just Push!

---

## Step 1: Make Your Changes
Edit any files you want to update:
- `client/src/` - React components
- `client/public/` - Static files
- Any other files

---

## Step 2: Build the App
```bash
cd client
npm run build
cd ..
```

---

## Step 3: Copy Build to Docs
```bash
rm -rf docs/*
cp -r client/build/* docs/
```

---

## Step 4: Push to GitHub
```bash
git add .
git commit -m "Update live site"
git push origin main
```

---

## Step 5: Wait 1-2 Minutes
GitHub Pages will automatically update your live site!

---

## ✅ That's It!

Your changes will be live at:
**https://santirio18-cmyk.github.io/Visitor-Management-System/**

---

## Quick One-Liner (After Making Changes)

```bash
cd client && npm run build && cd .. && rm -rf docs/* && cp -r client/build/* docs/ && git add . && git commit -m "Update" && git push origin main
```

---

## Check Deployment Status

1. Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
2. Look for green checkmark ✅
3. Visit your live site
4. Hard refresh (Ctrl+Shift+R) to see changes

---

That's all! Simple push workflow! 🎉


