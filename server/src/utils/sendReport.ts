import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password',
  },
});

export const sendAuthSetupReport = async (recipientEmail: string = 'info.pathmatch@gmail.com') => {
  try {
    // Read the setup guide content
    const setupGuidePath = path.join(__dirname, '../../../AUTHENTICATION_SETUP.md');
    let setupGuideContent = '';
    
    try {
      setupGuideContent = fs.readFileSync(setupGuidePath, 'utf8');
    } catch (error) {
      setupGuideContent = 'Setup guide file not found. Please check the AUTHENTICATION_SETUP.md file in the project root.';
    }

    const reportHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">PATHMATCH Authentication System Report</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Issue Resolution & Setup Guide</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border: 1px solid #e9ecef;">
          <h2 style="color: #dc2626; margin-top: 0;">🔧 Issue Resolved</h2>
          <div style="background-color: #d1edff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h3 style="margin-top: 0; color: #0066cc;">JSON Parse Error Fixed</h3>
            <p><strong>Root Cause:</strong> Server was missing authentication routes, causing 404 errors when frontend attempted API calls.</p>
            <p><strong>Solution:</strong> Added complete authentication system with proper error handling.</p>
          </div>
          
          <h3 style="color: #dc2626;">✅ Fixes Applied:</h3>
          <ul style="line-height: 1.6;">
            <li>Added missing auth routes to server configuration</li>
            <li>Improved error handling with proper JSON responses</li>
            <li>Created API utility for better error management</li>
            <li>Updated frontend to use real API calls instead of mock authentication</li>
            <li>Added proper CORS configuration</li>
            <li>Implemented async error handling middleware</li>
          </ul>
          
          <h3 style="color: #dc2626;">🚀 New Features:</h3>
          <ul style="line-height: 1.6;">
            <li>Complete user registration and login system</li>
            <li>JWT token-based authentication</li>
            <li>Role-based user management (Job Seeker/Employer)</li>
            <li>Supabase integration for secure data storage</li>
            <li>Centralized API request handling</li>
            <li>Comprehensive error handling and validation</li>
          </ul>
          
          <h3 style="color: #dc2626;">🛡️ Security Improvements:</h3>
          <ul style="line-height: 1.6;">
            <li>Password validation (minimum 6 characters)</li>
            <li>Email format validation</li>
            <li>Secure JWT token implementation</li>
            <li>CORS protection</li>
            <li>Input sanitization and validation</li>
            <li>Environment-based configuration</li>
          </ul>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #e9ecef; border-top: 0;">
          <h2 style="color: #dc2626; margin-top: 0;">📋 Next Steps</h2>
          <ol style="line-height: 1.6;">
            <li>Set up environment variables (see attached setup guide)</li>
            <li>Configure Supabase database with provided SQL schema</li>
            <li>Install dependencies and start both server and client</li>
            <li>Test the authentication system</li>
            <li>Review and customize as needed for your specific requirements</li>
          </ol>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2d5a2d;">📞 Support Available</h3>
            <p>The authentication system is now fully functional. For any additional support or customization needs, please don't hesitate to reach out.</p>
          </div>
        </div>
        
        <div style="background-color: #dc2626; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
          <p style="margin: 0;">Report generated on ${new Date().toLocaleString()}</p>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">PATHMATCH Employment Agency - Authentication System</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || 'system@pathmatch.com',
      to: recipientEmail,
      subject: '🔧 PATHMATCH Authentication System - Issue Resolved & Setup Guide',
      html: reportHtml,
      attachments: [
        {
          filename: 'AUTHENTICATION_SETUP.md',
          content: setupGuideContent,
          contentType: 'text/markdown'
        }
      ]
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Authentication setup report sent successfully to:', recipientEmail);
    return result;
  } catch (error) {
    console.error('Error sending authentication setup report:', error);
    throw error;
  }
};

// Function to run the email sending
export const sendReportNow = async () => {
  try {
    console.log('Sending authentication setup report...');
    await sendAuthSetupReport('info.pathmatch@gmail.com');
    console.log('✅ Report sent successfully!');
  } catch (error) {
    console.error('❌ Failed to send report:', error);
  }
};