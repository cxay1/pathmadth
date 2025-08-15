import { Request, Response } from 'express';

// Extend Request interface
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const createJob = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { title, description, requirements, salary, location, jobType } = req.body;
    const employerId = req.user?.id;

    if (!employerId) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    // Create mock job data
    const jobData = {
      id: Date.now().toString(),
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      employer_id: employerId,
      created_at: new Date().toISOString(),
      status: 'active'
    };

    res.status(201).json({
      message: 'Job created successfully',
      job: jobData
    });
  } catch (error: any) {
    console.error('Job creation error:', error);
    res.status(500).json({ message: 'Failed to create job' });
  }
};

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
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
        employer_id: 'employer-1',
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

export const getJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Return mock job data
    const job = {
      id,
      title: 'Senior Software Engineer',
      description: 'We are seeking a talented Senior Software Engineer...',
      requirements: ['React', 'Node.js', 'TypeScript'],
      salary: '$80,000 - $120,000',
      location: 'Remote',
      jobType: 'Full-time',
      employer_id: 'employer-1',
      created_at: new Date().toISOString(),
      status: 'active'
    };

    res.json({
      message: 'Job retrieved successfully',
      job
    });
  } catch (error: any) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Failed to retrieve job' });
  }
};

export const updateJob = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const employerId = req.user?.id;

    if (!employerId) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    // Return mock updated job data
    const updatedJob = {
      id,
      ...updateData,
      employer_id: employerId,
      updated_at: new Date().toISOString()
    };

    res.json({
      message: 'Job updated successfully',
      job: updatedJob
    });
  } catch (error: any) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Failed to update job' });
  }
};

export const deleteJob = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const employerId = req.user?.id;

    if (!employerId) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    res.json({
      message: 'Job deleted successfully',
      jobId: id
    });
  } catch (error: any) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Failed to delete job' });
  }
};