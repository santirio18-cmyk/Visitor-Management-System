# Fix 3rd Level Approver Login Issue

## Problem
- Invalid credentials when logging in with `bharath.chandrasekaran@tvs.in`
- 3rd level approver dashboard not showing in live app

## Solution

### Step 1: Deploy Backend (This will create the 3rd level approver account)

The backend needs to be redeployed so the database initialization runs and creates the 3rd level approver account.

**Option A: Manual Push (Recommended)**
1. Go to GitHub: https://github.com/santirio18-cmyk/Visitor-Management-System
2. Click on "Actions" tab
3. Click "Run workflow" button (top right)
4. Select "main" branch
5. Click "Run workflow" button
6. Wait for deployment to complete (5-10 minutes)

**Option B: Push via Terminal (if you have workflow scope)**
```bash
cd "/Users/santhoshpremkumar/Vendor Management System"
git push origin main
```

### Step 2: Deploy Frontend

The frontend needs to be rebuilt and deployed with the 3rd level approver dashboard.

```bash
cd "/Users/santhoshpremkumar/Vendor Management System/client"
npm run build
npm run deploy
```

Or if you prefer manual deployment:
1. Go to GitHub repository
2. Go to Settings > Pages
3. The frontend should auto-deploy when you push to main branch

### Step 3: Verify the Account Was Created

After backend deployment completes, check the logs:
1. Go to Google Cloud Console
2. Navigate to App Engine > Logs
3. Look for messages like:
   - `✓ Approver created: Bharath Chandrasekaran (bharath.chandrasekaran@tvs.in)`
   - `✓ All approver accounts processed`

### Step 4: Test Login

Try logging in with:
- **Email:** `bharath.chandrasekaran@tvs.in`
- **Password:** `Bh@rath2024#TVS!Approver3`

### Step 5: Clear Browser Cache

If the dashboard still doesn't show:
1. Open the app in an incognito/private window
2. Or clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
3. Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

## Expected Behavior After Fix

1. **Login:** Should successfully login with the 3rd level approver credentials
2. **Dashboard:** Should see "Third Level Approver Dashboard" after login
3. **Requests:** Should see requests with status "Pending 3rd Level"
4. **Actions:** Should be able to Approve or Reject requests

## If Still Not Working

1. Check backend logs in Google Cloud Console for any errors
2. Verify the database has the user:
   - Check App Engine logs for "Approver created" messages
3. Verify frontend is using latest code:
   - Check GitHub Pages deployment status
   - Clear browser cache completely

## Notes

- The database initialization runs automatically when the backend server starts
- The 3rd level approver account is created/updated every time the server starts
- If the account exists, it will update the password and role
- If the account doesn't exist, it will create it

