import { Request, Response } from 'express';

// Extend Request interface
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const getEmployerProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const employerId = req.user?.id;

    if (!employerId) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    // Return mock profile data
    const profile = {
      id: employerId,
      company_name: 'TechCorp Solutions',
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@techcorp.com',
      phone: '+1234567890',
      company_size: '50-100',
      industry: 'Technology',
      location: 'San Francisco, CA',
      created_at: new Date().toISOString()
    };

    res.json({
      message: 'Profile retrieved successfully',
      profile
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to retrieve profile' });
  }
};

export const updateEmployerProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const employerId = req.user?.id;
    const updateData = req.body;

    if (!employerId) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    // Return mock updated profile data
    const updatedProfile = {
      id: employerId,
      ...updateData,
      updated_at: new Date().toISOString()
    };

    res.json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

export const getEmployerJobs = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Verify user owns this profile
    if (req.user?.id !== id) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    // Return mock jobs data
    const jobs = [
      {
        id: '1',
        title: 'Senior Software Engineer',
        description: 'We are seeking a talented Senior Software Engineer...',
        requirements: ['React', 'Node.js', 'TypeScript'],
        salary: '$80,000 - $120,000',
        location: 'Remote',
        jobType: 'Full-time',
        employer_id: id,
        created_at: new Date().toISOString(),
        status: 'active'
      }
    ];

    res.json({
      message: 'Jobs retrieved successfully',
      jobs
    });
  } catch (error: any) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Failed to retrieve jobs' });
  }
};

export const getJobApplications = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id, jobId } = req.params;

    // Verify user owns this profile
    if (req.user?.id !== id) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    // Return mock applications data
    const applications = [
      {
        id: '1',
        job_id: jobId,
        job_seeker_id: 'seeker-1',
        cover_letter: 'I am excited to apply for this position...',
        status: 'submitted',
        created_at: new Date().toISOString(),
        job_seekers: {
          profiles: {
            first_name: 'John',
            last_name: 'Doe',
            avatar_url: null
          }
        }
      }
    ];

    res.json({
      message: 'Applications retrieved successfully',
      applications
    });
  } catch (error: any) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Failed to retrieve applications' });
  }
};