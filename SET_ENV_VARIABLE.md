# 🔧 Set Environment Variable - Step by Step

## If You See 3 Options:

### Option 1: Use "Edit and Deploy New Version"
1. Click **"Edit and Deploy New Version"** (or similar option)
2. You'll see a form with settings
3. Scroll down to find **"Environment Variables"** section
4. Click **"Add Environment Variable"** or **"Add Item"**
5. Enter:
   - **Key**: `JWT_SECRET`
   - **Value**: `your-secret-key-12345`
6. Click **"Deploy"** or **"Save"**

---

## Alternative Method: Via app.yaml

### Step 1: Edit app.yaml in Cloud Shell

In Cloud Shell, run:
```bash
cd Visitor-Management-System/server/Visitor-Management-System/server
nano app.yaml
```

### Step 2: Add JWT_SECRET

Find the `env_variables:` section and add:
```yaml
env_variables:
  NODE_ENV: production
  PORT: 8080
  JWT_SECRET: your-secret-key-12345
```

### Step 3: Save and Exit
- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter` to save

### Step 4: Redeploy
```bash
gcloud app deploy
```

Type `Y` when asked.

---

## Which 3 Options Are You Seeing?

Tell me what the 3 options say, and I'll guide you to the right one!

Common options:
- "Edit and Deploy New Version"
- "View Logs"
- "Delete Version"

Choose the first one if you see it!

---

**Try the app.yaml method - it's easier!** 🚀





