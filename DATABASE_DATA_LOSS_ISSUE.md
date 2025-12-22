# ⚠️ CRITICAL: Database Data Loss Issue

## Problem Identified

**Issue**: Data entered last week has vanished from the backend.

**Root Cause**: The database file is stored in `/tmp` directory on Google Cloud App Engine, which is **ephemeral storage**. This means:

1. **Data is lost when instances restart** - App Engine instances restart periodically
2. **Data is lost when instances scale down** - App Engine scales instances based on traffic
3. **Data is lost during deployments** - New deployments may restart instances
4. **`/tmp` is cleared automatically** - Google Cloud clears `/tmp` on instance lifecycle events

## Current Database Configuration

```javascript
// In server/database/db.js
const isAppEngine = process.env.GAE_ENV || process.env.GOOGLE_CLOUD_PROJECT;
const DB_DIR = isAppEngine ? '/tmp' : __dirname;
const DB_PATH = path.join(DB_DIR, 'vendor_management.db');
```

**Problem**: On App Engine, this creates the database at `/tmp/vendor_management.db`, which is **NOT persistent**.

---

## Solutions

### Option 1: Use Google Cloud SQL (Recommended for Production)

**Pros:**
- Fully managed, persistent database
- Automatic backups
- High availability
- Scalable
- Data never lost

**Cons:**
- Requires setup
- May have costs (but free tier available)

**Steps:**
1. Create Cloud SQL instance in Google Cloud Console
2. Update database connection to use Cloud SQL
3. Migrate data

### Option 2: Use Cloud Storage for SQLite File (Quick Fix)

**Pros:**
- Minimal code changes
- Persistent storage
- Free tier available

**Cons:**
- Not ideal for high concurrency
- Requires sync mechanism

**Steps:**
1. Store SQLite file in Cloud Storage bucket
2. Download on startup, upload on changes
3. Sync periodically

### Option 3: Use Cloud Firestore (NoSQL)

**Pros:**
- Fully managed
- Free tier generous
- No server management
- Automatic scaling

**Cons:**
- Requires code changes (NoSQL instead of SQL)
- Different query syntax

---

## Immediate Action Required

### For Production Use:
**You MUST migrate to persistent storage** - Cloud SQL is recommended.

### For Development/Testing:
The current setup works locally but **will lose data on App Engine**.

---

## Why This Happened

1. **Last Week**: Data was entered and stored in `/tmp/vendor_management.db`
2. **This Week**: App Engine instance restarted or scaled down
3. **Result**: `/tmp` directory was cleared, database file deleted
4. **New Instance**: Created fresh database with no previous data

---

## Current Status

- ✅ **Local Development**: Works fine (database in project directory)
- ❌ **Production (App Engine)**: Data is NOT persistent - will be lost on restart

---

## Recommended Next Steps

1. **Immediate**: Set up Cloud SQL or Cloud Storage persistence
2. **Short-term**: Implement backup/restore mechanism
3. **Long-term**: Migrate to Cloud SQL for production reliability

---

## How to Check Current Data

You can check what's currently in the database by:
1. Logging into App Engine console
2. Checking logs for database path
3. Querying the API endpoints

But remember: **Any data currently there will be lost on next restart unless we fix the persistence issue.**

---

**This is a critical issue that needs to be addressed for production use.**
