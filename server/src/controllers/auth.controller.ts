import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/db';
import jwt from 'jsonwebtoken';

// Simple async wrapper without complex types
const asyncWrapper = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Mock users storage for development
const mockUsers: any[] = [];
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';

export const register = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const { email, password, role, firstName, lastName } = req.body;

  console.log('Registration request received:', { email, firstName, lastName, role });

  // Validate required fields
  if (!email || !password || !firstName || !lastName || !role) {
    res.status(400).json({ 
      message: 'Email, password, first name, last name, and role are required' 
    });
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Invalid email format' });
    return;
  }

  // Password validation
  if (password.length < 6) {
    res.status(400).json({ message: 'Password must be at least 6 characters long' });
    return;
  }

  try {
    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      res.status(400).json({ message: 'User with this email already exists' });
      return;
    }

    // Create new user
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newUser = {
      id: userId,
      email,
      first_name: firstName,
      last_name: lastName,
      role: role,
      password: password, // In production, this should be hashed
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    mockUsers.push(newUser);

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email, 
        role: newUser.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password: _, ...userResponse } = newUser;

    console.log('User registered successfully:', userResponse);

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      access_token: token,
      refresh_token: token // Using same token for simplicity in development
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
});

export const login = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  console.log('Login request received:', { email });

  // Validate required fields
  if (!email || !password) {
    res.status(400).json({ 
      message: 'Email and password are required' 
    });
    return;
  }

  try {
    // Find user
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password: _, ...userResponse } = user;

    console.log('User logged in successfully:', userResponse);

    res.json({
      message: 'Login successful',
      access_token: token,
      refresh_token: token, // Using same token for simplicity in development
      user: userResponse
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Login failed' });
  }
});

export const getCurrentUser = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = mockUsers.find(u => u.id === decoded.userId);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      message: 'User retrieved successfully',
      user: userResponse
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

export const refreshToken = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const { refresh_token } = req.body;
  
  if (!refresh_token) {
    res.status(400).json({ message: 'Refresh token is required' });
    return;
  }

  try {
    const decoded = jwt.verify(refresh_token, JWT_SECRET) as any;
    
    // Create new token
    const newToken = jwt.sign(
      { 
        userId: decoded.userId, 
        email: decoded.email, 
        role: decoded.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Token refreshed successfully',
      access_token: newToken,
      refresh_token: newToken
    });
  } catch (error: any) {
    console.error('Token refresh error:', error);
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
});