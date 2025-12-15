# 🔍 How to Check Backend URL in Browser Console

## Step-by-Step Guide

### Step 1: Open Developer Tools

**Method 1: Keyboard Shortcut**
- Press `F12` (Windows/Linux)
- Press `Cmd + Option + I` (Mac)

**Method 2: Right-Click**
- Right-click anywhere on the page
- Select **"Inspect"** or **"Inspect Element"**

**Method 3: Menu**
- Chrome/Edge: Menu (☰) → More Tools → Developer Tools
- Firefox: Menu (☰) → More Tools → Web Developer Tools
- Safari: Develop → Show Web Inspector (enable Develop menu first)

---

### Step 2: Check Network Tab (Best Method)

1. **Click on "Network" tab** (at the top of Developer Tools)

2. **Filter by "Fetch/XHR"** (to see only API calls)
   - Look for a filter dropdown
   - Select "Fetch/XHR" or "XHR"

3. **Submit a form or interact with the app**
   - Fill out the visitor form
   - Click "Submit Request"
   - Or login as approver

4. **Look at the requests in the Network tab**
   - You'll see requests like:
     - `api/requests/public`
     - `api/auth/login`
     - etc.

5. **Click on a request** to see details:
   - **Request URL** should show: `carbon-theorem-474515-b2.et.r.appspot.com`
   - **NOT**: `your-backend-url.uc.r.appspot.com`

---

### Step 3: Check Console Tab (For Errors)

1. **Click on "Console" tab** (at the top of Developer Tools)

2. **Look for:**
   - ✅ **Good**: No errors, or requests to `carbon-theorem-474515-b2.et.r.appspot.com`
   - ❌ **Bad**: Errors mentioning `your-backend-url.uc.r.appspot.com`

3. **Check for the debug log:**
   - You should see: `Using backend URL: https://carbon-theorem-474515-b2.et.r.appspot.com`
   - (This appears when the page loads)

---

## Visual Guide

### Network Tab View:
```
Network Tab
├── Name                    │ Status │ Type
├── api/requests/public      │ 200    │ xhr
│   └─ Request URL: https://carbon-theorem-474515-b2.et.r.appspot.com/api/requests/public
│
└── api/auth/login           │ 200    │ xhr
    └─ Request URL: https://carbon-theorem-474515-b2.et.r.appspot.com/api/auth/login
```

### Console Tab View:
```
Console Tab
✅ Using backend URL: https://carbon-theorem-474515-b2.et.r.appspot.com
✅ Request submitted successfully
```

---

## What to Look For

### ✅ CORRECT (What you should see):
- `carbon-theorem-474515-b2.et.r.appspot.com`
- Requests going to this URL
- Status 200 (success) or 400/500 (errors, but URL is correct)

### ❌ WRONG (What you should NOT see):
- `your-backend-url.uc.r.appspot.com`
- `localhost:5001` (on live site)
- CORS errors mentioning wrong URL

---

## Quick Test

1. Open: https://santirio18-cmyk.github.io/Visitor-Management-System/
2. Press `F12` to open Developer Tools
3. Click **"Network"** tab
4. Fill out the form and click **"Submit Request"**
5. Look at the request in Network tab
6. Click on the request
7. Check the **Request URL** - it should show `carbon-theorem-474515-b2.et.r.appspot.com`

---

## Screenshot Locations

**Network Tab:**
- Top of Developer Tools
- Shows all network requests
- Click on any request to see full URL

**Console Tab:**
- Next to Network tab
- Shows JavaScript logs and errors
- Look for error messages or debug logs

---

That's it! The Network tab is the easiest way to verify the backend URL.





