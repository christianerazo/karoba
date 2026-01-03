const https = require('https');
const http = require('http');

async function testAPI() {
  console.log('🔍 Testing API connection...\n');

  // Test health endpoint
  try {
    const healthResponse = await makeRequest('GET', 'http://localhost:3001/health');
    console.log('✅ Health check:', healthResponse.status);
    console.log('📊 Response:', JSON.parse(healthResponse.data));
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    return;
  }

  // Test admin login
  try {
    const loginData = JSON.stringify({
      email: 'admin@karoba.com',
      password: 'admin123'
    });

    const loginResponse = await makeRequest('POST', 'http://localhost:3001/api/auth/login', loginData, {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(loginData)
    });

    console.log('✅ Login response status:', loginResponse.status);
    const loginResult = JSON.parse(loginResponse.data);
    console.log('👤 Login result:', loginResult.message);

    if (loginResult.token) {
      console.log('🔑 Token received');
      
      // Test users endpoint
      const usersResponse = await makeRequest('GET', 'http://localhost:3001/api/users?page=1&limit=10', null, {
        'Authorization': `Bearer ${loginResult.token}`,
        'Content-Type': 'application/json'
      });

      console.log('✅ Users endpoint status:', usersResponse.status);
      const usersResult = JSON.parse(usersResponse.data);
      console.log('👥 Users found:', usersResult.data?.users?.length || 0);
      
      if (usersResult.success) {
        console.log('🎉 Admin panel connection working perfectly!');
      } else {
        console.log('❌ Users endpoint error:', usersResult.error);
      }
    }
  } catch (error) {
    console.log('❌ Login failed:', error.message);
  }
}

function makeRequest(method, url, data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: headers
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: responseData
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(data);
    }
    req.end();
  });
}

testAPI();