# PATHMATCH Employment Agency

A modern full-stack employment agency platform built with React, TypeScript, Express.js, and Supabase.

## 🚀 Quick Start

### One-Command Development
```bash
# Install dependencies and start both frontend & backend
npm install
npm run dev
```

This intelligent script will:
- 🔧 Start the backend server first
- ⏳ Wait for the server to be ready
- 🌐 Start the frontend development server
- 📊 Show colored logs for both processes

### One-Command Production
```bash
# Build and start production version
npm run start
```

## 🛠️ Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | **🌟 Recommended**: Full-stack development with intelligent startup |
| `npm run dev:simple` | Concurrent development (both start simultaneously) |
| `npm run start` | **🚀 Production**: Build and run production version |
| `npm run build` | Build both frontend and backend |
| `npm run health` | Check server health status |
| `npm run setup` | Install all dependencies |
| `npm run clean` | Clean all build files |

## 📁 Project Structure

```
pathmatch/
├── src/                    # Frontend React application
├── server/                 # Backend Express.js API
├── scripts/                # Development automation
├── public/                 # Static assets
└── dist/                  # Build outputs
```

## ⚡ Features

### Frontend
- **React 18** with TypeScript
- **Vite** for lightning-fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication

### Backend
- **Express.js 5** with TypeScript
- **Multer** for file uploads (PDF, DOC, DOCX)
- **Supabase** for database and authentication
- **JWT** authentication with role-based access
- **Nodemailer** for email notifications

### Development Experience
- 🔥 **Hot reload** for both frontend and backend
- 🎨 **Colored logs** with process identification
- 🚀 **Intelligent startup** - server first, then client
- 🏥 **Health monitoring** with automatic checks
- 🛠️ **One-command setup** for new developers

## 🎯 Getting Started

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd pathmatch
npm run setup
```

### 2. Environment Configuration
```bash
# Copy environment templates
cp .env.example .env
cp server/.env.example server/.env

# Edit the files with your configuration
```

### 3. Start Development
```bash
npm run dev
```

You'll see:
```
🚀 Starting PATHMATCH Development Environment...
📡 Starting server...
⏳ Waiting for server to be ready...
✅ Server is ready!
🌐 Starting client...
```

### 4. Access Your Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🔧 Configuration

### Frontend Environment (`.env`)
```env
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=PATHMATCH
```

### Backend Environment (`server/.env`)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_SERVICE=gmail
```

## 📚 Documentation

- [📖 Development Guide](./DEVELOPMENT_GUIDE.md) - Complete development workflow
- [🖥️ Server Documentation](./server/README.md) - Backend API details
- [🔐 Authentication Setup](./AUTHENTICATION_SETUP.md) - Auth configuration
- [🐛 Issue Resolution](./ISSUE_RESOLUTION_SUMMARY.md) - Troubleshooting

## 🎨 Key Features

### Job Management
- Create and manage job listings
- Role-based access (Job Seekers, Employers, Admin)
- Advanced job filtering and search

### Application System
- File upload for resumes (PDF, DOC, DOCX)
- Automated email notifications
- Application status tracking

### Authentication
- Secure JWT-based authentication
- Supabase integration
- Role-based permissions

### File Handling
- Proper Express.Multer.File integration
- File type validation
- Size limits and security

## 🚨 Troubleshooting

### Server Won't Start
```bash
npm run clean
npm run setup
npm run dev
```

### Port Conflicts
```bash
# Check what's using the ports
lsof -i :5000
lsof -i :5173

# Kill processes if needed
kill -9 $(lsof -t -i:5000)
```

### Environment Issues
```bash
# Verify environment files
ls -la .env server/.env

# Test server health
npm run health
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test with: `npm run dev`
5. Build and test production: `npm run start`
6. Submit a pull request

## 📊 Development Status

✅ **TypeScript**: Full type safety  
✅ **Express.js**: Modern API with proper error handling  
✅ **Multer**: File upload system working  
✅ **Authentication**: JWT + Supabase integration  
✅ **Development Workflow**: One-command full-stack development  
✅ **Production Ready**: Build and deployment scripts  

---

🌟 **Start developing with a single command**: `npm run dev`
