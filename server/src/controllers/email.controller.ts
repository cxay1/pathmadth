import { Request, Response, NextFunction } from 'express';
import { sendAutoResponderEmail, sendNotificationEmail } from '../services/email.service';

// Simple async wrapper
const asyncWrapper = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const sendContactEmail = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message, subject } = req.body;

    console.log('Contact form submission received:', { name, email, subject });

    // Validate required fields
    if (!name || !email || !message) {
      res.status(400).json({ 
        success: false,
        message: 'Name, email, and message are required' 
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ 
        success: false,
        message: 'Invalid email format' 
      });
      return;
    }

    // Send email to info.pathmatch@gmail.com
    try {
      await sendNotificationEmail(
        name,
        email,
        subject || 'Contact Form Submission',
        message
      );
      
      console.log('Contact email sent successfully');
    } catch (emailError) {
      console.error('Failed to send contact email:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

export const sendJobApplicationEmail = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  try {
    const { job_title, applicant_name, applicant_email, cover_letter, phone } = req.body;
    const resumeFile: Express.Multer.File | undefined = req.file;

    console.log('Job application received:', { 
      job_title, 
      applicant_name, 
      applicant_email, 
      phone,
      hasResume: !!resumeFile 
    });

    // Validate required fields
    if (!applicant_name || !applicant_email || !job_title) {
      res.status(400).json({ 
        success: false,
        message: 'Name, email, and job title are required' 
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicant_email)) {
      res.status(400).json({ 
        success: false,
        message: 'Invalid email format' 
      });
      return;
    }

    try {
      // Send auto-responder email to applicant
      await sendAutoResponderEmail(
        applicant_email,
        applicant_name,
        job_title
      );

      // Send notification email to PATHMATCH team
      await sendNotificationEmail(
        applicant_name,
        applicant_email,
        job_title,
        cover_letter || 'No cover letter provided',
        resumeFile
      );

      console.log('Job application emails sent successfully');
    } catch (emailError) {
      console.error('Failed to send job application emails:', emailError);
      // Don't fail the request if email sending fails
    }

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully! Check your email for confirmation.',
      application: {
        job_title,
        applicant_name,
        applicant_email,
        phone,
        cover_letter,
        resume_uploaded: !!resumeFile,
        resume_filename: resumeFile?.originalname,
        submitted_at: new Date().toISOString(),
        status: 'submitted'
      }
    });
  } catch (error: any) {
    console.error('Job application error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to submit application. Please try again later.' 
    });
  }
});