# 📋 What to Paste in GitHub Secrets

## Secret 1: GCP_SA_KEY

**Name**: `GCP_SA_KEY`

**Value**: Paste the **ENTIRE contents** of the JSON file you downloaded

**Example** (what the JSON file looks like):
```json
{
  "type": "service_account",
  "project_id": "carbon-theorem-474515-b2",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "github-actions-deployer@carbon-theorem-474515-b2.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

**How to get it:**
1. Open the JSON file you downloaded (from Step 2)
2. Select ALL (Cmd+A or Ctrl+A)
3. Copy (Cmd+C or Ctrl+C)
4. Paste into the Secret value field

---

## Secret 2: GCP_PROJECT_ID

**Name**: `GCP_PROJECT_ID`

**Value**: Paste exactly this (no quotes, no spaces):

```
carbon-theorem-474515-b2
```

**That's it!** Just the project ID, nothing else.

---

## Step-by-Step in GitHub

1. Go to: https://github.com/santirio18-cmyk/Visitor-Management-System/settings/secrets/actions

2. Click **"New repository secret"**

3. **For GCP_SA_KEY:**
   - Name: `GCP_SA_KEY`
   - Value: Paste entire JSON file contents
   - Click **"Add secret"**

4. Click **"New repository secret"** again

5. **For GCP_PROJECT_ID:**
   - Name: `GCP_PROJECT_ID`
   - Value: `carbon-theorem-474515-b2`
   - Click **"Add secret"**

---

## Visual Guide

```
GitHub Secrets Page
    ↓
New repository secret
    ↓
Name: GCP_PROJECT_ID
    ↓
Secret: [paste: carbon-theorem-474515-b2]
    ↓
Add secret ✅
```

---

## Important Notes

✅ **GCP_PROJECT_ID**: Just the text `carbon-theorem-474515-b2` (no quotes)
✅ **GCP_SA_KEY**: Entire JSON file (with all the brackets and quotes)

❌ **Don't add**: Quotes, extra spaces, or formatting
❌ **Don't add**: `project_id:` or any labels

---

**That's what to paste!** 🎯





