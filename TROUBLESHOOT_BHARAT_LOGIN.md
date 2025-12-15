# 🔧 Troubleshoot Bharat Login - Invalid Credentials

## ❌ Issue: Invalid Credentials

If you're getting "invalid credentials" error when logging in as Bharat, here's how to fix it:

---

## ✅ Verify Correct Credentials

### Bharat's Login Details:

**Email:** `bharath.chandrasekaran@tvs.in`  
**Password:** `Bh@rath2024#TVS!Approver3`

**Important:** 
- Email is case-sensitive
- Password is case-sensitive
- Make sure there are no extra spaces

---

## 🔍 Possible Issues

### Issue 1: Account Not Created Yet

**If backend deployment hasn't completed:**
- Bharat's account is created automatically when backend initializes
- Wait for backend deployment to complete
- Check backend logs to confirm account creation

**Check deployment status:**
- Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/actions
- Verify "Deploy Backend to Google Cloud" workflow completed successfully

### Issue 2: Backend Not Running

**Check backend health:**
```bash
curl https://carbon-theorem-474515-b2.et.r.appspot.com/api/health
```

**Should return:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

### Issue 3: Typo in Credentials

**Double-check:**
- Email: `bharath.chandrasekaran@tvs.in` (lowercase, with dots)
- Password: `Bh@rath2024#TVS!Approver3` (exact case, includes special characters)

**Common mistakes:**
- ❌ `Bharath.chandrasekaran@tvs.in` (capital B)
- ❌ `bharathchandrasekaran@tvs.in` (no dots)
- ❌ `bharath.chandrasekaran@TVS.in` (capital TVS)
- ❌ Password without special characters

### Issue 4: Account Creation Failed

**If account wasn't created:**
- Check backend logs for errors
- Verify database initialization completed
- Check if approver creation script ran successfully

---

## 🔧 Solutions

### Solution 1: Wait for Deployment

If backend is still deploying:
1. Wait for deployment to complete
2. Wait 1-2 minutes after deployment
3. Try logging in again

### Solution 2: Verify Backend is Running

**Test backend:**
```bash
# Health check
curl https://carbon-theorem-474515-b2.et.r.appspot.com/api/health

# Try login API directly
curl -X POST https://carbon-theorem-474515-b2.et.r.appspot.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"bharath.chandrasekaran@tvs.in","password":"Bh@rath2024#TVS!Approver3"}'
```

### Solution 3: Check Account Exists

**If you have database access:**
```sql
SELECT id, name, email, role FROM users 
WHERE email = 'bharath.chandrasekaran@tvs.in';
```

**If account doesn't exist:**
- Backend initialization might have failed
- Check backend logs
- Redeploy backend if needed

### Solution 4: Try Other Accounts First

**Test with Jagadeesan (1st level):**
- Email: `jagadeeshan.jayaseelan@tvs.in`
- Password: `J@ga2024#TVS!Warehouse`

**If Jagadeesan works but Bharat doesn't:**
- Bharat's account might not be created
- Check backend logs for errors

---

## 📋 Step-by-Step Troubleshooting

1. ✅ **Check backend deployment status**
   - Is it completed? ✅
   - Any errors? ❌

2. ✅ **Test backend health**
   - Is it responding? ✅
   - Database connected? ✅

3. ✅ **Verify credentials**
   - Email correct? ✅
   - Password correct? ✅
   - No typos? ✅

4. ✅ **Check account exists**
   - Query database or check logs
   - Account created? ✅

5. ✅ **Try login API directly**
   - Test with curl command
   - See exact error message

---

## 🆘 If Still Not Working

**Share:**
1. Backend deployment status (completed/failed)
2. Backend health check result
3. Exact error message from login
4. Whether other accounts work (Jagadeesan/Varadan)

---

## ✅ Correct Credentials (Copy-Paste Ready)

**Email:**
```
bharath.chandrasekaran@tvs.in
```

**Password:**
```
Bh@rath2024#TVS!Approver3
```

---

**Check backend deployment status first, then verify credentials are exact!** 🔍
