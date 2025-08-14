#!/usr/bin/env node

console.log(`
🚀 PATHMATCH Development Commands

📋 DEVELOPMENT
  npm run dev              🌟 Intelligent full-stack development (recommended)
  npm run dev:simple       🔄 Simple concurrent development
  npm run dev:client       🌐 Frontend only (Vite dev server)
  npm run dev:server       📡 Backend only (TypeScript with hot reload)

🏭 PRODUCTION
  npm run start            🚀 Full production build and start (recommended)
  npm run start:simple     🔄 Simple concurrent production start
  npm run start:client     🌐 Frontend preview only
  npm run start:server     📡 Backend production only

🔨 BUILD
  npm run build            📦 Build both frontend and backend
  npm run build:client     🌐 Build frontend only
  npm run build:server     📡 Build backend only

🛠️  UTILITIES
  npm run setup            📥 Install all dependencies (root + server)
  npm run clean            🧹 Clean all build files and node_modules
  npm run clean:build      🗑️  Clean only build files
  npm run reset            🔄 Clean everything and reinstall
  npm run health           🏥 Check if server is responding
  npm run lint             🔍 Run ESLint

📚 HELP
  node scripts/help.js     ❓ Show this help message

🎯 QUICK START
  1. npm run setup         # Install dependencies
  2. npm run dev           # Start development

🔧 ENVIRONMENT SETUP
  cp .env.example .env
  cp server/.env.example server/.env
  # Edit both files with your configuration

🌐 URLS
  Frontend:     http://localhost:5173
  Backend:      http://localhost:5000/api  
  Health Check: http://localhost:5000/api/health

💡 Pro Tips:
  • Use 'npm run dev' for the best development experience
  • Use 'npm run health' to check if server is running
  • Use 'npm run reset' if you encounter dependency issues
  • Check DEVELOPMENT_GUIDE.md for detailed instructions

`);