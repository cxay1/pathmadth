import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Extend Request interface
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// Path to the jobs JSON file
const jobsFilePath = path.join(__dirname, '../../../src/data/jobs.json');

export const createJob = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { title, company, description, requiredSkills, benefits, salaryRange, location, jobType } = req.body;
    const employerId = req.user?.id;

    if (!employerId) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    // Read existing jobs from JSON file
    let jobs = [];
    try {
      const jobsData = fs.readFileSync(jobsFilePath, 'utf8');
      jobs = JSON.parse(jobsData);
    } catch (error) {
      console.error('Error reading jobs file:', error);
      jobs = [];
    }

    // Create new job data
    const newJob = {
      id: (jobs.length + 1).toString(),
      title,
      company,
      jobType,
      location,
      salaryRange,
      description,
      requiredSkills: requiredSkills || [],
      benefits: benefits || [],
      postedTime: "Just now",
      employer_id: employerId,
      status: 'active',
      created_at: new Date().toISOString()
    };

    // Add new job to the array
    jobs.push(newJob);

    // Write updated jobs back to JSON file
    try {
      fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2));
    } catch (error) {
      console.error('Error writing jobs file:', error);
      res.status(500).json({ message: 'Failed to save job' });
      return;
    }

    res.status(201).json({
      message: 'Job created successfully',
      job: newJob
    });
  } catch (error: any) {
    console.error('Job creation error:', error);
    res.status(500).json({ message: 'Failed to create job' });
  }
};

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    // Read jobs from JSON file
    let jobs = [];
    try {
      const jobsData = fs.readFileSync(jobsFilePath, 'utf8');
      jobs = JSON.parse(jobsData);
    } catch (error) {
      console.error('Error reading jobs file:', error);
      jobs = [];
    }

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

    // Read jobs from JSON file
    let jobs = [];
    try {
      const jobsData = fs.readFileSync(jobsFilePath, 'utf8');
      jobs = JSON.parse(jobsData);
    } catch (error) {
      console.error('Error reading jobs file:', error);
      res.status(500).json({ message: 'Failed to retrieve jobs' });
      return;
    }

    // Find the specific job
    const job = jobs.find((j: any) => j.id === id);

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

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

    // Read jobs from JSON file
    let jobs = [];
    try {
      const jobsData = fs.readFileSync(jobsFilePath, 'utf8');
      jobs = JSON.parse(jobsData);
    } catch (error) {
      console.error('Error reading jobs file:', error);
      res.status(500).json({ message: 'Failed to retrieve jobs' });
      return;
    }

    // Find and update the job
    const jobIndex = jobs.findIndex((j: any) => j.id === id);
    
    if (jobIndex === -1) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    // Check if the user is authorized to update this job
    if (jobs[jobIndex].employer_id !== employerId) {
      res.status(403).json({ message: 'Unauthorized to update this job' });
      return;
    }

    // Update the job
    jobs[jobIndex] = {
      ...jobs[jobIndex],
      ...updateData,
      updated_at: new Date().toISOString()
    };

    // Write updated jobs back to JSON file
    try {
      fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2));
    } catch (error) {
      console.error('Error writing jobs file:', error);
      res.status(500).json({ message: 'Failed to save job update' });
      return;
    }

    res.json({
      message: 'Job updated successfully',
      job: jobs[jobIndex]
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

    // Read jobs from JSON file
    let jobs = [];
    try {
      const jobsData = fs.readFileSync(jobsFilePath, 'utf8');
      jobs = JSON.parse(jobsData);
    } catch (error) {
      console.error('Error reading jobs file:', error);
      res.status(500).json({ message: 'Failed to retrieve jobs' });
      return;
    }

    // Find the job to delete
    const jobIndex = jobs.findIndex((j: any) => j.id === id);
    
    if (jobIndex === -1) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    // Check if the user is authorized to delete this job
    if (jobs[jobIndex].employer_id !== employerId) {
      res.status(403).json({ message: 'Unauthorized to delete this job' });
      return;
    }

    // Remove the job from the array
    jobs.splice(jobIndex, 1);

    // Write updated jobs back to JSON file
    try {
      fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2));
    } catch (error) {
      console.error('Error writing jobs file:', error);
      res.status(500).json({ message: 'Failed to save job deletion' });
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