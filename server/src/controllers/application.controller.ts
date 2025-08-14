import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/db';
import { sendAutoResponderEmail, sendNotificationEmail } from '../services/email.service';

// Simple async wrapper without complex types
const asyncWrapper = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const submitPublicApplication = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { job_title, applicant_name, applicant_email, cover_letter, phone } = req.body;
    const resumeFile = req.file;

    // Validate required fields
    if (!applicant_name || !applicant_email || !job_title) {
      res.status(400).json({ message: 'Name, email, and job title are required' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicant_email)) {
      res.status(400).json({ message: 'Invalid email format' });
      return;
    }

    // Create application data
    const applicationData = {
      job_title,
      applicant_name,
      applicant_email,
      cover_letter,
      phone,
      resume_uploaded: !!resumeFile,
      resume_filename: resumeFile?.originalname,
      submitted_at: new Date().toISOString(),
      status: 'submitted'
    };

    console.log('Public application received:', applicationData);

    // Send auto-responder email to applicant
    try {
      await sendAutoResponderEmail(
        applicant_email,
        applicant_name,
        job_title
      );
    } catch (emailError) {
      console.error('Failed to send auto-responder email:', emailError);
    }

    // Send notification email to PATHMATCH team
    try {
      await sendNotificationEmail(
        applicant_name,
        applicant_email,
        job_title,
        cover_letter,
        resumeFile
      );
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
    }

    res.status(201).json({
      message: 'Application submitted successfully. Check your email for confirmation.',
      application: applicationData
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to submit application' });
  }
});

export const submitApplication = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { job_id, cover_letter, applicant_name, applicant_email, job_title } = req.body;
    const jobSeekerId = req.user?.id;

    // Validate required fields
    if (!job_id || !cover_letter) {
      res.status(400).json({ message: 'Job ID and cover letter are required' });
      return;
    }

    if (!jobSeekerId) {
      res.status(403).json({ message: 'Unauthorized - Job seeker access required' });
      return;
    }

    // Insert application into database
    const { data, error } = await supabase
      .from('applications')
      .insert([{
        job_id,
        job_seeker_id: jobSeekerId,
        cover_letter,
        status: 'submitted',
        submitted_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    // Send auto-responder email to applicant (if email provided)
    if (applicant_email && applicant_name && job_title) {
      try {
        await sendAutoResponderEmail(
          applicant_email,
          applicant_name,
          job_title
        );
      } catch (emailError) {
        console.error('Failed to send auto-responder email:', emailError);
      }

      // Send notification email to PATHMATCH team
      try {
        await sendNotificationEmail(
          applicant_name,
          applicant_email,
          job_title,
          cover_letter
        );
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
      }
    }

    res.status(201).json({
      message: 'Application submitted successfully. Check your email for confirmation.',
      application: data
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to submit application' });
  }
});

export const updateApplicationStatus = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate input
    if (!id) {
      res.status(400).json({ message: 'Application ID is required' });
      return;
    }

    if (!status) {
      res.status(400).json({ message: 'Status is required' });
      return;
    }

    const validStatuses = ['submitted', 'reviewed', 'interviewed', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: 'Invalid status value' });
      return;
    }

    // First get the application to check permissions
    const { data: application, error: appError } = await supabase
      .from('applications')
      .select('jobs(employer_id)')
      .eq('id', id)
      .single();

    if (appError) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    // Verify the requesting user is the employer who owns the job
    const jobData = application.jobs as any;
    if (req.user?.id !== jobData.employer_id) {
      res.status(403).json({ message: 'Unauthorized - You can only update applications for your own jobs' });
      return;
    }

    const { data, error } = await supabase
      .from('applications')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    res.json({
      message: 'Application status updated successfully',
      application: data
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to update application status' });
  }
});