const nodemailer = require('nodemailer');
const { format, parseISO } = require('date-fns');

// Create transporter based on environment variables
const createTransporter = () => {
  // For Gmail
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // Use App Password for Gmail
      }
    });
  }

  // For custom SMTP
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Email templates
const getRequestSubmittedTemplate = (request) => {
  const visitDate = format(parseISO(request.visit_date), 'MMMM dd, yyyy');
  return {
    subject: `Visit Request Submitted - Request #${request.id}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .info-row { margin: 10px 0; }
            .label { font-weight: bold; color: #667eea; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Visit Request Submitted</h2>
            </div>
            <div class="content">
              <p>Dear ${request.visitor_name},</p>
              <p>Your visit request has been successfully submitted and is pending approval from the warehouse manager.</p>
              
              <h3>Request Details:</h3>
              <div class="info-row"><span class="label">Request ID:</span> #${request.id}</div>
              <div class="info-row"><span class="label">Visit Date:</span> ${visitDate}</div>
              <div class="info-row"><span class="label">Company:</span> ${request.company_name}</div>
              <div class="info-row"><span class="label">Purpose:</span> ${request.purpose}</div>
              <div class="info-row"><span class="label">Number of Visitors:</span> ${request.number_of_visitors}</div>
              ${request.coming_from ? `<div class="info-row"><span class="label">Coming From:</span> ${request.coming_from}</div>` : ''}
              
              <p style="margin-top: 20px;">You will receive another email once the warehouse manager reviews your request.</p>
              
              <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Visit Request Submitted - Request #${request.id}
      
      Dear ${request.visitor_name},
      
      Your visit request has been successfully submitted and is pending approval.
      
      Request Details:
      - Request ID: #${request.id}
      - Visit Date: ${visitDate}
      - Company: ${request.company_name}
      - Purpose: ${request.purpose}
      - Number of Visitors: ${request.number_of_visitors}
      ${request.coming_from ? `- Coming From: ${request.coming_from}` : ''}
      
      You will receive another email once the warehouse manager reviews your request.
    `
  };
};

const getRequestApprovedTemplate = (request) => {
  const visitDate = format(parseISO(request.visit_date), 'MMMM dd, yyyy');
  return {
    subject: `Visit Request Approved - Request #${request.id}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #28a745; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .info-row { margin: 10px 0; }
            .label { font-weight: bold; color: #28a745; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .approved-badge { background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>✓ Visit Request Approved</h2>
            </div>
            <div class="content">
              <p>Dear ${request.visitor_name},</p>
              
              <div class="approved-badge">
                <strong>Your visit request has been APPROVED!</strong>
              </div>
              
              <h3>Visit Details:</h3>
              <div class="info-row"><span class="label">Request ID:</span> #${request.id}</div>
              <div class="info-row"><span class="label">Visit Date:</span> ${visitDate}</div>
              <div class="info-row"><span class="label">Company:</span> ${request.company_name}</div>
              <div class="info-row"><span class="label">Purpose:</span> ${request.purpose}</div>
              <div class="info-row"><span class="label">Number of Visitors:</span> ${request.number_of_visitors}</div>
              ${request.coming_from ? `<div class="info-row"><span class="label">Coming From:</span> ${request.coming_from}</div>` : ''}
              ${request.manager_notes ? `<div class="info-row"><span class="label">Manager Notes:</span> ${request.manager_notes}</div>` : ''}
              
              <p style="margin-top: 20px;"><strong>Please arrive on time for your scheduled visit.</strong></p>
              
              <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Visit Request Approved - Request #${request.id}
      
      Dear ${request.visitor_name},
      
      Your visit request has been APPROVED!
      
      Visit Details:
      - Request ID: #${request.id}
      - Visit Date: ${visitDate}
      - Company: ${request.company_name}
      - Purpose: ${request.purpose}
      - Number of Visitors: ${request.number_of_visitors}
      ${request.coming_from ? `- Coming From: ${request.coming_from}` : ''}
      ${request.manager_notes ? `- Manager Notes: ${request.manager_notes}` : ''}
      
      Please arrive on time for your scheduled visit.
    `
  };
};

const getRequestRejectedTemplate = (request) => {
  const visitDate = format(parseISO(request.visit_date), 'MMMM dd, yyyy');
  return {
    subject: `Visit Request Rejected - Request #${request.id}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .info-row { margin: 10px 0; }
            .label { font-weight: bold; color: #dc3545; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .rejected-badge { background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>✗ Visit Request Rejected</h2>
            </div>
            <div class="content">
              <p>Dear ${request.visitor_name},</p>
              
              <div class="rejected-badge">
                <strong>Unfortunately, your visit request has been REJECTED.</strong>
              </div>
              
              <h3>Request Details:</h3>
              <div class="info-row"><span class="label">Request ID:</span> #${request.id}</div>
              <div class="info-row"><span class="label">Visit Date:</span> ${visitDate}</div>
              <div class="info-row"><span class="label">Company:</span> ${request.company_name}</div>
              <div class="info-row"><span class="label">Purpose:</span> ${request.purpose}</div>
              ${request.manager_notes ? `<div class="info-row"><span class="label">Reason:</span> ${request.manager_notes}</div>` : ''}
              
              <p style="margin-top: 20px;">If you have any questions, please contact the warehouse manager.</p>
              
              <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Visit Request Rejected - Request #${request.id}
      
      Dear ${request.visitor_name},
      
      Unfortunately, your visit request has been REJECTED.
      
      Request Details:
      - Request ID: #${request.id}
      - Visit Date: ${visitDate}
      - Company: ${request.company_name}
      - Purpose: ${request.purpose}
      ${request.manager_notes ? `- Reason: ${request.manager_notes}` : ''}
      
      If you have any questions, please contact the warehouse manager.
    `
  };
};

const getNewRequestNotificationTemplate = (request) => {
  const visitDate = format(parseISO(request.visit_date), 'MMMM dd, yyyy');
  return {
    subject: `New Visit Request - Request #${request.id}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ffc107; color: #333; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .info-row { margin: 10px 0; }
            .label { font-weight: bold; color: #ffc107; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Visit Request Pending Review</h2>
            </div>
            <div class="content">
              <p>Dear Warehouse Manager,</p>
              <p>A new visit request has been submitted and requires your review.</p>
              
              <h3>Request Details:</h3>
              <div class="info-row"><span class="label">Request ID:</span> #${request.id}</div>
              <div class="info-row"><span class="label">Visitor Name:</span> ${request.visitor_name}</div>
              <div class="info-row"><span class="label">Email:</span> ${request.visitor_email}</div>
              <div class="info-row"><span class="label">Visit Date:</span> ${visitDate}</div>
              <div class="info-row"><span class="label">Company:</span> ${request.company_name}</div>
              <div class="info-row"><span class="label">Contact:</span> ${request.contact_number}</div>
              <div class="info-row"><span class="label">Purpose:</span> ${request.purpose}</div>
              <div class="info-row"><span class="label">Number of Visitors:</span> ${request.number_of_visitors}</div>
              ${request.coming_from ? `<div class="info-row"><span class="label">Coming From:</span> ${request.coming_from}</div>` : ''}
              ${request.additional_visitor_names ? `<div class="info-row"><span class="label">Additional Visitors:</span> ${request.additional_visitor_names}</div>` : ''}
              
              <p style="margin-top: 20px;">Please log in to the dashboard to review and approve/reject this request.</p>
              
              <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      New Visit Request - Request #${request.id}
      
      Dear Warehouse Manager,
      
      A new visit request has been submitted and requires your review.
      
      Request Details:
      - Request ID: #${request.id}
      - Visitor Name: ${request.visitor_name}
      - Email: ${request.visitor_email}
      - Visit Date: ${visitDate}
      - Company: ${request.company_name}
      - Contact: ${request.contact_number}
      - Purpose: ${request.purpose}
      - Number of Visitors: ${request.number_of_visitors}
      ${request.coming_from ? `- Coming From: ${request.coming_from}` : ''}
      ${request.additional_visitor_names ? `- Additional Visitors: ${request.additional_visitor_names}` : ''}
      
      Please log in to the dashboard to review and approve/reject this request.
    `
  };
};

// Send email function
const sendEmail = async (to, subject, html, text) => {
  // Check if email is enabled
  if (process.env.EMAIL_ENABLED !== 'true') {
    console.log('Email is disabled. Email would have been sent to:', to);
    return { success: false, message: 'Email is disabled' };
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('Email configuration missing. Please set EMAIL_USER and EMAIL_PASSWORD in .env file');
    return { success: false, message: 'Email configuration missing' };
  }

  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Vendor Management System'}" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
      text: text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Public functions
const sendRequestSubmittedEmail = async (request) => {
  if (!request.visitor_email) return { success: false, message: 'No email address' };
  
  const template = getRequestSubmittedTemplate(request);
  return await sendEmail(request.visitor_email, template.subject, template.html, template.text);
};

const sendRequestApprovedEmail = async (request) => {
  if (!request.visitor_email) return { success: false, message: 'No email address' };
  
  const template = getRequestApprovedTemplate(request);
  return await sendEmail(request.visitor_email, template.subject, template.html, template.text);
};

const sendRequestRejectedEmail = async (request) => {
  if (!request.visitor_email) return { success: false, message: 'No email address' };
  
  const template = getRequestRejectedTemplate(request);
  return await sendEmail(request.visitor_email, template.subject, template.html, template.text);
};

const getThirdLevelNotificationTemplate = (request) => {
  const visitDate = format(parseISO(request.visit_date), 'MMMM dd, yyyy');
  return {
    subject: `Visit Request Pending Third Level Approval - Request #${request.id}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #17a2b8; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .info-row { margin: 10px 0; }
            .label { font-weight: bold; color: #17a2b8; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Visit Request Pending Third Level Approval</h2>
            </div>
            <div class="content">
              <p>Dear Third Level Approver,</p>
              <p>A visit request has been passed to you for third level approval.</p>
              
              <h3>Request Details:</h3>
              <div class="info-row"><span class="label">Request ID:</span> #${request.id}</div>
              <div class="info-row"><span class="label">Visitor Name:</span> ${request.visitor_name}</div>
              <div class="info-row"><span class="label">Email:</span> ${request.visitor_email}</div>
              <div class="info-row"><span class="label">Visit Date:</span> ${visitDate}</div>
              <div class="info-row"><span class="label">Company:</span> ${request.company_name}</div>
              <div class="info-row"><span class="label">Contact:</span> ${request.contact_number}</div>
              <div class="info-row"><span class="label">Purpose:</span> ${request.purpose}</div>
              <div class="info-row"><span class="label">Number of Visitors:</span> ${request.number_of_visitors}</div>
              ${request.coming_from ? `<div class="info-row"><span class="label">Coming From:</span> ${request.coming_from}</div>` : ''}
              ${request.second_level_notes ? `<div class="info-row"><span class="label">Second Level Notes:</span> ${request.second_level_notes}</div>` : ''}
              
              <p style="margin-top: 20px;">Please log in to the dashboard to review and approve/reject this request.</p>
              
              <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Visit Request Pending Third Level Approval - Request #${request.id}
      
      Dear Third Level Approver,
      
      A visit request has been passed to you for third level approval.
      
      Request Details:
      - Request ID: #${request.id}
      - Visitor Name: ${request.visitor_name}
      - Email: ${request.visitor_email}
      - Visit Date: ${visitDate}
      - Company: ${request.company_name}
      - Contact: ${request.contact_number}
      - Purpose: ${request.purpose}
      - Number of Visitors: ${request.number_of_visitors}
      ${request.coming_from ? `- Coming From: ${request.coming_from}` : ''}
      ${request.second_level_notes ? `- Second Level Notes: ${request.second_level_notes}` : ''}
      
      Please log in to the dashboard to review and approve/reject this request.
    `
  };
};

const sendNewRequestNotificationEmail = async (request) => {
  const managerEmail = process.env.MANAGER_EMAIL || 'manager@warehouse.com';
  const template = getNewRequestNotificationTemplate(request);
  return await sendEmail(managerEmail, template.subject, template.html, template.text);
};

const sendThirdLevelNotificationEmail = async (request) => {
  // Get third level approver email from request or use default
  const thirdLevelApproverEmail = request.third_level_approver_email || process.env.THIRD_LEVEL_APPROVER_EMAIL || 'bharath.chandrasekaran@tvs.in';
  const template = getThirdLevelNotificationTemplate(request);
  return await sendEmail(thirdLevelApproverEmail, template.subject, template.html, template.text);
};

module.exports = {
  sendRequestSubmittedEmail,
  sendRequestApprovedEmail,
  sendRequestRejectedEmail,
  sendNewRequestNotificationEmail,
  sendThirdLevelNotificationEmail
};


