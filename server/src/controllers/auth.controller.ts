import { Request, Response, NextFunction } from 'express';
import { sendRegistrationEmail } from '../services/email.service';

// Simple async wrapper without complex types
const asyncWrapper = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const register = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Minimal registration for onboarding flow
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    // Create a simple user object for the response (no persistence yet)
    const userData = {
      id: Date.now().toString(),
      email,
      first_name: '',
      last_name: '',
      role: 'job_seeker',
      created_at: new Date().toISOString()
    };

    // Send registration email to PATHMATCH team
    try {
      await sendRegistrationEmail({
        email,
        firstName: '',
        lastName: '',
        role: 'job_seeker',
        password
      });
    } catch (emailError) {
      console.error('[SERVER ERROR] Failed to send registration email:', emailError);
      // Do not fail registration if email credentials are missing
    }

    // Intentionally DO NOT issue a token here; frontend will switch to login
    res.status(201).json({
      message: 'Registration request submitted successfully. Please sign in to continue.',
      user: userData
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

export const login = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    res.status(400).json({ 
      message: 'Email and password are required' 
    });
    return;
  }

  try {
    // For now, we'll create a simple token-based response
    // In a real implementation, you'd verify against stored credentials and verification status
    const userData = {
      id: Date.now().toString(),
      email,
      first_name: 'User',
      last_name: '',
      role: 'job_seeker',
      created_at: new Date().toISOString()
    };

    // Create a simple JWT-like token
    const token = Buffer.from(JSON.stringify({
      userId: userData.id,
      email: userData.email,
      role: userData.role,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
      iat: Math.floor(Date.now() / 1000)
    })).toString('base64');

    res.json({
      message: 'Login successful',
      access_token: token,
      user: userData,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    // Surface a normalized message the client maps to "Invalid username or password"
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

export const getCurrentUser = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    // Decode the simple token
    const tokenData = JSON.parse(Buffer.from(token, 'base64').toString());
    
    // Check if token is expired
    if (tokenData.exp < Math.floor(Date.now() / 1000)) {
      res.status(401).json({ message: 'Token expired' });
      return;
    }

    const userData = {
      id: tokenData.userId,
      email: tokenData.email,
      first_name: 'User',
      last_name: '',
      role: tokenData.role,
      created_at: new Date().toISOString()
    };

    res.json({
      message: 'User retrieved successfully',
      user: userData
    });
  } catch (error: any) {
    console.error('Get current user error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

export const refreshToken = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const { refresh_token } = req.body;
  
  if (!refresh_token) {
    res.status(400).json({ message: 'Refresh token is required' });
    return;
  }

  try {
    // For simplicity, create a new token
    const newToken = Buffer.from(JSON.stringify({
      userId: Date.now().toString(),
      email: 'user@example.com',
      role: 'job_seeker',
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
      iat: Math.floor(Date.now() / 1000)
    })).toString('base64');

    res.json({
      message: 'Token refreshed successfully',
      access_token: newToken,
    });
  } catch (error: any) {
    console.error('Token refresh error:', error);
    res.status(500).json({ message: 'Token refresh failed' });
  }
});