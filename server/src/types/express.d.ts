import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'job_seeker' | 'employer' | 'admin';
      };
      file?: Multer.File;
      files?: Multer.File[] | { [fieldname: string]: Multer.File[] };
    }
  }
}

export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>; 