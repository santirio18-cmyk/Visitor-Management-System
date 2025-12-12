# 🚀 Redeploy Backend to Auto-Create Approvers

## What I Just Did

✅ Updated `server/database/db.js` to automatically create approver accounts when the database initializes
✅ Pushed the changes to GitHub

## Next Step: Redeploy Backend

The approvers will be created automatically when you redeploy the backend.

### In Google Cloud Shell:

```bash
cd Visitor-Management-System/server/Visitor-Management-System/server
git pull
gcloud app deploy
```

Type `Y` when asked, then wait 2-3 minutes.

---

## After Deployment

The following accounts will be **automatically created**:

1. **Default Manager** (if not exists):
   - Email: `manager@warehouse.com`
   - Password: `manager123`

2. **Jagadeesan Jayseelan**:
   - Email: `jagadeeshan.jayaseelan@tvs.in`
   - Password: `J@ga2024#TVS!Warehouse`

3. **Varadarajan Krishnamachari**:
   - Email: `varadarajan.krishnamachari@tvs.in`
   - Password: `V@ra2024#TVS!Approver2`

---

## How It Works

- When the backend starts, it checks if these users exist
- If they don't exist, it creates them automatically
- If they exist, it updates their passwords to match the script
- This happens every time the database initializes

---

**Just redeploy the backend and the approvers will be created automatically!** 🎉


