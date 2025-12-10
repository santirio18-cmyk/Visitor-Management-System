# Email Configuration Guide

This guide will help you configure email notifications for the Vendor Management System.

## Email Notifications

The system sends emails for:
1. **Request Submitted** - Sent to visitor when they submit a request
2. **New Request Notification** - Sent to warehouse manager when a new request is submitted
3. **Request Approved** - Sent to visitor when their request is approved
4. **Request Rejected** - Sent to visitor when their request is rejected

## Configuration Options

### Option 1: Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update `.env` file**:
```env
EMAIL_ENABLED=true
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
EMAIL_FROM_NAME=Vendor Management System
MANAGER_EMAIL=manager@warehouse.com
```

### Option 2: Outlook/Hotmail (Microsoft 365/Outlook.com)

1. **Use your Outlook email** (Outlook.com, Hotmail.com, or Microsoft 365)

2. **For Outlook.com/Hotmail.com**:
   - Use your regular email and password
   - If you have 2FA enabled, you may need an App Password (see below)

3. **For Microsoft 365 (Business/Enterprise)**:
   - Use your work/school email
   - May require admin approval for SMTP access
   - Check with IT if emails don't send

4. **Generate App Password (if 2FA is enabled)**:
   - Go to https://account.microsoft.com/security
   - Sign in with your Microsoft account
   - Go to Security → Advanced security options
   - Under "App passwords", create a new app password
   - Select "Mail" and your device
   - Copy the generated password

5. **Update `.env` file**:
```env
EMAIL_ENABLED=true
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password-or-app-password
EMAIL_FROM_NAME=Vendor Management System
MANAGER_EMAIL=manager@warehouse.com
```

**Note**: For Outlook.com, you can also use:
- Host: `smtp.live.com` (alternative)
- Port: `587` or `25`
- Secure: `false` (TLS)

### Option 3: Custom SMTP Server

For other email providers (Outlook, Yahoo, custom SMTP):

```env
EMAIL_ENABLED=true
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@domain.com
EMAIL_PASSWORD=your-password
EMAIL_FROM_NAME=Vendor Management System
MANAGER_EMAIL=manager@warehouse.com
```

### Option 3: Disable Email (Default)

If you don't want to use email notifications:

```env
EMAIL_ENABLED=false
```

## Environment Variables

Add these to your `server/.env` file:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `EMAIL_ENABLED` | Enable/disable email sending | No | `false` |
| `EMAIL_SERVICE` | Email service (`gmail` or custom) | No | - |
| `SMTP_HOST` | SMTP server hostname | If custom | - |
| `SMTP_PORT` | SMTP server port | If custom | `587` |
| `SMTP_SECURE` | Use TLS/SSL | If custom | `false` |
| `EMAIL_USER` | Your email address | Yes (if enabled) | - |
| `EMAIL_PASSWORD` | Your email password/app password | Yes (if enabled) | - |
| `EMAIL_FROM_NAME` | Sender display name | No | `Vendor Management System` |
| `MANAGER_EMAIL` | Manager email for notifications | No | `manager@warehouse.com` |

## Common SMTP Settings

### Gmail
- Host: `smtp.gmail.com`
- Port: `587` (TLS) or `465` (SSL)
- Secure: `false` for 587, `true` for 465
- Requires: App Password if 2FA enabled

### Outlook.com / Hotmail.com
- Host: `smtp-mail.outlook.com` or `smtp.live.com`
- Port: `587` (recommended) or `25`
- Secure: `false` (uses STARTTLS)
- Requires: Regular password or App Password if 2FA enabled

### Microsoft 365 (Business)
- Host: `smtp.office365.com`
- Port: `587`
- Secure: `false` (uses STARTTLS)
- Requires: Work email credentials (may need IT approval)

### Yahoo
- Host: `smtp.mail.yahoo.com`
- Port: `587`
- Secure: `false`
- Requires: App Password (always required)

## Testing Email Configuration

After configuring, restart the server and submit a test request. Check:
1. Server console for email sending logs
2. Visitor's email inbox for confirmation
3. Manager's email inbox for notification

## Troubleshooting

### "Email configuration missing"
- Make sure `EMAIL_USER` and `EMAIL_PASSWORD` are set in `.env`
- Restart the server after updating `.env`

### "Authentication failed"
- For Gmail: Use App Password, not regular password
- Check if 2FA is enabled (required for App Passwords)
- Verify email and password are correct

### "Connection timeout"
- Check SMTP host and port settings
- Verify firewall isn't blocking the connection
- Try different port (587 vs 465)

### Emails not sending
- Check `EMAIL_ENABLED=true` in `.env`
- Check server console for error messages
- Verify email addresses are valid

## Security Notes

- Never commit `.env` file to version control
- Use App Passwords for Gmail (more secure)
- Consider using environment-specific email accounts for production

