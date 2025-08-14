#!/usr/bin/env node

const { spawn } = require('child_process');
const axios = require('axios');

console.log('🚀 Starting PathmMatch Authentication System Tests');
console.log('='.repeat(50));

// Test server health
async function testServerHealth() {
  try {
    console.log('📡 Testing server health...');
    const response = await axios.get('http://localhost:5000/api/health');
    
    if (response.status === 200 && response.data.status === 'OK') {
      console.log('✅ Server health check passed');
      return true;
    } else {
      console.log('❌ Server health check failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Server is not running or not accessible');
    console.log('💡 Make sure to run: npm run server');
    return false;
  }
}

// Test authentication endpoints
async function testAuthEndpoints() {
  const testUser = {
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    role: 'job_seeker'
  };

  try {
    console.log('👤 Testing user registration...');
    const registerResponse = await axios.post('http://localhost:5000/api/auth/register', testUser);
    
    if (registerResponse.status === 201) {
      console.log('✅ User registration successful');
    } else {
      console.log('❌ User registration failed');
      return false;
    }

    console.log('🔐 Testing user login...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: testUser.email,
      password: testUser.password
    });

    if (loginResponse.status === 200 && loginResponse.data.access_token) {
      console.log('✅ User login successful');
      console.log('🎫 JWT token received');
      return loginResponse.data.access_token;
    } else {
      console.log('❌ User login failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Authentication test failed:', error.response?.data?.message || error.message);
    return false;
  }
}

// Test protected routes
async function testProtectedRoutes(token) {
  try {
    console.log('🔒 Testing protected route access...');
    const response = await axios.get('http://localhost:5000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      console.log('✅ Protected route access successful');
      return true;
    } else {
      console.log('❌ Protected route access failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Protected route test failed:', error.response?.data?.message || error.message);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('⏳ Waiting 2 seconds for server to be ready...');
  await new Promise(resolve => setTimeout(resolve, 2000));

  const healthOk = await testServerHealth();
  if (!healthOk) {
    console.log('\n❌ Server health check failed. Cannot proceed with tests.');
    process.exit(1);
  }

  const token = await testAuthEndpoints();
  if (!token) {
    console.log('\n❌ Authentication tests failed.');
    process.exit(1);
  }

  const protectedOk = await testProtectedRoutes(token);
  if (!protectedOk) {
    console.log('\n❌ Protected route tests failed.');
    process.exit(1);
  }

  console.log('\n🎉 All tests passed! Authentication system is working correctly.');
  console.log('✅ Server is healthy');
  console.log('✅ User registration works');
  console.log('✅ User login works');
  console.log('✅ JWT tokens are valid');
  console.log('✅ Protected routes work');
  console.log('\n🚀 PathmMatch authentication system is ready for production!');
}

// Error handling
process.on('unhandledRejection', (error) => {
  console.log('❌ Test failed with error:', error.message);
  process.exit(1);
});

// Run tests
runTests();