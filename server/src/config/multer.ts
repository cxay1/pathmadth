import multer from 'multer';
import config from './index';

// Configure multer for file uploads
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: config.upload.maxFileSize,
  },
  fileFilter: (req, file, cb) => {
    // Allow only specified file types
    if (config.upload.allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const allowedTypes = config.upload.allowedMimeTypes
        .map(type => {
          switch (type) {
            case 'application/pdf': return 'PDF';
            case 'application/msword': return 'DOC';
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': return 'DOCX';
            default: return type;
          }
        })
        .join(', ');
      cb(new Error(`Only ${allowedTypes} files are allowed`));
    }
  }
});

// Export individual middleware functions for different use cases
export const uploadSingle = (fieldName: string) => upload.single(fieldName);
export const uploadArray = (fieldName: string, maxCount?: number) => upload.array(fieldName, maxCount);
export const uploadFields = (fields: multer.Field[]) => upload.fields(fields);