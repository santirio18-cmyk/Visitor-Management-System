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

**⚠️ Important:** GitHub's web interface doesn't let you select folders directly. You have two options:

**Option A: Drag and Drop (Easiest)**
1. Open Finder on your Mac
2. Navigate to: `/Users/santhoshpremkumar/Vendor Management System`
3. Select all files and folders EXCEPT:
   - `node_modules/` (skip this folder)
   - `.env` files (skip these)
   - `*.db` or `*.sqlite` files (skip database files)
   - `.git/` folder (skip this)
4. Drag the selected items directly onto the GitHub upload page
5. GitHub will preserve the folder structure automatically!

**Option B: Select Files Manually**
1. Click "choose your files" on GitHub
2. Navigate to: `/Users/santhoshpremkumar/Vendor Management System`
3. You'll need to upload files in batches:
   - First, upload root files: `package.json`, `.gitignore`, `README.md`, `GITHUB_SETUP.md`
   - Then navigate into `client/` and select all files (but skip `node_modules/`)
   - Then navigate into `server/` and select all files (but skip `node_modules/`, `.env`, and `*.db` files)
   - Continue for subfolders like `client/src/`, `server/routes/`, etc.

**Files to upload:**
- ✅ All files in `client/` folder (except `node_modules/`)
- ✅ All files in `server/` folder (except `node_modules/`, `.env`, and `*.db` files)
- ✅ Root `package.json` files
- ✅ `.gitignore`
- ✅ `README.md`
- ✅ `GITHUB_SETUP.md`

**DO NOT upload:**
- ❌ `node_modules/` folders (too large, will be installed via npm)
- ❌ `.env` files (contains sensitive data)
- ❌ `*.db` or `*.sqlite` database files
- ❌ `.git/` folder

#### Step 4: Create Folders on GitHub (if needed)

If you uploaded files without folder structure:
1. Click "Add file" → "Create new file"
2. Type the folder name followed by `/` (e.g., `client/src/`)
3. Type a filename (e.g., `README.md`)
4. Add some content or leave it empty
5. Click "Commit changes"
6. Now you can upload files to that folder

**Better approach:** Use drag and drop - it preserves folder structure automatically!

#### Step 5: Commit the Files

1. Scroll down to the bottom of the upload page
2. Enter a commit message: "Initial commit: Vendor Management System"
3. Click **"Commit changes"** button

That's it! Your files are now on GitHub! 🎉

**💡 Tip:** The drag and drop method is much easier as it automatically creates folders and preserves the structure!

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

