# PATHMATCH Server

A robust Express.js server with TypeScript, featuring file uploads with Multer, authentication, and comprehensive error handling.

## 🚀 Recent Improvements & Fixes

### Express & Multer Integration
- **Fixed Express.Multer.File type integration** across the entire codebase
- **Centralized multer configuration** in `src/config/multer.ts` to avoid duplication
- **Proper TypeScript typing** for file uploads with `Express.Multer.File`
- **Consolidated file handling** with consistent error messages and validation

### TypeScript & Build System
- **Updated TypeScript configuration** for better Express 5.x compatibility
- **Fixed authentication middleware** return type issues
- **Proper async/await handling** with explicit `Promise<void>` return types
- **Strict TypeScript settings** enabled for better type safety
- **Fixed nodemailer typo** (`createTransporter` → `createTransport`)

### Architecture Improvements
- **Centralized configuration** system in `src/config/index.ts`
- **Enhanced error handling** with detailed logging and proper HTTP status codes
- **Improved type definitions** with proper Express namespace extensions
- **Better separation of concerns** with modular configuration

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── index.ts          # Centralized configuration
│   │   ├── multer.ts         # File upload configuration
│   │   └── db.ts             # Database configuration
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Express middleware
│   ├── routes/               # API routes
│   ├── services/             # Business logic services
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── dist/                     # Compiled JavaScript
└── package.json
```

## 🔧 Features

### File Upload System
- **Multer integration** with memory storage
- **File type validation** (PDF, DOC, DOCX only)
- **File size limits** (5MB maximum)
- **Proper TypeScript typing** for uploaded files
- **Centralized configuration** for easy maintenance

### Authentication System
- **JWT-based authentication** with Supabase
- **Role-based access control** (job_seeker, employer, admin)
- **Proper middleware chain** with async error handling
- **Token refresh functionality**

### API Endpoints
- `POST /api/applications/public` - Public job application with file upload
- `POST /api/applications` - Authenticated job application
- `GET /api/health` - Server health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## 🛠️ Development

### Prerequisites
- Node.js 18+
- TypeScript
- Supabase account

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## 🔒 Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_SERVICE=gmail
```

## 📤 File Upload Usage

The server now properly handles file uploads with Express.Multer.File typing:

```typescript
// In your controller
export const handleFileUpload = async (req: Request, res: Response): Promise<void> => {
  const uploadedFile: Express.Multer.File | undefined = req.file;
  
  if (uploadedFile) {
    console.log('File details:', {
      originalname: uploadedFile.originalname,
      mimetype: uploadedFile.mimetype,
      size: uploadedFile.size,
      buffer: uploadedFile.buffer
    });
  }
  
  res.json({ message: 'File processed successfully' });
};
```

## 🏥 Health Check

The server includes a comprehensive health check endpoint:

```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "status": "OK",
  "message": "Server is running",
  "environment": "development",
  "timestamp": "2025-01-14T13:12:06.878Z"
}
```

## 🐛 Error Handling

The server includes comprehensive error handling:
- **Validation errors** (400 status)
- **Authentication errors** (401 status)
- **Authorization errors** (403 status)
- **Not found errors** (404 status)
- **Server errors** (500 status)

All errors are properly logged with context information including URL, method, and timestamp.

## 🔄 Recent Bug Fixes

1. **Fixed TypeScript compilation errors** with Express 5.x compatibility
2. **Resolved multer file type issues** with proper `Express.Multer.File` typing
3. **Fixed authentication middleware** return type problems
4. **Corrected nodemailer configuration** typo
5. **Eliminated duplicate multer configurations**
6. **Improved async error handling** throughout the application

## 📊 Build Status

✅ TypeScript compilation: **PASSING**  
✅ Server startup: **SUCCESSFUL**  
✅ Health check: **RESPONSIVE**  
✅ File upload system: **OPERATIONAL**  
✅ Authentication: **FUNCTIONAL** 