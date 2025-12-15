# 🔧 Fix Missing GCP_PROJECT_ID Secret

## ❌ Error Found!

**Error:** `ERROR: (gcloud.config.set) argument VALUE: Must be specified.`

**Cause:** The `GCP_PROJECT_ID` secret is **not set** or **empty** in GitHub!

---

## ✅ Solution: Add GitHub Secret

### Step 1: Go to GitHub Secrets

**URL:** https://github.com/santirio18-cmyk/Visitor-Management-System/settings/secrets/actions

### Step 2: Add GCP_PROJECT_ID Secret

1. Click **"New repository secret"**
2. **Name:** `GCP_PROJECT_ID`
3. **Value:** `carbon-theorem-474515-b2`
4. Click **"Add secret"**

### Step 3: Verify GCP_SA_KEY Secret

While you're there, verify `GCP_SA_KEY` exists:
- **Name:** `GCP_SA_KEY`
- **Value:** Your service account JSON key (entire JSON content)

---

## 📋 Required Secrets Checklist

Make sure these secrets exist:

- ✅ **GCP_PROJECT_ID** = `carbon-theorem-474515-b2`
- ✅ **GCP_SA_KEY** = Service account JSON key

---

## 🔍 How to Get Service Account Key

If you need to create/get the service account key:

1. **Go to:** Google Cloud Console → IAM & Admin → Service Accounts
2. **Find or create** service account
3. **Click** on service account
4. **Go to** "Keys" tab
5. **Click** "Add Key" → "Create new key"
6. **Select** JSON format
7. **Download** the JSON file
8. **Copy entire JSON content**
9. **Paste** into GitHub secret `GCP_SA_KEY`

---

## 🚀 After Adding Secrets

Once you've added the secrets:

1. **Go to:** https://github.com/santirio18-cmyk/Visitor-Management-System/actions
2. **Click** on failed workflow
3. **Click** "Re-run all jobs"
4. **Or** push a new commit to trigger deployment

---

## ✅ Updated Workflow

I've updated the workflow to:
- ✅ Check if secrets exist before using them
- ✅ Show clear error if secrets are missing
- ✅ Use proper variable handling

---

## 📝 Quick Fix Steps

1. **Add Secret:**
   - Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/settings/secrets/actions
   - Click "New repository secret"
   - Name: `GCP_PROJECT_ID`
   - Value: `carbon-theorem-474515-b2`
   - Click "Add secret"

2. **Verify GCP_SA_KEY:**
   - Check if it exists
   - If not, add service account JSON

3. **Re-run Workflow:**
   - Go to Actions
   - Click "Re-run all jobs"

---

**The workflow will now check for secrets and show clear errors if missing!** ✅
