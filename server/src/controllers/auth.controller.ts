import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/db';

// Simple async wrapper without complex types
const asyncWrapper = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const register = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password, role, firstName, lastName } = req.body;

  // Validate required fields
  if (!email || !password || !firstName || !lastName || !role) {
    res.status(400).json({ 
      message: 'Email, password, first name, last name, and role are required' 
    });
    return;
  }

  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      res.status(400).json({ message: authError.message });
      return;
    }

    // Create profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([{
        user_id: authData.user?.id,
        role,
        first_name: firstName,
        last_name: lastName,
      }])
      .select()
      .single();

    if (profileError) {
      res.status(400).json({ message: profileError.message });
      return;
    }

    // Create role-specific profile
    if (role === 'job_seeker') {
      const { error: jobSeekerError } = await supabase
        .from('job_seekers')
        .insert([{ id: profileData.id }]);
      
      if (jobSeekerError) {
        console.warn('Failed to create job seeker profile:', jobSeekerError.message);
      }
    } else if (role === 'employer') {
      const { error: employerError } = await supabase
        .from('employers')
        .insert([{ id: profileData.id }]);
        
      if (employerError) {
        console.warn('Failed to create employer profile:', employerError.message);
      }
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: profileData
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
});

export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    res.status(400).json({ 
      message: 'Email and password are required' 
    });
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', data.user.id)
      .single();

    if (profileError) {
      res.status(404).json({ message: 'User profile not found' });
      return;
    }

    res.json({
      message: 'Login successful',
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: profile,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Login failed' });
  }
});

export const getCurrentUser = asyncWrapper(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      res.status(404).json({ message: 'User profile not found' });
      return;
    }

    res.json({
      message: 'User retrieved successfully',
      user: profile
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to get user' });
  }
});

export const refreshToken = asyncWrapper(async (req: Request, res: Response) => {
  const { refresh_token } = req.body;
  
  if (!refresh_token) {
    res.status(400).json({ message: 'Refresh token is required' });
    return;
  }

  try {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token
    });

    if (error) {
      res.status(401).json({ message: 'Invalid or expired refresh token' });
      return;
    }

    res.json({
      message: 'Token refreshed successfully',
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Token refresh failed' });
  }
});