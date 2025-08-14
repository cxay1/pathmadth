#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import waitOn from 'wait-on';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🚀 Starting PATHMATCH Production Environment...\n');

// Build both client and server first
console.log('🔨 Building application...');

const buildProcess = spawn('npm', ['run', 'build'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Build failed');
    process.exit(1);
  }

  console.log('✅ Build completed successfully!');
  console.log('📡 Starting production server...');

  // Start the server
  const serverProcess = spawn('npm', ['start'], {
    cwd: join(rootDir, 'server'),
    stdio: 'pipe',
    shell: process.platform === 'win32'
  });

  // Handle server output
  serverProcess.stdout.on('data', (data) => {
    console.log(`[SERVER] ${data.toString().trim()}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`[SERVER ERROR] ${data.toString().trim()}`);
  });

  // Wait for server to be ready
  console.log('⏳ Waiting for server to be ready...');

  waitOn({
    resources: ['http://localhost:5000/api/health'],
    delay: 1000,
    interval: 500,
    timeout: 30000,
  }).then(() => {
    console.log('✅ Server is ready!');
    console.log('🌐 Starting client preview...\n');
    
    // Start the client preview
    const clientProcess = spawn('npm', ['run', 'start:client'], {
      cwd: rootDir,
      stdio: 'pipe',
      shell: process.platform === 'win32'
    });

    // Handle client output
    clientProcess.stdout.on('data', (data) => {
      console.log(`[CLIENT] ${data.toString().trim()}`);
    });

    clientProcess.stderr.on('data', (data) => {
      console.error(`[CLIENT ERROR] ${data.toString().trim()}`);
    });

    // Handle process termination
    const cleanup = () => {
      console.log('\n🛑 Shutting down production environment...');
      serverProcess.kill('SIGTERM');
      clientProcess.kill('SIGTERM');
      process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

    clientProcess.on('close', (code) => {
      console.log(`Client process exited with code ${code}`);
      cleanup();
    });

    serverProcess.on('close', (code) => {
      console.log(`Server process exited with code ${code}`);
      cleanup();
    });

    // Show ready message
    setTimeout(() => {
      console.log('\n🎉 PATHMATCH is running in production mode!');
      console.log('🌐 Frontend: http://localhost:4173');
      console.log('📡 Backend: http://localhost:5000');
      console.log('🏥 Health Check: http://localhost:5000/api/health');
      console.log('\n💡 Press Ctrl+C to stop the application\n');
    }, 2000);

  }).catch((error) => {
    console.error('❌ Failed to start server:', error.message);
    console.log('💡 Make sure your server environment is properly configured');
    serverProcess.kill('SIGTERM');
    process.exit(1);
  });
});