import { Request, Response, NextFunction } from 'express';

// Extend Request interface
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    // Decode the simple token
    const tokenData = JSON.parse(Buffer.from(token, 'base64').toString());
    
    // Check if token is expired
    if (tokenData.exp < Math.floor(Date.now() / 1000)) {
      res.status(401).json({ message: 'Token expired' });
      return;
    }

    req.user = {
      id: tokenData.userId,
      role: tokenData.role,
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
    
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }
    
    next();
  };
};

// Specific role middleware functions
export const requireJobSeeker = authorize(['job_seeker']);
export const requireEmployer = authorize(['employer']);
export const requireAdmin = authorize(['admin']);
export const requireEmployerOrAdmin = authorize(['employer', 'admin']);