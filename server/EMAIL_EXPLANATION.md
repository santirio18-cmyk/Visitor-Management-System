# Email Configuration - Which Email IDs to Set Up

## Overview

There are **3 different email addresses** used in the system:

### 1. EMAIL_USER (Required - Sender Email)
**This is the email account that SENDS all emails**

- **Purpose**: This is your email account that will send notifications to visitors and managers
- **What to set**: Your Gmail (or other email) address
- **Example**: `yourcompany@gmail.com` or `noreply@yourcompany.com`
- **Configuration**: You need the email address AND password/app password

**This is the MAIN email you need to configure!**

### 2. MANAGER_EMAIL (Optional - Recipient)
**This is where new request notifications are sent**

- **Purpose**: When a visitor submits a request, the manager gets notified at this email
- **What to set**: The warehouse manager's email address
- **Example**: `manager@warehouse.com` or `warehouse.manager@company.com`
- **Default**: `manager@warehouse.com` (if not set)

**Note**: This can be the same as EMAIL_USER or different

### 3. Visitor Email (From Form)
**This comes from the visitor's form submission**

- **Purpose**: Where confirmation and status update emails are sent to visitors
- **What to set**: Nothing! Visitors enter their own email in the form
- **Example**: Visitor enters `john@vendor.com` in the form

## Quick Setup Guide

### For Gmail (Easiest)

1. **Choose ONE Gmail account** to send emails from:
   - This will be your `EMAIL_USER`
   - Example: `yourcompany@gmail.com`

2. **Set up App Password**:
   - Go to Google Account → Security
   - Enable 2-Factor Authentication
   - Generate App Password for "Mail"
   - Copy the 16-character password

3. **Update `.env` file**:
```env
EMAIL_ENABLED=true
EMAIL_SERVICE=gmail
EMAIL_USER=yourcompany@gmail.com          # ← Your Gmail address
EMAIL_PASSWORD=abcd efgh ijkl mnop       # ← Your App Password (16 chars)
EMAIL_FROM_NAME=Vendor Management System
MANAGER_EMAIL=manager@warehouse.com      # ← Manager's email (can be same or different)
```

### Example Scenarios

#### Scenario 1: Single Email Account
You use one Gmail for everything:
```env
EMAIL_USER=warehouse@gmail.com           # Sends all emails
EMAIL_PASSWORD=your-app-password
MANAGER_EMAIL=warehouse@gmail.com        # Also receives manager notifications
```

#### Scenario 2: Separate Accounts
Different emails for sending and receiving:
```env
EMAIL_USER=noreply@company.com           # Sends all emails
EMAIL_PASSWORD=your-app-password
MANAGER_EMAIL=manager@company.com        # Receives manager notifications
```

#### Scenario 3: Company Email
Using company email server:
```env
EMAIL_USER=noreply@yourcompany.com       # Sends all emails
EMAIL_PASSWORD=your-email-password
SMTP_HOST=smtp.yourcompany.com
SMTP_PORT=587
MANAGER_EMAIL=warehouse.manager@yourcompany.com
```

## Email Flow

```
Visitor submits form
    ↓
System sends email FROM: EMAIL_USER
    ↓
TO: visitor@example.com (from form)     ← Confirmation email
TO: MANAGER_EMAIL                        ← New request notification

Manager approves/rejects
    ↓
System sends email FROM: EMAIL_USER
    ↓
TO: visitor@example.com                 ← Approval/rejection email
```

## Important Notes

1. **EMAIL_USER is the sender** - This account needs SMTP access
2. **MANAGER_EMAIL is a recipient** - Just needs to be a valid email address
3. **Visitor emails come from the form** - No configuration needed
4. **You only need to configure EMAIL_USER credentials** - The password/app password

## Testing

After setup, test by:
1. Submitting a test request
2. Check visitor's email (from form) - should receive confirmation
3. Check MANAGER_EMAIL - should receive new request notification
4. Approve/reject the request
5. Check visitor's email again - should receive status update

## Common Questions

**Q: Can I use my personal Gmail?**
A: Yes! Just use your Gmail as EMAIL_USER and generate an App Password.

**Q: Do I need a separate email for MANAGER_EMAIL?**
A: No, it can be the same as EMAIL_USER or different.

**Q: What if I don't have a company email?**
A: Use Gmail! It's the easiest to set up.

**Q: Can visitors use any email?**
A: Yes, visitors enter their own email in the form.





