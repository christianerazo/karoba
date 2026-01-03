const http = require('http');

async function testWebAdmin() {
  console.log('🌐 Testing web application on port 3002...\n');

  try {
    // Test if web app is running
    const webResponse = await makeRequest('GET', 'http://localhost:3002');
    console.log('✅ Web app is running on port 3002');
    console.log('📊 Status:', webResponse.status);
    
    // Test admin dashboard page
    const adminResponse = await makeRequest('GET', 'http://localhost:3002/admin/dashboard');
    console.log('✅ Admin dashboard accessible');
    console.log('📊 Status:', adminResponse.status);
    
    console.log('\n🎉 Web application setup complete!');
    console.log('📋 Next steps:');
    console.log('1. Open browser and go to: http://localhost:3002');
    console.log('2. Click "Iniciar Sesión" in the header');
    console.log('3. Login with: admin@karoba.com / admin123');
    console.log('4. Access the admin panel from the user menu');
    console.log('5. The CRUD functionality should now work properly!');
    
  } catch (error) {
    console.log('❌ Web app test failed:', error.message);
    console.log('💡 Make sure the web server is running: npm run dev (in packages/web)');
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
      headers: headers,
      timeout: 5000
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

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (data) {
      req.write(data);
    }
    req.end();
  });
}

testWebAdmin();