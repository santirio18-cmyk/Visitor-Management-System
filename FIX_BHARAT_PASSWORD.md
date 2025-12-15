# 🔧 Fix Bharat Password - Account Exists But Login Fails

## ✅ What We Know

- ✅ Bharat's account exists (`User already exists`)
- ❌ Login fails with "invalid credentials"
- ✅ Jagadeesan login works (backend is fine)

**Conclusion:** Password might be incorrect or hash doesn't match.

---

## 🔧 Solution: Update Password

Since the account exists but password doesn't work, we need to update it.

### Option 1: Update via Database (If You Have Access)

If you have database access, update the password hash:

```sql
-- The password hash for: Bh@rath2024#TVS!Approver3
-- Needs to be regenerated with bcrypt

-- First, check current account
SELECT id, name, email, role FROM users 
WHERE email = 'bharath.chandrasekaran@tvs.in';

-- Then update password (you'll need to generate hash first)
-- This requires running the createApprovers script or using bcrypt
```

### Option 2: Redeploy Backend (Updates Password)

The `createApprovers` script updates passwords if account exists. Redeploy:

```bash
# Trigger redeployment
cd server
echo "# Update Bharat password" >> .deploy-trigger
git add .deploy-trigger
git commit -m "Update Bharat password"
git push origin main
```

After deployment, the script will:
- Find existing Bharat account
- Update password to: `Bh@rath2024#TVS!Approver3`
- Update name and role if needed

### Option 3: Check Backend Logs

Check if password was set correctly during initialization:
- Look for: `✓ Approver created: Bharath Chandrasekaran`
- Or: `✓ Approver updated: Bharath Chandrasekaran`

---

## 🔍 Verify Current Account

**Check if account exists:**
```bash
# Try to get user info (if you have manager access)
# Login as Jagadeesan first, then check users
```

---

## ✅ Quick Fix: Trigger Redeployment

The easiest solution is to trigger a redeployment. The `createApprovers` function will:
1. Find Bharat's existing account
2. Update the password hash
3. Ensure credentials match

**I can trigger this for you!**

---

## 📋 Bharat's Correct Credentials

**Email:** `bharath.chandrasekaran@tvs.in`  
**Password:** `Bh@rath2024#TVS!Approver3`  
**Role:** `third_level_approver`

---

**The account exists but password needs updating. Should I trigger a redeployment to fix it?** 🔧
