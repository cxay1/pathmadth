# 🚀 PATHMATCH Full-Stack Development Guide

This guide explains how to run both the frontend and backend together using our streamlined development workflow.

## 📋 Quick Start

### 1. One-Command Development
```bash
npm run dev
```
This intelligent script will:
- 🔧 Start the backend server first
- ⏳ Wait for the server to be ready
- 🌐 Start the frontend development server
- 📊 Show colored logs for both processes

### 2. One-Command Production
```bash
npm run start
```
This will:
- 🔨 Build both frontend and backend
- 🚀 Start the production server
- 🌐 Start the frontend preview server
- ✅ Verify everything is working

## 🛠️ Available Scripts

### Development Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | **Recommended**: Intelligent full-stack development |
| `npm run dev:simple` | Simple concurrent development (both start simultaneously) |
| `npm run dev:client` | Frontend only (Vite dev server) |
| `npm run dev:server` | Backend only (TypeScript with hot reload) |

### Production Scripts
| Command | Description |
|---------|-------------|
| `npm run start` | **Recommended**: Full production build and start |
| `npm run start:simple` | Simple concurrent production start |
| `npm run start:client` | Frontend preview only |
| `npm run start:server` | Backend production only |

### Build Scripts
| Command | Description |
|---------|-------------|
| `npm run build` | Build both frontend and backend |
| `npm run build:client` | Build frontend only |
| `npm run build:server` | Build backend only |

### Utility Scripts
| Command | Description |
|---------|-------------|
| `npm run setup` | Install all dependencies (root + server) |
| `npm run clean` | Clean all build files and node_modules |
| `npm run clean:build` | Clean only build files |
| `npm run reset` | Clean everything and reinstall |
| `npm run health` | Check if server is responding |

## 🏗️ Project Structure

```
pathmatch/
├── src/                    # Frontend source code
├── server/                 # Backend source code
├── scripts/                # Development automation scripts
│   ├── dev.js             # Intelligent development starter
│   └── start.js           # Production starter
├── dist/                  # Frontend build output
├── server/dist/           # Backend build output
├── .env.example           # Frontend environment template
├── server/.env.example    # Backend environment template
└── package.json           # Root package.json with full-stack scripts
```

## ⚙️ Environment Setup

### 1. Frontend Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env`:
```env
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=PATHMATCH
```

### 2. Backend Environment
Copy `server/.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_SERVICE=gmail
```

## 🎯 Development Workflow

### First Time Setup
```bash
# 1. Clone and enter the project
git clone <your-repo>
cd pathmatch

# 2. Install all dependencies
npm run setup

# 3. Set up environment variables
cp .env.example .env
cp server/.env.example server/.env
# Edit both .env files with your values

# 4. Start development
npm run dev
```

### Daily Development
```bash
# Start both frontend and backend
npm run dev

# The script will show:
# 🚀 Starting PATHMATCH Development Environment...
# 📡 Starting server...
# ⏳ Waiting for server to be ready...
# ✅ Server is ready!
# 🌐 Starting client...
```

### Production Testing
```bash
# Build and start production version
npm run start

# Or just build without starting
npm run build
```

## 🔍 Monitoring & Debugging

### Server Health Check
```bash
# Check if server is responding
npm run health

# Or manually:
curl http://localhost:5000/api/health
```

### Log Output
The development script provides colored, prefixed logs:
- 🔵 **[SERVER]**: Backend logs in blue
- 🟢 **[CLIENT]**: Frontend logs in green
- 🔴 **[SERVER ERROR]**: Backend errors in red
- 🔴 **[CLIENT ERROR]**: Frontend errors in red

### Process Management
- **Ctrl+C**: Gracefully stops both processes
- Both processes are automatically cleaned up when one exits

## 🚨 Troubleshooting

### Server Won't Start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill any process using port 5000
kill -9 $(lsof -t -i:5000)

# Clean and restart
npm run clean
npm run setup
npm run dev
```

### Client Won't Start
```bash
# Check if port 5173 is in use
lsof -i :5173

# Clean Vite cache
rm -rf node_modules/.vite

# Restart
npm run dev
```

### Build Issues
```bash
# Clean everything and rebuild
npm run reset
npm run build
```

### Environment Issues
```bash
# Verify environment files exist
ls -la .env server/.env

# Check environment variables are loaded
npm run health
```

## 🎉 Success Indicators

When everything is working correctly, you should see:

### Development Mode
- ✅ Server starts on http://localhost:5000
- ✅ Client starts on http://localhost:5173
- ✅ Health check responds: `{"status":"OK",...}`
- ✅ Hot reload works for both frontend and backend

### Production Mode
- ✅ Build completes without errors
- ✅ Server runs on http://localhost:5000
- ✅ Client preview on http://localhost:4173
- ✅ All API endpoints respond correctly

## 🔧 Advanced Usage

### Running Individual Components
```bash
# Backend only (with hot reload)
cd server && npm run dev

# Frontend only
npm run dev:client

# Production backend only
cd server && npm start

# Production frontend only
npm run start:client
```

### Custom Port Configuration
Edit your environment files to change ports:
```env
# server/.env
PORT=3001

# .env
VITE_API_URL=http://localhost:3001/api
```

## 📚 Additional Resources

- [Server Documentation](./server/README.md)
- [Frontend Documentation](./README.md)
- [API Documentation](./server/API.md)
- [Deployment Guide](./DEPLOYMENT.md)

---

💡 **Pro Tip**: Use `npm run dev` for the best development experience with automatic server health checking and graceful startup sequencing!