# ⚠️ Token Needs Workflow Scope - Quick Fix

## Problem
Your token is missing the `workflow` scope, which is required to push workflow file changes.

## Solution: Update Your Token

### Step 1: Go to Token Settings
**URL:** https://github.com/settings/tokens

### Step 2: Find Your Token
- Look for token starting with: `ghp_3sBZk6...`
- Or search for: "Vendor Management System"

### Step 3: Update Scopes
1. Click **"Edit"** or **"Regenerate"** (if edit not available)
2. Make sure these scopes are checked:
   - ✅ **`repo`** (Full control)
   - ✅ **`workflow`** (Update GitHub Action workflows) ← **THIS ONE IS MISSING!**
3. Click **"Update token"** or **"Regenerate token"**

### Step 4: Copy New Token
- If regenerated, copy the new token
- It will be different from the old one

### Step 5: Update Git Remote
```bash
git remote set-url origin https://NEW_TOKEN@github.com/santirio18-cmyk/Visitor-Management-System.git
```

### Step 6: Push Again
```bash
git push origin main
```

---

## Alternative: Create New Token

If you can't edit the existing token:

1. **Create new token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Name: `Vendor Management System - Workflow`
   - Scopes: ✅ `repo` + ✅ `workflow`
   - Generate

2. **Update remote:**
   ```bash
   git remote set-url origin https://NEW_TOKEN@github.com/santirio18-cmyk/Visitor-Management-System.git
   ```

3. **Push:**
   ```bash
   git push origin main
   ```

---

## Quick Check: Does Your Token Have Workflow Scope?

If you're not sure, try this:
- Go to: https://github.com/settings/tokens
- Find your token
- Check if `workflow` scope is listed

If not, you need to regenerate with `workflow` scope!

