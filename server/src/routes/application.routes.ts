import { Router } from 'express';
import express from 'express';
import { 
  submitApplication, 
  updateApplicationStatus,
  submitPublicApplication
} from '../controllers/application.controller';
import { authenticate, requireJobSeeker, requireEmployerOrAdmin } from '../middleware/auth.middleware';

const router = Router();

// Configure express.multer for file uploads
const upload = express.multer({
  storage: express.multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only PDF, DOC, DOCX files
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/msword' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

// Public route for job applications (no authentication required)
// @ts-ignore
router.post('/public', upload.single('resume'), submitPublicApplication);

// Protected routes
// @ts-ignore
router.post('/', authenticate, requireJobSeeker, submitApplication);
// @ts-ignore
router.put('/:id/status', authenticate, requireEmployerOrAdmin, updateApplicationStatus);

export default router;