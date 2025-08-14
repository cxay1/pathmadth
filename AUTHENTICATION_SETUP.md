# Authentication System Setup Guide

## Overview
This guide explains the simplified authentication system for the PathmMatch employment agency website and how to resolve the "JSON.parse: unexpected end of data" error.

## Issue Resolution

### Root Cause
The JSON parse error was occurring because:
1. The server was not including authentication routes in the main server configuration
2. When the frontend attempted to make API calls to `/api/auth/*`, the server returned 404 errors
3. These 404 responses had no JSON content, causing the JSON.parse error

### Fixes Applied
1. ✅ Added missing auth routes to server configuration
2. ✅ Improved error handling with proper JSON responses
3. ✅ Created API utility for better error management
4. ✅ Updated frontend to use real API calls instead of mock authentication
5. ✅ Added proper CORS configuration
6. ✅ Implemented async error handling middleware

## Setup Instructions

### 1. Environment Configuration

Create `.env` files in both root and server directories:

**Root `.env`:**
```env
VITE_API_URL=http://localhost:5000
VITE_JWT_SECRET=your-jwt-secret-key
```

**Server `.env`:**
```env
PORT=5000
CLIENT_URL=http://localhost:5173
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
NODE_ENV=development

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=info.pathmatch@gmail.com
EMAIL_PASS=your-app-password
```

### 2. Database Setup (Supabase)

Required tables in Supabase:

```sql
-- Profiles table
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('job_seeker', 'employer', 'admin')),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Job seekers table
CREATE TABLE job_seekers (
  id INTEGER PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  skills TEXT[],
  experience_level VARCHAR(50),
  resume_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Employers table
CREATE TABLE employers (
  id INTEGER PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  company_name VARCHAR(200),
  company_description TEXT,
  website_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

### 3. Running the Application

**Start the server:**
```bash
cd server
npm install
npm run dev
```

**Start the client:**
```bash
cd client  # or root directory
npm install
npm run dev
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires authentication)

### Request/Response Examples

**Registration:**
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "job_seeker"
}

Response:
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "user_id": "uuid",
    "role": "job_seeker",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "access_token": "jwt-token",
  "refresh_token": "refresh-token",
  "user": {
    "id": 1,
    "role": "job_seeker",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

## Security Features

1. **Password Validation**: Minimum 6 characters
2. **Email Validation**: Valid email format required
3. **JWT Tokens**: Secure token-based authentication
4. **CORS Protection**: Configured for specific origins
5. **Error Handling**: Proper error responses without exposing sensitive data
6. **Input Validation**: Required field validation
7. **Async Error Handling**: Prevents unhandled promise rejections

## Best Practices Implemented

1. **Separation of Concerns**: Auth logic separated into controllers, routes, and middleware
2. **Error Middleware**: Centralized error handling
3. **Type Safety**: TypeScript for better development experience
4. **Environment Variables**: Configuration through environment variables
5. **API Utilities**: Centralized API request handling
6. **Async/Await**: Modern async patterns
7. **Proper HTTP Status Codes**: Correct status codes for different scenarios

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure CLIENT_URL is set correctly in server environment
2. **Database Connection**: Verify SUPABASE_URL and SUPABASE_KEY
3. **Port Conflicts**: Change PORT in environment if 5000 is occupied
4. **Token Issues**: Check JWT_SECRET configuration

### Development vs Production

**Development:**
- Detailed error messages
- CORS allows localhost
- Console logging enabled

**Production:**
- Generic error messages
- Specific CORS origins
- Minimal logging

## Deployment Considerations

1. **Environment Variables**: Set all required environment variables
2. **Database**: Ensure Supabase tables are created
3. **HTTPS**: Use HTTPS in production
4. **Domain Configuration**: Update CLIENT_URL and VITE_API_URL
5. **Email Service**: Configure email service for notifications

## Next Steps

1. Implement password reset functionality
2. Add two-factor authentication
3. Implement role-based access control
4. Add audit logging
5. Set up automated testing
6. Implement rate limiting
7. Add email verification

## Support

For issues or questions, contact: info.pathmatch@gmail.com