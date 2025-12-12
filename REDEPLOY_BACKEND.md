# 🔄 Redeploy Backend - Fixed Database Issue

## I Fixed the Database Path Issue!

App Engine needs writable storage. I've updated the code to use `/tmp` folder.

---

## Redeploy Now:

In Cloud Shell, run:

```bash
cd Visitor-Management-System/server/Visitor-Management-System/server
git pull
gcloud app deploy
```

Type `Y` when asked.

Wait 3-5 minutes.

---

## After Redeploy:

1. Test backend: https://carbon-theorem-474515-b2.et.r.appspot.com/api/health
2. Should show: `{"status":"OK","message":"Server is running"}`
3. Test form submission on live app

---

**Redeploy now - the database issue is fixed!** 🚀


