const http = require('http');

async function testRegisterFinal() {
  console.log('🎯 PRUEBA FINAL DEL FORMULARIO DE REGISTRO\n');

  try {
    // 1. Verificar que los servidores estén funcionando
    console.log('1️⃣ Verificando servidores...');
    
    // API Server
    const apiResponse = await makeRequest('GET', 'http://localhost:3001/health');
    if (apiResponse.status === 200) {
      console.log('✅ API Server funcionando (puerto 3001)');
    } else {
      console.log('❌ API Server no responde');
      return;
    }
    
    // Web Server
    const webResponse = await makeRequest('GET', 'http://localhost:3002');
    if (webResponse.status === 200) {
      console.log('✅ Web Server funcionando (puerto 3002)');
    } else {
      console.log('❌ Web Server no responde');
      return;
    }

    // 2. Probar registro completo
    console.log('\n2️⃣ Probando registro completo...');
    const testUser = {
      firstName: 'Test',
      lastName: 'Final',
      email: `test.final.${Date.now()}@karoba.com`,
      phone: '+57 300 999 7777',
      password: 'test123456',
      birthDate: '1995-05-15',
      interests: ['wellness', 'nature']
    };

    console.log('📝 Datos de prueba:', {
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      email: testUser.email,
      phone: testUser.phone
    });

    const registerResponse = await makeRequest('POST', 'http://localhost:3001/api/auth/register', JSON.stringify(testUser), {
      'Content-Type': 'application/json'
    });

    console.log('📡 Status registro:', registerResponse.status);
    
    if (registerResponse.status === 201) {
      const registerData = JSON.parse(registerResponse.data);
      console.log('✅ Registro exitoso');
      console.log('👤 Usuario:', registerData.user.firstName, registerData.user.lastName);
      console.log('🔑 Token:', registerData.token ? 'Recibido' : 'No recibido');
      
      // 3. Verificar notificación WhatsApp en logs
      console.log('\n3️⃣ Verificando notificación WhatsApp...');
      console.log('💬 Revisa los logs del servidor API para ver el mensaje de WhatsApp');
      console.log('📞 Número destino: +57 314 621 8506');
      
    } else {
      const errorData = JSON.parse(registerResponse.data);
      console.log('❌ Error en registro:', errorData.message);
    }

    // 4. Instrucciones para prueba manual
    console.log('\n4️⃣ PRUEBA MANUAL EN NAVEGADOR:');
    console.log('🌐 Ve a: http://localhost:3002/register');
    console.log('📝 Llena el formulario con estos datos:');
    console.log('   - Nombre: Test');
    console.log('   - Apellido: Manual');
    console.log('   - Email: test.manual@karoba.com');
    console.log('   - Teléfono: +57 300 888 9999');
    console.log('   - Contraseña: test123456');
    console.log('   - Confirmar: test123456');
    console.log('   - Términos: ✓ Marcar');
    console.log('🔍 Abre herramientas de desarrollador (F12) → Console');
    console.log('🖱️ Haz clic en "Únete a Karoba"');
    console.log('👀 Observa los logs en la consola');

    console.log('\n📊 RESULTADOS ESPERADOS:');
    console.log('✅ Logs en consola del navegador');
    console.log('✅ Mensaje de éxito verde');
    console.log('✅ Modal de WhatsApp después de 1.5s');
    console.log('✅ Redirección a home después de 3s');
    console.log('✅ Usuario en panel de admin');
    console.log('✅ Notificación WhatsApp en logs del servidor');

    console.log('\n🔧 SI NO FUNCIONA:');
    console.log('1. Verificar errores en consola del navegador');
    console.log('2. Verificar que todos los campos estén llenos');
    console.log('3. Verificar que términos esté marcado');
    console.log('4. Probar con email diferente');
    console.log('5. Limpiar caché del navegador (Ctrl+F5)');

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

testRegisterFinal();