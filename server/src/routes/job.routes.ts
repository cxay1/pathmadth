import { Router } from 'express';
import { 
  getAllJobs, 
  getJobDetails, 
  createJob
} from '../controllers/job.controller';
import { authenticate, requireEmployerOrAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobDetails);

// Protected routes (employers only)
router.post('/', authenticate, requireEmployerOrAdmin, createJob);

export default router;