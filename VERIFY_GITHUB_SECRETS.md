# 🔍 Verify GitHub Secrets - Step by Step

## ❌ Error: GCP_PROJECT_ID Secret Not Found

The workflow can't find the `GCP_PROJECT_ID` secret. Let's verify it's set correctly.

---

## ✅ Step-by-Step Verification

### Step 1: Go to GitHub Secrets

**URL:** https://github.com/santirio18-cmyk/Visitor-Management-System/settings/secrets/actions

### Step 2: Check Secret Names (EXACT MATCH REQUIRED)

The secret names must be **exactly** (case-sensitive):

- ✅ `GCP_PROJECT_ID` (all caps, with underscores)
- ✅ `GCP_SA_KEY` (all caps, with underscores)

**Common mistakes:**
- ❌ `gcp_project_id` (lowercase - WRONG)
- ❌ `GCP_PROJECTID` (no underscore - WRONG)
- ❌ `GCP-PROJECT-ID` (hyphens - WRONG)
- ❌ `Gcp_Project_Id` (mixed case - WRONG)

### Step 3: Verify GCP_PROJECT_ID Secret

1. **Look for:** `GCP_PROJECT_ID` in the secrets list
2. **Click** on it (or edit)
3. **Verify value is:** `carbon-theorem-474515-b2`
4. **Make sure:**
   - No extra spaces
   - No quotes around it
   - Exactly: `carbon-theorem-474515-b2`

### Step 4: Verify GCP_SA_KEY Secret

1. **Look for:** `GCP_SA_KEY` in the secrets list
2. **Verify it exists**
3. **Value should be:** Entire JSON service account key
4. **Format:** Should start with `{` and end with `}`

---

## 🔧 How to Add/Update Secrets

### If Secret Doesn't Exist:

1. **Click:** "New repository secret"
2. **Name:** `GCP_PROJECT_ID` (exact, case-sensitive)
3. **Value:** `carbon-theorem-474515-b2`
4. **Click:** "Add secret"

### If Secret Exists but Wrong:

1. **Click** on the secret name
2. **Click** "Update" button
3. **Change value** to: `carbon-theorem-474515-b2`
4. **Click** "Update secret"

---

## 📋 Checklist

Before retrying, verify:

- [ ] Secret name is exactly: `GCP_PROJECT_ID` (all caps)
- [ ] Secret value is exactly: `carbon-theorem-474515-b2`
- [ ] No extra spaces or quotes
- [ ] Secret is in the correct repository
- [ ] Both secrets exist: `GCP_PROJECT_ID` and `GCP_SA_KEY`

---

## 🚀 After Fixing Secrets

1. **Go to:** https://github.com/santirio18-cmyk/Visitor-Management-System/actions
2. **Click:** "Deploy Backend to Google Cloud"
3. **Click:** "Run workflow"
4. **Select:** `main` branch
5. **Click:** "Run workflow"

---

## 🆘 Still Not Working?

### Check Repository
Make sure you're adding secrets to the **correct repository**:
- Repository: `santirio18-cmyk/Visitor-Management-System`
- Not a fork or different repo

### Check Secret Visibility
- Secrets are **repository-specific**
- Make sure you're in the right repo settings

### Try Deleting and Re-adding
1. Delete the secret
2. Add it again with exact name: `GCP_PROJECT_ID`
3. Value: `carbon-theorem-474515-b2`

---

## 📝 Quick Reference

**Secret Name:** `GCP_PROJECT_ID`  
**Secret Value:** `carbon-theorem-474515-b2`

**Secret Name:** `GCP_SA_KEY`  
**Secret Value:** [Your service account JSON key]

---

**Double-check the secret name is exactly `GCP_PROJECT_ID` (all caps)!** ✅
