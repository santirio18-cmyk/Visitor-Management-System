# 🔐 Login Credentials

## Default Credentials

### First Level Approver (Warehouse Manager)
- **Email**: `manager@warehouse.com`
- **Password**: `manager123`
- **Role**: Warehouse Manager

### Created Approvers

#### 1️⃣ First Level Approver
- **Name**: Jagadeesan Jayseelan
- **Email**: `jagadeeshan.jayaseelan@tvs.in`
- **Password**: `J@ga2024#TVS!Warehouse`
- **Role**: Warehouse Manager

#### 2️⃣ Second Level Approver
- **Name**: Varadarajan Krishnamachari
- **Email**: `varadarajan.krishnamachari@tvs.in`
- **Password**: `V@ra2024#TVS!Approver2`
- **Role**: Second Level Approver

---

## ⚠️ Important: Production Database

**The approver accounts need to be created on the production database (Google Cloud).**

The default manager (`manager@warehouse.com`) is created automatically, but the custom approvers need to be added.

---

## How to Create Approvers on Production

### Option 1: Run Script on Google Cloud (Recommended)

1. **Go to Google Cloud Shell**: https://shell.cloud.google.com
2. **Navigate to server directory**:
   ```bash
   cd Visitor-Management-System/server/Visitor-Management-System/server
   ```
3. **Run the create approvers script**:
   ```bash
   node scripts/createApprovers.js
   ```

### Option 2: Use Default Manager

If you just need to test, use:
- **Email**: `manager@warehouse.com`
- **Password**: `manager123`

This account is created automatically when the database initializes.

---

## Troubleshooting "Invalid Credentials"

1. **Check if user exists**: The user might not be in the production database
2. **Check password**: Make sure you're using the exact password (case-sensitive)
3. **Check email**: Make sure email is spelled correctly
4. **Run create approvers script**: If approvers don't exist, run the script above

---

## Quick Test

Try logging in with:
- Email: `manager@warehouse.com`
- Password: `manager123`

If this works, the issue is that the custom approvers don't exist in production yet.





