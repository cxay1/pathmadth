import { Router } from 'express';
import { 
  getJobs, 
  getJob, 
  createJob,
  updateJob,
  deleteJob
} from '../controllers/job.controller';
import { authenticate, requireEmployerOrAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getJobs);
router.get('/:id', getJob);

// Protected routes (employers only)
router.post('/', authenticate, requireEmployerOrAdmin, createJob);
router.put('/:id', authenticate, requireEmployerOrAdmin, updateJob);
router.delete('/:id', authenticate, requireEmployerOrAdmin, deleteJob);

export default router;