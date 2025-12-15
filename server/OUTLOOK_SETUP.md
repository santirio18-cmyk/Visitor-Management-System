# Outlook Email Setup Guide

Complete guide for configuring Outlook/Hotmail/Microsoft 365 emails.

## Quick Setup for Outlook.com / Hotmail.com

### Step 1: Get Your Email Credentials

**If you DON'T have 2-Factor Authentication:**
- Use your regular Outlook/Hotmail email and password

**If you HAVE 2-Factor Authentication enabled:**
- You need to create an App Password (see Step 2)

### Step 2: Create App Password (If 2FA Enabled)

1. Go to https://account.microsoft.com/security
2. Sign in with your Microsoft account
3. Click on **"Advanced security options"**
4. Scroll down to **"App passwords"**
5. Click **"Create a new app password"**
6. Select:
   - **App**: Mail
   - **Device**: Your device name (or create custom name)
7. Click **"Generate"**
8. **Copy the 16-character password** (you won't see it again!)
   - Format: `abcd-efgh-ijkl-mnop` (remove dashes when using)

### Step 3: Update .env File

Open `server/.env` and update with your Outlook settings:

```env
# Enable Email
EMAIL_ENABLED=true

# Outlook SMTP Settings
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false

# Your Outlook Email Credentials
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password-or-app-password

# Display Name
EMAIL_FROM_NAME=Vendor Management System

# Manager Email (where new request notifications go)
MANAGER_EMAIL=manager@warehouse.com
```

### Step 4: Restart Server

After updating `.env`, restart your server:
```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

## Configuration Examples

### Example 1: Outlook.com (Personal)
```env
EMAIL_ENABLED=true
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=john.doe@outlook.com
EMAIL_PASSWORD=your-password
EMAIL_FROM_NAME=Vendor Management System
MANAGER_EMAIL=john.doe@outlook.com
```

### Example 2: Hotmail.com
```env
EMAIL_ENABLED=true
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=john.doe@hotmail.com
EMAIL_PASSWORD=your-password
EMAIL_FROM_NAME=Vendor Management System
MANAGER_EMAIL=john.doe@hotmail.com
```

### Example 3: Microsoft 365 (Business)
```env
EMAIL_ENABLED=true
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=john.doe@company.com
EMAIL_PASSWORD=your-password
EMAIL_FROM_NAME=Vendor Management System
MANAGER_EMAIL=warehouse@company.com
```

## Alternative SMTP Settings

If `smtp-mail.outlook.com` doesn't work, try:

```env
SMTP_HOST=smtp.live.com
SMTP_PORT=587
SMTP_SECURE=false
```

## Testing Your Configuration

1. **Start the server** with email enabled
2. **Submit a test request** from the form
3. **Check the server console** for email logs:
   - Success: "Email sent successfully: [message-id]"
   - Error: Check the error message
4. **Check email inboxes**:
   - Visitor's email (from form) - should receive confirmation
   - Manager's email (MANAGER_EMAIL) - should receive notification

## Troubleshooting

### "Authentication failed" Error

**Solution 1**: If you have 2FA enabled, use App Password instead of regular password

**Solution 2**: Check if "Less secure app access" is enabled (older accounts)
- Go to Microsoft Account Security
- Look for "Less secure app access" (if available)
- Enable it temporarily for testing

**Solution 3**: Verify email and password are correct
- Try logging into Outlook.com with the same credentials
- Make sure there are no extra spaces in `.env` file

### "Connection timeout" Error

**Solution 1**: Check firewall settings
- Port 587 should be open
- Some networks block SMTP ports

**Solution 2**: Try port 25 (if 587 doesn't work)
```env
SMTP_PORT=25
```

**Solution 3**: Try alternative host
```env
SMTP_HOST=smtp.live.com
```

### "Relay access denied" Error

**Solution**: This usually happens with Microsoft 365 business accounts
- Contact your IT administrator
- They may need to enable SMTP AUTH for your account
- Or use a different email account

### Emails Not Sending

1. **Check EMAIL_ENABLED**:
   ```env
   EMAIL_ENABLED=true  # Must be exactly "true"
   ```

2. **Check server console** for error messages

3. **Verify all settings** in `.env`:
   - No typos in email addresses
   - No extra spaces or quotes
   - Password is correct

4. **Test with a simple email client** (like Outlook app) to verify credentials work

## Security Notes

- **App Passwords are safer** than regular passwords
- **Never commit `.env` file** to version control
- **Use dedicated email account** for production (not personal)
- **Regularly rotate passwords** for security

## Quick Reference

| Setting | Value |
|---------|-------|
| SMTP Host | `smtp-mail.outlook.com` or `smtp.live.com` |
| SMTP Port | `587` (recommended) or `25` |
| SMTP Secure | `false` |
| Authentication | Required (email + password) |
| 2FA Support | Yes (use App Password) |

## Need Help?

If you're still having issues:
1. Check server console for specific error messages
2. Verify your Outlook account can send emails normally
3. Try testing with a different email account
4. Check Microsoft's SMTP documentation for your account type





