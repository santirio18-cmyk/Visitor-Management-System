# 🔑 GitHub Personal Access Token Setup Guide

## How to Create a Token with Workflow Permissions

### Step-by-Step Instructions:

---

## 1️⃣ Go to GitHub Token Settings

**URL:** https://github.com/settings/tokens

Or navigate:
- Click your profile picture (top right)
- Click **Settings**
- Scroll down to **Developer settings** (left sidebar)
- Click **Personal access tokens**
- Click **Tokens (classic)** or **Fine-grained tokens**

---

## 2️⃣ Create New Token

### Option A: Classic Token (Recommended)

1. Click **"Generate new token"** → **"Generate new token (classic)"**

2. **Note/Name:**
   ```
   Vendor Management System - Workflow Access
   ```
   (Or any descriptive name you prefer)

3. **Expiration:**
   - Choose: **90 days** (or your preference)
   - Or **No expiration** (less secure but convenient)

4. **Select Scopes** ✅ **IMPORTANT:**

   **Required Scopes:**
   - ✅ **`repo`** (Full control of private repositories)
     - This includes: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`
   - ✅ **`workflow`** (Update GitHub Action workflows)
     - **This is the key scope that was missing!**

   **Optional but Recommended:**
   - ✅ **`admin:repo_hook`** (if you need webhook access)
   - ✅ **`read:org`** (if repository is in an organization)

5. **Scroll down and click:** **"Generate token"**

6. **⚠️ IMPORTANT:** Copy the token immediately!
   - It will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - You won't be able to see it again!

---

## 3️⃣ Update Git Credentials

### Option A: Update Credential Helper (macOS)

```bash
# Remove old credentials
git credential-osxkeychain erase
host=github.com
protocol=https

# Or update directly
git config --global credential.helper osxkeychain
```

Then on next push, use:
- **Username:** Your GitHub username
- **Password:** The new token (not your GitHub password!)

### Option B: Use Token in URL

```bash
# Update remote URL to include token
git remote set-url origin https://YOUR_TOKEN@github.com/santirio18-cmyk/Visitor-Management-System.git
```

Replace `YOUR_TOKEN` with your actual token.

### Option C: Use Git Credential Manager

```bash
# Store credentials
git config --global credential.helper store

# On next push, enter:
# Username: your-github-username
# Password: your-token
```

---

## 📋 Quick Reference: Required Scopes

| Scope | Description | Required? |
|-------|-------------|-----------|
| `repo` | Full control of repositories | ✅ **YES** |
| `workflow` | Update GitHub Action workflows | ✅ **YES** |
| `admin:repo_hook` | Manage repository webhooks | Optional |
| `read:org` | Read org membership (if org repo) | Optional |

---

## 🔍 Verify Token Works

After setting up the token, test it:

```bash
# Try pushing again
git push origin main
```

If successful, you should see:
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
...
To https://github.com/santirio18-cmyk/Visitor-Management-System.git
   abc1234..def5678  main -> main
```

---

## ⚠️ Security Best Practices

1. **Don't share your token** - Treat it like a password
2. **Use expiration dates** - Set tokens to expire
3. **Revoke unused tokens** - Delete old tokens you don't need
4. **Use fine-grained tokens** - More secure (if available)
5. **Store securely** - Use password manager or keychain

---

## 🆘 Troubleshooting

### Error: "refusing to allow a Personal Access Token to create or update workflow"

**Solution:** Make sure `workflow` scope is selected when creating the token.

### Error: "Authentication failed"

**Solution:** 
- Double-check token is correct
- Make sure you're using token as password, not GitHub password
- Verify token hasn't expired

### Error: "Permission denied"

**Solution:**
- Ensure `repo` scope is selected
- Check if repository is private (needs `repo` scope)
- Verify you have write access to the repository

---

## 📝 Summary

**Minimum Required Scopes:**
- ✅ `repo` - Full repository access
- ✅ `workflow` - Update GitHub Actions workflows

**Token Name Example:**
```
Vendor Management System - Workflow Access
```

**After creating token:**
1. Copy token immediately
2. Update git credentials
3. Try pushing again

---

**Ready to create your token?** Go to: https://github.com/settings/tokens

