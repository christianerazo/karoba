const http = require('http');

async function testRegisterForm() {
  console.log('🧪 Probando formulario de registro...\n');

  try {
    // Datos de prueba completos
    const testUserData = {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez.test@karoba.com',
      phone: '+57 300 123 4567',
      password: 'test123456',
      confirmPassword: 'test123456',
      birthDate: '1990-01-01',
      country: 'Colombia',
      city: 'Bogotá',
      interests: ['wellness', 'nature'],
      newsletter: true,
      terms: true
    };

    console.log('📝 Datos de prueba:', {
      firstName: testUserData.firstName,
      lastName: testUserData.lastName,
      email: testUserData.email,
      phone: testUserData.phone,
      birthDate: testUserData.birthDate,
      country: testUserData.country,
      city: testUserData.city,
      interests: testUserData.interests,
      newsletter: testUserData.newsletter,
      terms: testUserData.terms
    });

    // 1. Probar registro con datos completos
    console.log('\n1️⃣ Probando registro con datos completos...');
    const registerResponse = await makeRequest('POST', 'http://localhost:3001/api/auth/register', JSON.stringify(testUserData), {
      'Content-Type': 'application/json'
    });

    console.log('📡 Status:', registerResponse.status);
    const registerData = JSON.parse(registerResponse.data);
    
    if (registerResponse.status === 201) {
      console.log('✅ Registro exitoso');
      console.log('👤 Usuario creado:', registerData.user.firstName, registerData.user.lastName);
      console.log('📧 Email:', registerData.user.email);
      console.log('🔑 Token recibido:', registerData.token ? 'Sí' : 'No');
    } else {
      console.log('❌ Error en registro:', registerData.message);
      console.log('📄 Respuesta completa:', registerData);
    }

    // 2. Probar registro con datos incompletos
    console.log('\n2️⃣ Probando registro con datos incompletos...');
    const incompleteData = {
      firstName: 'Test',
      email: 'incomplete@test.com',
      password: 'test123'
      // Faltan campos requeridos
    };

    const incompleteResponse = await makeRequest('POST', 'http://localhost:3001/api/auth/register', JSON.stringify(incompleteData), {
      'Content-Type': 'application/json'
    });

    console.log('📡 Status (incompleto):', incompleteResponse.status);
    const incompleteResponseData = JSON.parse(incompleteResponse.data);
    
    if (incompleteResponse.status === 400) {
      console.log('✅ Validación funcionando correctamente');
      console.log('❌ Error esperado:', incompleteResponseData.message);
    } else {
      console.log('⚠️ Validación no funcionó como esperado');
    }

    // 3. Verificar que el usuario fue creado en la base de datos
    console.log('\n3️⃣ Verificando usuario en base de datos...');
    
    // Login para obtener token de admin
    const loginResponse = await makeRequest('POST', 'http://localhost:3001/api/auth/login', JSON.stringify({
      email: 'admin@karoba.com',
      password: 'admin123'
    }), {
      'Content-Type': 'application/json'
    });

    if (loginResponse.status === 200) {
      const loginData = JSON.parse(loginResponse.data);
      const adminToken = loginData.token;

      // Obtener lista de usuarios
      const usersResponse = await makeRequest('GET', 'http://localhost:3001/api/users?page=1&limit=50', null, {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      });

      if (usersResponse.status === 200) {
        const usersData = JSON.parse(usersResponse.data);
        const testUser = usersData.data.users.find(u => u.email === testUserData.email);
        
        if (testUser) {
          console.log('✅ Usuario encontrado en base de datos');
          console.log('👤 Datos guardados:', {
            id: testUser.id,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            email: testUser.email,
            phone: testUser.phone,
            isActive: testUser.isActive
          });
        } else {
          console.log('❌ Usuario no encontrado en base de datos');
        }
      }
    }

    console.log('\n🎉 Pruebas completadas!');
    console.log('\n📋 Diagnóstico:');
    console.log('- API de registro:', registerResponse.status === 201 ? '✅ Funcionando' : '❌ Con problemas');
    console.log('- Validación de campos:', incompleteResponse.status === 400 ? '✅ Funcionando' : '❌ Con problemas');
    console.log('- Guardado en BD:', '✅ Verificar arriba');
    console.log('- Notificación WhatsApp:', '✅ Ver logs del servidor');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
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

testRegisterForm();