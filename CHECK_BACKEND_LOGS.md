# 🔍 Check Backend Logs - Find the Error

## The backend is showing "Service Unavailable"

This means the server might be crashing on startup. Let's check the logs.

---

## In Cloud Shell, Run:

```bash
gcloud app logs tail -s default
```

This will show you the actual error message.

---

## Common Issues:

### Issue 1: Database Path Not Writable
**Error**: "EACCES: permission denied" or "read-only file system"

**Fix**: App Engine has restrictions. The database should work, but let's check logs first.

### Issue 2: Missing Dependencies
**Error**: "Cannot find module"

**Fix**: Make sure all dependencies are in `package.json`

### Issue 3: Port Issue
**Error**: "Port already in use"

**Fix**: Already using PORT 8080 which is correct for App Engine

---

## Quick Fix - Check Logs First:

Run this in Cloud Shell:
```bash
gcloud app logs tail -s default --limit 50
```

**Copy the error message and share it** - then I can fix it exactly!

---

**Run the logs command and share the error!** 🔍

