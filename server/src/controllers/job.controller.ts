import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/db';

// Simple async wrapper without complex types
const asyncWrapper = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const getAllJobs = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { type, location, limit = 10, offset = 0 } = req.query;

    let query = supabase
      .from('jobs')
      .select('*, employers(profiles(first_name, last_name, avatar_url))')
      .eq('is_active', true)
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (type) query = query.eq('job_type', type);
    if (location) query = query.ilike('location', `%${location}%`);

    const { data, error } = await query;

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    res.json({
      message: 'Jobs retrieved successfully',
      jobs: data,
      total: data?.length || 0
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to get jobs' });
  }
});

export const getJobDetails = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'Job ID is required' });
      return;
    }

    const { data, error } = await supabase
      .from('jobs')
      .select('*, employers(profiles(*))')
      .eq('id', id)
      .single();

    if (error) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    res.json({
      message: 'Job details retrieved successfully',
      job: data
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to get job details' });
  }
});

export const createJob = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const { title, description, requirements, responsibilities, job_type, location, salary_range } = req.body;
    const employerId = req.user?.id;

    // Validate required fields
    if (!title || !description || !job_type || !location) {
      res.status(400).json({ 
        message: 'Title, description, job type, and location are required' 
      });
      return;
    }

    if (!employerId) {
      res.status(403).json({ message: 'Unauthorized - Employer access required' });
      return;
    }

    const { data, error } = await supabase
      .from('jobs')
      .insert([{
        employer_id: employerId,
        title,
        description,
        requirements: requirements || [],
        responsibilities: responsibilities || [],
        job_type,
        location,
        salary_range,
        is_active: true,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    res.status(201).json({
      message: 'Job created successfully',
      job: data
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to create job' });
  }
});