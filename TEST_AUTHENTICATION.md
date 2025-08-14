# 🧪 Authentication System Testing Guide

## Overview
This guide provides comprehensive testing instructions for the fixed authentication system using the new axios-based API and improved error handling.

## ✅ Fixes Applied

### 1. TypeScript Errors Resolved
- **Issue**: `Promise<Response>` vs `Promise<void>` type mismatch
- **Solution**: Simplified controller functions with proper async wrapper
- **Result**: All TypeScript compilation errors eliminated

### 2. Axios Integration
- **Replaced**: Native fetch API with axios
- **Benefits**: Better error handling, request/response interceptors, timeout support
- **Features**: Automatic JSON parsing, centralized error management

### 3. Enhanced Error Handling
- **Server**: Consistent error responses with proper HTTP status codes
- **Client**: ApiError class for structured error handling
- **Network**: Timeout and connection error handling

## 🚀 Testing Steps

### Prerequisites
```bash
# Ensure dependencies are installed
cd server && npm install
cd .. && npm install
```

### 1. Server Testing

#### Start the Server
```bash
cd server
npm run dev
```

**Expected Output:**
```
Server is running on port 5000
Connected to Supabase successfully
```

#### Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 2. Authentication API Testing

#### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "job_seeker"
  }'
```

**Expected Response:**
```json
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

#### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
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

#### Test Protected Route
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Frontend Testing

#### Start the Client
```bash
npm run dev
```

#### Test Registration Flow
1. Navigate to the auth page
2. Click "Sign Up" tab
3. Fill in the form:
   - **Role**: Job Seeker or Employer
   - **First Name**: John
   - **Last Name**: Doe
   - **Email**: test@example.com
   - **Password**: password123
   - **Confirm Password**: password123
4. Click "Create Account"

**Expected Behavior:**
- No JSON parse errors
- Successful registration message
- Redirect to dashboard/home page
- User logged in state

#### Test Login Flow
1. Navigate to the auth page
2. Ensure "Sign In" tab is selected
3. Enter credentials:
   - **Email**: test@example.com
   - **Password**: password123
4. Click "Sign In"

**Expected Behavior:**
- Successful login
- JWT token stored in localStorage
- Redirect to dashboard
- User authenticated state

### 4. Error Handling Testing

#### Test Invalid Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "123"
  }'
```

**Expected Response:**
```json
{
  "message": "Email, password, first name, last name, and role are required"
}
```

#### Test Invalid Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "wrong@example.com",
    "password": "wrongpassword"
  }'
```

**Expected Response:**
```json
{
  "message": "Invalid email or password"
}
```

#### Test Unauthorized Access
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer invalid-token"
```

**Expected Response:**
```json
{
  "message": "Invalid or expired token"
}
```

## 🔧 Troubleshooting

### Common Issues

#### 1. CORS Errors
**Symptom**: Browser console shows CORS errors
**Solution**: Ensure server `CLIENT_URL` environment variable is set correctly

#### 2. Database Connection
**Symptom**: "Supabase connection error" in server logs
**Solution**: Verify `SUPABASE_URL` and `SUPABASE_KEY` in server `.env`

#### 3. Port Conflicts
**Symptom**: "Port 5000 already in use"
**Solution**: Change `PORT` in server `.env` or kill existing process

#### 4. TypeScript Errors
**Symptom**: Compilation errors during development
**Solution**: All TypeScript errors have been resolved in the latest version

### Debug Commands

#### Check Server Status
```bash
curl -v http://localhost:5000/api/health
```

#### Check Client Environment
```javascript
// In browser console
console.log(import.meta.env);
```

#### Verify Database Tables
Check in Supabase dashboard that these tables exist:
- `profiles`
- `job_seekers`
- `employers`

## 📊 Performance Metrics

### Expected Response Times
- **Registration**: < 2 seconds
- **Login**: < 1 second
- **Token Refresh**: < 500ms
- **Get User**: < 500ms

### Error Rates
- **Target**: < 1% error rate for valid requests
- **Monitoring**: Check server logs for error patterns

## 🎯 Success Criteria

### ✅ All Tests Should Pass
1. Server starts without errors
2. Health check responds with 200 OK
3. Registration creates user successfully
4. Login returns valid JWT token
5. Protected routes work with valid token
6. Invalid requests return appropriate error messages
7. Frontend auth flow works without JSON parse errors
8. No TypeScript compilation errors

### 🚫 No More Errors
- ✅ "JSON.parse: unexpected end of data" - RESOLVED
- ✅ TypeScript return type errors - RESOLVED
- ✅ Missing refreshToken export - RESOLVED
- ✅ Import.meta module errors - RESOLVED
- ✅ File structure errors - RESOLVED

## 📝 Test Checklist

- [ ] Server starts successfully
- [ ] Health endpoint responds
- [ ] User registration works
- [ ] User login works
- [ ] Token refresh works
- [ ] Protected routes work
- [ ] Error handling works
- [ ] Frontend integration works
- [ ] No TypeScript errors
- [ ] No runtime errors

## 🎉 Completion

When all tests pass, your PathmMatch authentication system is fully functional and ready for production deployment!