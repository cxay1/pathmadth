import { Router } from 'express';
import multer from 'multer';
import { 
  submitApplication, 
  updateApplicationStatus,
  submitPublicApplication
} from '../controllers/application.controller';
import { authenticate, requireJobSeeker, requireEmployerOrAdmin } from '../middleware/auth.middleware';

const router = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
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
router.post('/public', upload.single('resume'), submitPublicApplication);

// Protected routes
router.post('/', authenticate, requireJobSeeker, submitApplication);
router.put('/:id/status', authenticate, requireEmployerOrAdmin, updateApplicationStatus);

export default router;