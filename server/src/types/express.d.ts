import { Request, Response, NextFunction } from 'express';

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}

export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>; 