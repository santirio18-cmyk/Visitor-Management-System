# 🔍 Check Why Approved Requests Not Showing

## ❌ Issue

Approved requests are not showing in Third Level Approver Dashboard.

---

## 🔍 Root Cause Analysis

The query shows requests where:
- Status is `pending_third_approval` OR
- `third_level_approver_id` matches Bharat's user ID

**If approved requests aren't showing, likely reasons:**

1. **Request approved before Bharat account existed**
   - `third_level_approver_id` is NULL or different
   - Need to update database

2. **Request approved by different approver**
   - `third_level_approver_id` set to different user
   - Won't show (by design)

3. **Request approved at first/second level**
   - Never reached third level
   - `third_level_approver_id` is NULL
   - Won't show (correct behavior)

---

## ✅ Fix Applied

Updated query to show:
- ✅ Pending third level approval requests
- ✅ **All requests where `third_level_approver_id = Bharat's ID`** (regardless of status)

**This should show approved requests IF `third_level_approver_id` was set when approving.**

---

## 🔧 How to Verify

### Check Database

**Query to check approved requests:**
```sql
-- Get Bharat's user ID
SELECT id, name, email FROM users WHERE email = 'bharath.chandrasekaran@tvs.in';

-- Check approved requests and their third_level_approver_id
SELECT id, visitor_name, status, third_level_approver_id, created_at, updated_at 
FROM visit_requests 
WHERE status = 'approved' 
ORDER BY updated_at DESC;
```

**If `third_level_approver_id` is NULL or different:**
- That's why they're not showing!
- Need to update those records

---

## 🔧 Fix Old Records (If Needed)

**If requests were approved before Bharat account existed:**

```sql
-- Update approved requests to assign to Bharat
-- Replace BHARAT_USER_ID with actual ID from first query
UPDATE visit_requests 
SET third_level_approver_id = (SELECT id FROM users WHERE email = 'bharath.chandrasekaran@tvs.in')
WHERE status = 'approved' 
  AND third_level_approver_id IS NULL
  AND updated_at > '2025-12-15'; -- Adjust date as needed
```

---

## 🎯 Expected Behavior

**Third Level Approver sees:**
- ✅ Requests pending third level approval
- ✅ Requests assigned to them (`third_level_approver_id = their ID`)
- ✅ All statuses: pending, approved, rejected

**Third Level Approver does NOT see:**
- ❌ Requests approved at first/second level (never reached third level)
- ❌ Requests assigned to other approvers
- ❌ Requests where `third_level_approver_id` is NULL

---

## 📋 Next Steps

1. **Wait for backend deployment** (2-3 minutes)
2. **Check database** - Verify `third_level_approver_id` is set for approved requests
3. **If NULL** - Update old records (see SQL above)
4. **Refresh dashboard** - Should show approved requests

---

**Backend fix deployed! Check database to verify `third_level_approver_id` is set correctly!** 🔍
