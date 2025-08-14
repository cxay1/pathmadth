import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
      };
    }
  }
}

export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>; 