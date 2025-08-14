import { Router } from 'express';
import { 
  getJobSeekerProfile, 
  updateJobSeekerProfile, 
  getJobSeekerApplications 
} from '../controllers/jobSeeker.controller';
import { authenticate, requireJobSeeker } from '../middleware/auth.middleware';

const router = Router();

// Protected routes (job seekers only)
router.get('/:id', authenticate, requireJobSeeker, getJobSeekerProfile);
router.put('/:id', authenticate, requireJobSeeker, updateJobSeekerProfile);
router.get('/:id/applications', authenticate, requireJobSeeker, getJobSeekerApplications);

export default router;