import { Request, Response } from 'express';
import { supabase } from '../config/db';
import { sendAutoResponderEmail, sendNotificationEmail } from '../services/email.service';

export const submitPublicApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { job_title, applicant_name, applicant_email, cover_letter, phone } = req.body;
    const resumeFile: Express.Multer.File | undefined = req.file;

    // Validate required fields
    if (!applicant_name || !applicant_email || !job_title) {
      res.status(400).json({ message: 'Name, email, and job title are required' });
      return;
    }

    // Create a temporary job record or use a default job ID for public applications
    const tempJobId = 'public-application-' + Date.now();

    // Store application details (you might want to create a separate table for public applications)
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

    // For now, we'll just send emails. In a real implementation, you'd store this in a database
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
    res.status(400).json({ message: error.message });
  }
};

export const submitApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { job_id, cover_letter, applicant_name, applicant_email, job_title } = req.body;
    const jobSeekerId = req.user?.id;

    if (!jobSeekerId) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    // Insert application into database
    const { data, error } = await supabase
      .from('applications')
      .insert([{
        job_id,
        job_seeker_id: jobSeekerId,
        cover_letter,
      }])
      .select()
      .single();

    if (error) throw error;

    // Send auto-responder email to applicant
    try {
      await sendAutoResponderEmail(
        applicant_email,
        applicant_name,
        job_title
      );
    } catch (emailError) {
      console.error('Failed to send auto-responder email:', emailError);
      // Don't fail the application submission if email fails
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
      // Don't fail the application submission if email fails
    }

    res.status(201).json({
      ...data,
      message: 'Application submitted successfully. Check your email for confirmation.'
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // First get the application to check permissions
    const { data: application, error: appError } = await supabase
      .from('applications')
      .select('jobs(employer_id)')
      .eq('id', id)
      .single();

    if (appError) throw appError;

    // Verify the requesting user is the employer who owns the job
    const jobData = application.jobs as any;
    if (req.user?.id !== jobData.employer_id) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};