# GitHub Setup Guide

## Two Methods to Upload Your Project

### Method 1: Upload Files Directly (Easier - No Command Line Required) ⭐

This is the easiest method if you prefer using GitHub's web interface.

#### Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `vendor-management-system`)
5. Choose **Public** visibility
6. **DO NOT** initialize with README, .gitignore, or license
7. Click "Create repository"

#### Step 2: Upload Files Using GitHub's Upload Feature

After creating the repository, you'll see a page with options. Look for:

**"uploading an existing file"** link (usually in a gray box)

OR

1. Click the **"Add file"** button (green button, top right of the file list area)
2. Select **"Upload files"** from the dropdown
3. You can either:
   - **Drag and drop** your entire project folder onto the page, OR
   - Click **"choose your files"** and select all files from your project

#### Step 3: Select Your Files

Navigate to: `/Users/santhoshpremkumar/Vendor Management System`

**Important files to upload:**
- All files in `client/` folder
- All files in `server/` folder (except `.env` and `*.db` files)
- `package.json` files
- `.gitignore`
- `README.md`
- `GITHUB_SETUP.md`

**DO NOT upload:**
- `node_modules/` folders
- `.env` files
- `*.db` or `*.sqlite` database files
- `.git/` folder

#### Step 4: Commit the Files

1. Scroll down to the bottom of the upload page
2. Enter a commit message: "Initial commit: Vendor Management System"
3. Click **"Commit changes"** button

That's it! Your files are now on GitHub! 🎉

---

### Method 2: Using Command Line (For Advanced Users)

### 1. Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `vendor-management-system`)
5. Choose **Public** visibility
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 2. Connect Local Repository to GitHub (Command Line Method)

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

