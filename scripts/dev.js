#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import waitOn from 'wait-on';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🚀 Starting PATHMATCH Development Environment...\n');

// Start the server
console.log('📡 Starting server...');
const serverProcess = spawn('npm', ['run', 'dev'], {
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
  console.log('🌐 Starting client...\n');
  
  // Start the client
  const clientProcess = spawn('npm', ['run', 'dev:client'], {
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
    console.log('\n🛑 Shutting down...');
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

}).catch((error) => {
  console.error('❌ Failed to start server:', error.message);
  console.log('💡 Make sure your server environment is properly configured');
  serverProcess.kill('SIGTERM');
  process.exit(1);
});