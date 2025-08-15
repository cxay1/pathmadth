const nodemailer = require('nodemailer');
require('dotenv').config();

// Test email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'info.pathmatch@gmail.com',
    pass: process.env.EMAIL_PASSWORD || '',
  },
});

async function testEmail() {
  try {
    console.log('Testing email configuration...');
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Password:', process.env.EMAIL_PASSWORD ? '***' : 'NOT SET');

    const mailOptions = {
      from: process.env.EMAIL_USER || 'info.pathmatch@gmail.com',
      to: 'info.pathmatch@gmail.com',
      subject: 'PATHMATCH - Email Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #dc2626;">Email Test Successful</h2>
          <p>This is a test email to verify that the PATHMATCH email system is working correctly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p>If you receive this email, the email configuration is working properly.</p>
        </div>
      `,
      text: `
Email Test Successful

This is a test email to verify that the PATHMATCH email system is working correctly.

Timestamp: ${new Date().toLocaleString()}

If you receive this email, the email configuration is working properly.
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Response:', result.response);
  } catch (error) {
    console.error('❌ Email test failed:');
    console.error('Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.error('\n🔧 Troubleshooting:');
      console.error('1. Check your EMAIL_USER and EMAIL_PASSWORD environment variables');
      console.error('2. Make sure you have 2-factor authentication enabled on your Gmail account');
      console.error('3. Generate an App Password in your Google Account settings');
      console.error('4. Use the App Password instead of your regular password');
    }
  }
}

testEmail(); 