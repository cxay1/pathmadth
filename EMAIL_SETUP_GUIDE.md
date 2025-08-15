# PATHMATCH Email Setup Guide

## Overview
This guide explains how to set up the email functionality for PATHMATCH, which sends form submissions to `info.pathmatch@gmail.com`.

## Email Configuration

### 1. Gmail Setup
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Navigate to Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

### 2. Environment Variables
Create a `.env` file in the `server` directory with the following variables:

```env
# Email Configuration
EMAIL_USER=info.pathmatch@gmail.com
EMAIL_PASSWORD=your_16_character_app_password

# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Testing Email Configuration
Run the email test script to verify your setup:

```bash
cd server
node test-email.js
```

## Form Submission Flow

### Registration Form (Auth.tsx)
- **Endpoint**: `/api/auth/register`
- **Action**: Sends registration request to `info.pathmatch@gmail.com`
- **Response**: Returns success message with user data

### Job Application Form (JobSeekers.tsx)
- **Endpoint**: `/api/applications/public`
- **Action**: 
  - Sends auto-responder email to applicant
  - Sends notification email to `info.pathmatch@gmail.com` with form data and resume attachment
- **Response**: Returns success message

## Email Templates

### Registration Email
- **To**: `info.pathmatch@gmail.com`
- **Subject**: `New User Registration: [FirstName] [LastName]`
- **Content**: User details, role, registration date

### Auto-Responder Email
- **To**: Applicant's email
- **Subject**: `PATHMATCH – Pre-Onboarding Notice for [JobTitle] Position`
- **Content**: Welcome message, role overview, next steps

### Notification Email
- **To**: `info.pathmatch@gmail.com`
- **Subject**: `New Job Application: [JobTitle] - [ApplicantName]`
- **Content**: Applicant details, cover letter, resume attachment

## Troubleshooting

### Common Issues

1. **"EAUTH" Error**
   - Check EMAIL_USER and EMAIL_PASSWORD environment variables
   - Ensure 2FA is enabled on Gmail
   - Use App Password, not regular password

2. **"JSON.parse: unexpected end of data" Error**
   - This usually indicates the server is not returning proper JSON
   - Check server logs for errors
   - Ensure all API endpoints return valid JSON responses

3. **File Upload Issues**
   - Check file size (max 5MB)
   - Ensure file type is PDF, DOC, or DOCX
   - Verify multer configuration

### Debugging Steps

1. **Check Server Logs**
   ```bash
   cd server
   npm run dev
   ```

2. **Test Email Configuration**
   ```bash
   node test-email.js
   ```

3. **Check API Health**
   ```bash
   curl http://localhost:5000/api/health
   ```

4. **Test Form Submission**
   - Open browser developer tools
   - Submit a form and check Network tab
   - Look for any error responses

## Best Practices

1. **Security**
   - Never commit `.env` files to version control
   - Use App Passwords for Gmail
   - Validate all form inputs on server side

2. **Error Handling**
   - Always return proper JSON responses
   - Log errors for debugging
   - Provide user-friendly error messages

3. **Email Management**
   - Monitor email delivery rates
   - Set up email filters in Gmail
   - Consider using email service providers for production

## Production Deployment

For production deployment, consider:

1. **Email Service Provider**
   - SendGrid
   - Mailgun
   - Amazon SES

2. **Environment Variables**
   - Set proper production values
   - Use secure password management

3. **Monitoring**
   - Set up email delivery monitoring
   - Monitor API response times
   - Log all form submissions

## Support

If you encounter issues:

1. Check the server logs for error messages
2. Verify email configuration with test script
3. Ensure all environment variables are set correctly
4. Test API endpoints individually

For additional help, contact the development team.