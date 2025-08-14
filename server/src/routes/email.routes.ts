import { Router } from 'express';
import { uploadSingle } from '../config/multer';
import { 
  sendContactEmail,
  sendJobApplicationEmail
} from '../controllers/email.controller';

const router = Router();

// Contact form endpoint
router.post('/contact', sendContactEmail);

// Job application endpoint with file upload
router.post('/job-application', uploadSingle('resume'), sendJobApplicationEmail);

export default router;