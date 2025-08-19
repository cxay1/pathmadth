import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASSWORD;
const emailEnabled = Boolean(username && password);

// Use real SMTP when credentials are provided; otherwise fall back to a safe
// JSON transport to avoid runtime failures in development.
const transporter = emailEnabled
  ? nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: username,
        pass: password,
      },
    })
  : nodemailer.createTransport({ jsonTransport: true });

// Role-specific responsibilities mapping
const roleResponsibilities: { [key: string]: string } = {
  'Senior Software Engineer': 'software development, code review, mentoring junior developers, and contributing to architectural decisions',
  'Marketing Manager': 'marketing strategy development, campaign management, performance analysis, and brand awareness initiatives',
  'Customer Service Agent': 'customer support, order assistance, product information, and documentation management',
  'Data Analyst': 'data analysis, report creation, business intelligence, and statistical modeling',
  'UX/UI Designer': 'user experience design, interface creation, user research, and design system development',
  'Administrative Assistant': 'administrative support, scheduling, client communications, and light research tasks',
  'Project Manager': 'project planning, team coordination, stakeholder management, and delivery oversight',
  'Sales Representative': 'client acquisition, relationship management, sales presentations, and revenue generation',
  'Content Writer': 'content creation, copywriting, SEO optimization, and editorial management',
  'HR Specialist': 'recruitment, employee relations, policy implementation, and organizational development',
  'Financial Analyst': 'financial modeling, budget analysis, reporting, and investment research',
  'Operations Manager': 'process optimization, team leadership, performance monitoring, and strategic planning',
  'Product Manager': 'product strategy, roadmap planning, stakeholder coordination, and market analysis',
  'Quality Assurance Engineer': 'testing, quality control, bug tracking, and process improvement',
  'DevOps Engineer': 'infrastructure management, deployment automation, monitoring, and system reliability',
  'Business Analyst': 'requirements gathering, process analysis, stakeholder communication, and solution design',
  'Legal Assistant': 'legal research, document preparation, case management, and administrative support',
  'Graphic Designer': 'visual design, brand identity, marketing materials, and creative direction',
  'Research Analyst': 'market research, data collection, analysis, and report generation',
  'Event Coordinator': 'event planning, vendor coordination, logistics management, and client communication'
};

// Default responsibility for unknown roles
const getDefaultResponsibility = (jobTitle: string): string => {
  return roleResponsibilities[jobTitle] || 'administrative support, scheduling, client communications, and light research tasks';
};

// Send registration email to PATHMATCH team
export const sendRegistrationEmail = async (userData: {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
}) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'info.pathmatch@gmail.com',
      to: 'info.pathmatch@gmail.com',
      subject: `New User Registration: ${userData.firstName} ${userData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #dc2626;">New User Registration Request</h2>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>User Details:</h3>
            <p><strong>Name:</strong> ${userData.firstName} ${userData.lastName}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Role:</strong> ${userData.role}</p>
            <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>A new user has requested to register for PATHMATCH. Please review their information and take appropriate action.</p>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h4>Next Steps:</h4>
            <ul>
              <li>Review the user's information</li>
              <li>Contact the user if additional information is needed</li>
              <li>Approve or reject the registration request</li>
              <li>Send welcome email if approved</li>
            </ul>
          </div>
        </div>
      `,
      text: `
New User Registration Request

User Details:
- Name: ${userData.firstName} ${userData.lastName}
- Email: ${userData.email}
- Role: ${userData.role}
- Registration Date: ${new Date().toLocaleDateString()}

A new user has requested to register for PATHMATCH. Please review their information and take appropriate action.

Next Steps:
- Review the user's information
- Contact the user if additional information is needed
- Approve or reject the registration request
- Send welcome email if approved
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw error;
  }
};

// Generate auto-responder email content
export const generateAutoResponderEmail = (jobTitle: string, applicantName: string, applicantEmail: string) => {
  const responsibilities = getDefaultResponsibility(jobTitle);
  
  return {
    subject: `PATHMATCH – Pre-Onboarding Notice for ${jobTitle} Position`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #dc2626; margin: 0; font-size: 24px;">PATHMATCH – Pre-Onboarding Notice</h1>
        </div>
        
        <p>Dear ${applicantName},</p>
        
        <p>Welcome to PATHMATCH.</p>
        
        <p>We're excited about the possibility of working with you as a <strong>${jobTitle}</strong>. Before onboarding begins, please note the following:</p>
        
        <ol style="line-height: 1.6;">
          <li><strong>Role Overview</strong> – You will be responsible for ${responsibilities}.</li>
          
          <li><strong>Required Tools</strong> – Ensure you have access to a reliable internet connection, a working computer, and the agreed-upon communication platforms (e.g., email, Slack, Zoom).</li>
          
          <li><strong>Confidentiality</strong> – All client and company information must remain strictly confidential. You will be required to sign a Non-Disclosure Agreement (NDA).</li>
          
          <li><strong>Onboarding Schedule</strong> – Your formal onboarding session will be scheduled once your documentation is verified.</li>
          
          <li><strong>Next Steps</strong> – Please confirm your readiness and availability within 48 hours to secure your spot.</li>
        </ol>
        
        <p>We look forward to building a productive and professional partnership.</p>
        
        <p style="margin-top: 30px;">
          <strong>PATHMATCH Recruitment Team</strong><br>
          <a href="mailto:info.pathmatch@gmail.com" style="color: #dc2626;">info.pathmatch@gmail.com</a>
        </p>
      </div>
    `,
    text: `
PATHMATCH – Pre-Onboarding Notice

Dear ${applicantName},

Welcome to PATHMATCH.

We're excited about the possibility of working with you as a ${jobTitle}. Before onboarding begins, please note the following:

1. Role Overview – You will be responsible for ${responsibilities}.

2. Required Tools – Ensure you have access to a reliable internet connection, a working computer, and the agreed-upon communication platforms (e.g., email, Slack, Zoom).

3. Confidentiality – All client and company information must remain strictly confidential. You will be required to sign a Non-Disclosure Agreement (NDA).

4. Onboarding Schedule – Your formal onboarding session will be scheduled once your documentation is verified.

5. Next Steps – Please confirm your readiness and availability within 48 hours to secure your spot.

We look forward to building a productive and professional partnership.

PATHMATCH Recruitment Team
info.pathmatch@gmail.com
    `
  };
};

// Send auto-responder email
export const sendAutoResponderEmail = async (
  applicantEmail: string,
  applicantName: string,
  jobTitle: string
) => {
  try {
    const emailContent = generateAutoResponderEmail(jobTitle, applicantName, applicantEmail);
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'info.pathmatch@gmail.com',
      to: applicantEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Auto-responder email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending auto-responder email:', error);
    throw error;
  }
};

// Send notification email to PATHMATCH team
export const sendNotificationEmail = async (
  applicantName: string,
  applicantEmail: string,
  jobTitle: string,
  coverLetter?: string,
  resumeFile?: Express.Multer.File
) => {
  try {
    const mailOptions: any = {
      from: process.env.EMAIL_USER || 'info.pathmatch@gmail.com',
      to: 'info.pathmatch@gmail.com',
      subject: `New Job Application: ${jobTitle} - ${applicantName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #dc2626;">New Job Application Received</h2>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Applicant Details:</h3>
            <p><strong>Name:</strong> ${applicantName}</p>
            <p><strong>Email:</strong> ${applicantEmail}</p>
            <p><strong>Position:</strong> ${jobTitle}</p>
            <p><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</p>
            ${resumeFile ? `<p><strong>Resume:</strong> ${resumeFile.originalname} (${(resumeFile.size / 1024).toFixed(2)} KB)</p>` : ''}
          </div>
          
          ${coverLetter ? `
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Cover Letter:</h3>
            <p style="white-space: pre-wrap;">${coverLetter}</p>
          </div>
          ` : ''}
          
          <p>Please review this application and take appropriate action.</p>
        </div>
      `,
    };

    // Add resume file as attachment if provided
    if (resumeFile) {
      mailOptions.attachments = [{
        filename: resumeFile.originalname,
        content: resumeFile.buffer,
        contentType: resumeFile.mimetype
      }];
    }

    const result = await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
}; 

// Send onboarding details to PATHMATCH team (EMAIL_USER)
export const sendOnboardingEmail = async (payload: {
  email: string;
  firstName?: string;
  middle?: string;
  lastName?: string;
  suffix?: string;
  preferred?: string;
  dob: string;
  state: string;
}) => {
  try {
    const fullName = [payload.firstName, payload.middle, payload.lastName, payload.suffix]
      .filter(Boolean)
      .join(' ');
    const mailOptions = {
      from: process.env.EMAIL_USER || 'info.pathmatch@gmail.com',
      to: process.env.EMAIL_USER || 'info.pathmatch@gmail.com',
      subject: `New Onboarding Details Received: ${fullName || payload.email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #dc2626;">New Onboarding Submission</h2>
          <p>Here are the onboarding details submitted by a user:</p>
          <ul>
            <li><strong>Email:</strong> ${payload.email}</li>
            <li><strong>Name:</strong> ${fullName || 'N/A'}</li>
            <li><strong>Preferred:</strong> ${payload.preferred || 'N/A'}</li>
            <li><strong>Date of Birth:</strong> ${payload.dob}</li>
            <li><strong>State:</strong> ${payload.state}</li>
          </ul>
          <p style="color:#6b7280;font-size:12px;">Sent automatically by PATHMATCH onboarding.</p>
        </div>
      `,
      text: `New Onboarding Submission\n\nEmail: ${payload.email}\nName: ${fullName || 'N/A'}\nPreferred: ${payload.preferred || 'N/A'}\nDOB: ${payload.dob}\nState: ${payload.state}`,
    } as any;

    const result = await transporter.sendMail(mailOptions);
    console.log('Onboarding email sent successfully:', result.messageId || result);
    return result;
  } catch (error) {
    console.error('Error sending onboarding email:', error);
    throw error;
  }
};