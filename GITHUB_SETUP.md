# GitHub Setup Guide

## Steps to Push to GitHub

### 1. Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `vendor-management-system`)
5. Choose **Public** visibility
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 2. Connect Local Repository to GitHub

**⚠️ IMPORTANT: First, navigate to the project directory!**

```bash
cd "/Users/santhoshpremkumar/Vendor Management System"
```

**Where to find the commands on GitHub:**

After creating the repository, you'll be taken to your new repository page. On that page, you'll see a section titled:

**"Quick setup — if you've done this kind of thing before"**

This section appears in a gray box near the top of the page, right below the repository name. It will show you commands like:

```
…or create a new repository on the command line
…or push an existing repository from the command line
```

Click on the **"push an existing repository from the command line"** tab to see the commands you need.

**Use these commands (make sure you're in the project directory first!):**

```bash
# Add the remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3. Alternative: Using SSH

If you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### 4. Verify

After pushing, refresh your GitHub repository page. You should see all your files there!

## Important Notes

- The `.gitignore` file ensures sensitive files (like `.env` and database files) are NOT uploaded
- The database file (`vendor_management.db`) is excluded from the repository
- Users will need to set up their own `.env` file based on `.env.example`

## Future Updates

To push future changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

