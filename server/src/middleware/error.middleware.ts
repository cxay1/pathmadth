import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Handle specific error types
  if (err.name === 'ValidationError') {
    res.status(400).json({ 
      message: 'Validation error', 
      errors: err.message 
    });
    return;
  }

  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ 
      message: 'Unauthorized access' 
    });
    return;
  }

  // Default error response
  res.status(500).json({ 
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
};

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({ 
    message: `Route ${req.method} ${req.originalUrl} not found` 
  });
};

// Async error wrapper for controllers
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};