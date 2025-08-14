import { Request, Response } from 'express';
import { supabase } from '../config/db';
import { asyncHandler } from '../middleware/error.middleware';

export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password, role, firstName, lastName } = req.body;

  // Validate required fields
  if (!email || !password || !firstName || !lastName || !role) {
    res.status(400).json({ 
      message: 'Email, password, first name, last name, and role are required' 
    });
    return;
  }

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    throw new Error(authError.message);
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
    throw new Error(profileError.message);
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
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    res.status(400).json({ 
      message: 'Email and password are required' 
    });
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('Invalid email or password');
  }

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', data.user.id)
    .single();

  if (profileError) {
    throw new Error('User profile not found');
  }

  res.json({
    message: 'Login successful',
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    user: profile,
  });
});

export const getCurrentUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) {
    throw new Error('Invalid or expired token');
  }
  if (!user) {
    throw new Error('User not found');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (profileError) {
    throw new Error('User profile not found');
  }

  res.json({
    message: 'User retrieved successfully',
    user: profile
  });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { refresh_token } = req.body;
  
  if (!refresh_token) {
    res.status(400).json({ message: 'Refresh token is required' });
    return;
  }

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token
  });

  if (error) {
    throw new Error('Invalid or expired refresh token');
  }

  res.json({
    message: 'Token refreshed successfully',
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
  });
});