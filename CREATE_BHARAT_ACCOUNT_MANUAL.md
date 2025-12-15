# ✅ Create Bharat Account Manually

## 🎯 Solution: Create Account via API

Since deployment completed but Bharat's account wasn't created, let's create it manually via the register API.

---

## 🚀 Create Bharat Account

### Option 1: Using curl (Command Line)

```bash
curl -X POST https://carbon-theorem-474515-b2.et.r.appspot.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bharath Chandrasekaran",
    "email": "bharath.chandrasekaran@tvs.in",
    "password": "Bh@rath2024#TVS!Approver3",
    "role": "third_level_approver"
  }'
```

**Expected Response:**
```json
{
  "token": "...",
  "user": {
    "id": 3,
    "name": "Bharath Chandrasekaran",
    "email": "bharath.chandrasekaran@tvs.in",
    "role": "third_level_approver"
  }
}
```

### Option 2: Using Browser/Postman

**URL:** `https://carbon-theorem-474515-b2.et.r.appspot.com/api/auth/register`

**Method:** POST

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Bharath Chandrasekaran",
  "email": "bharath.chandrasekaran@tvs.in",
  "password": "Bh@rath2024#TVS!Approver3",
  "role": "third_level_approver"
}
```

---

## ✅ After Creating Account

1. **Try Login:**
   - Email: `bharath.chandrasekaran@tvs.in`
   - Password: `Bh@rath2024#TVS!Approver3`
   - Should work now! ✅

2. **Verify Account:**
   - Login should succeed
   - Should see Third Level Approver Dashboard
   - Can approve/reject requests

---

## 🔍 If Account Already Exists

If you get "User already exists" error:
- Account might exist but password is wrong
- Try resetting via update (if you have database access)
- Or check backend logs for account details

---

## 📋 Account Details

**Name:** Bharath Chandrasekaran  
**Email:** `bharath.chandrasekaran@tvs.in`  
**Password:** `Bh@rath2024#TVS!Approver3`  
**Role:** `third_level_approver`

---

**Run the curl command above to create Bharat's account!** 🚀
