import { Router } from 'express';
import { 
  getEmployerProfile, 
  updateEmployerProfile, 
  getEmployerJobs,
  getJobApplications
} from '../controllers/employer.controller';
import { authenticate, requireEmployerOrAdmin } from '../middleware/auth.middleware';

const router = Router();

// Protected routes (employers only)
// More specific routes first
router.get('/:id/jobs/:jobId/applications', authenticate, requireEmployerOrAdmin, getJobApplications);
router.get('/:id/jobs', authenticate, requireEmployerOrAdmin, getEmployerJobs);
// General routes last
router.get('/:id', authenticate, requireEmployerOrAdmin, getEmployerProfile);
router.put('/:id', authenticate, requireEmployerOrAdmin, updateEmployerProfile);

export default router;