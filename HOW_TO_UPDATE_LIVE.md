# 🔄 How to Update Live Site - Simple Steps

## When You Make Changes (Like Color, Text, etc.)

---

## Step 1: Make Your Changes
Edit any files:
- `client/src/components/` - Change colors, text, styling
- `client/src/App.css` - Global styles
- Any other files

---

## Step 2: Deploy to Live (One Command!)

```bash
cd client
npm run deploy
```

**That's it!** 🎉

---

## What Happens:
1. Builds your React app
2. Deploys to GitHub Pages
3. Your changes are live in 1-2 minutes!

---

## Step 3: Check Your Live Site

1. Visit: https://santirio18-cmyk.github.io/Visitor-Management-System/
2. Wait 1-2 minutes
3. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. Your changes should be visible!

---

## Example: Change a Color

1. Edit `client/src/components/Public/PublicForm.css`
2. Change a color value
3. Save the file
4. Run: `cd client && npm run deploy`
5. Wait 1-2 minutes
6. Check live site - color changed! ✅

---

## Quick Reference

| What to Update | Command |
|---------------|---------|
| **Frontend (colors, text, styles)** | `cd client && npm run deploy` |
| **Backend (server code)** | `cd server && gcloud app deploy` |

---

## Pro Tip

Keep this command handy:
```bash
cd client && npm run deploy
```

Just run this after making any frontend changes!

---

**That's all! Simple one command to update live site!** 🚀

