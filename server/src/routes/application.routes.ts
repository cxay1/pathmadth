import { Router } from 'express';
import { uploadSingle } from '../config/multer';
import { 
  submitApplication, 
  updateApplicationStatus,
  submitPublicApplication,
  submitOnboarding
} from '../controllers/application.controller';
import { authenticate, requireJobSeeker, requireEmployerOrAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public route for job applications (no authentication required)
router.post('/public', uploadSingle('resume'), submitPublicApplication);
router.post('/onboarding', submitOnboarding);

// Protected routes
router.post('/', authenticate, requireJobSeeker, submitApplication);
router.put('/:id/status', authenticate, requireEmployerOrAdmin, updateApplicationStatus);

export default router;