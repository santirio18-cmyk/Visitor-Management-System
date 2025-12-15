# 🔍 Why Approved Requests Not Showing - Analysis

## ❌ Issue

**Problem:** Approved requests are not showing in Third Level Approver Dashboard.

**User says:** "I have raised and approved a request before sometime what it is not showing"

---

## 🔍 Possible Causes

### Cause 1: Request Approved Before Bharat Account Existed

If the request was approved **before Bharat's account was created**:
- The `third_level_approver_id` might not be set
- Or it might be set to a different user ID
- Query won't find it because it looks for `third_level_approver_id = Bharat's ID`

### Cause 2: Request Approved by Different Approver

If the request was approved by a **different third level approver**:
- `third_level_approver_id` would be set to that approver's ID
- Bharat won't see it (by design - each approver sees their own requests)

### Cause 3: Request Status Changed Before Third Level

If the request was **approved/rejected at first or second level**:
- It never reached third level
- `third_level_approver_id` is NULL
- Won't show in third level dashboard (correct behavior)

### Cause 4: Database Issue

If `third_level_approver_id` wasn't saved properly:
- Check database to verify
- May need to update old records

---

## ✅ Current Query Logic

**Third Level Approver sees:**
- ✅ Requests with status `pending_third_approval` (waiting for approval)
- ✅ Requests where `third_level_approver_id = Bharat's user ID` (all statuses)

**This should show:**
- Pending requests assigned to Bharat
- Approved requests approved by Bharat
- Rejected requests rejected by Bharat

---

## 🔧 How to Check

### Option 1: Check Database

Query the database to see if `third_level_approver_id` is set:

```sql
SELECT id, visitor_name, status, third_level_approver_id, created_at, updated_at 
FROM visit_requests 
WHERE status = 'approved' 
ORDER BY updated_at DESC;
```

**Check:**
- Is `third_level_approver_id` set?
- Does it match Bharat's user ID?
- When was it updated?

### Option 2: Check Backend Logs

After approving a request, check logs for:
- Was `third_level_approver_id` set?
- What user ID was used?

### Option 3: Test with New Request

1. Submit a new request
2. Have Jagadeesan pass to second level
3. Have Varadan pass to third level
4. Have Bharat approve it
5. Check if it shows in Bharat's dashboard

---

## 🎯 Expected Behavior

**Third Level Approver should see:**
- ✅ All requests assigned to them (`third_level_approver_id = their ID`)
- ✅ All statuses: pending, approved, rejected
- ✅ Requests they've processed

**Third Level Approver should NOT see:**
- ❌ Requests approved at first/second level (never reached third level)
- ❌ Requests assigned to other third level approvers
- ❌ Requests where `third_level_approver_id` is NULL

---

## 🔧 If Request Was Approved Before

If the request was approved **before Bharat's account existed**:

**Option 1: Update Database**
```sql
-- Find the approved request
SELECT id FROM visit_requests WHERE status = 'approved' ORDER BY updated_at DESC LIMIT 1;

-- Update third_level_approver_id (replace REQUEST_ID and BHARAT_USER_ID)
UPDATE visit_requests 
SET third_level_approver_id = (SELECT id FROM users WHERE email = 'bharath.chandrasekaran@tvs.in')
WHERE id = REQUEST_ID;
```

**Option 2: Re-approve Flow**
- Have request go through approval flow again
- This time `third_level_approver_id` will be set correctly

---

## 📋 Quick Check

**To verify if query is working:**

1. **Check if Bharat's user ID is correct:**
   ```sql
   SELECT id, name, email FROM users WHERE email = 'bharath.chandrasekaran@tvs.in';
   ```

2. **Check approved requests:**
   ```sql
   SELECT id, visitor_name, status, third_level_approver_id 
   FROM visit_requests 
   WHERE status = 'approved';
   ```

3. **Check if they match:**
   - Does `third_level_approver_id` match Bharat's user ID?
   - If not, that's why they're not showing!

---

**The query should work. Check if `third_level_approver_id` is set correctly for approved requests!** 🔍
