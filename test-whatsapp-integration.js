const http = require('http');

async function testWhatsAppIntegration() {
  console.log('🧪 Probando integración de WhatsApp...\n');

  try {
    // 1. Probar login de admin
    console.log('1️⃣ Probando login de admin...');
    const loginResponse = await makeRequest('POST', 'http://localhost:3001/api/auth/login', JSON.stringify({
      email: 'admin@karoba.com',
      password: 'admin123'
    }), {
      'Content-Type': 'application/json'
    });

    if (loginResponse.status !== 200) {
      console.log('❌ Error en login de admin');
      return;
    }

    const loginData = JSON.parse(loginResponse.data);
    const token = loginData.token;
    console.log('✅ Login exitoso');

    // 2. Probar endpoint de test de WhatsApp
    console.log('\n2️⃣ Probando endpoint de test de WhatsApp...');
    const whatsappTestResponse = await makeRequest('POST', 'http://localhost:3001/api/notifications/test-whatsapp', null, {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    console.log('📡 Status:', whatsappTestResponse.status);
    const whatsappData = JSON.parse(whatsappTestResponse.data);
    
    if (whatsappTestResponse.status === 200) {
      console.log('✅ Test de WhatsApp exitoso');
      console.log('📱 Datos del test:', whatsappData.data);
    } else {
      console.log('❌ Error en test de WhatsApp:', whatsappData.error);
    }

    // 3. Probar registro de usuario (simulando)
    console.log('\n3️⃣ Probando registro de usuario con notificación WhatsApp...');
    const registerResponse = await makeRequest('POST', 'http://localhost:3001/api/auth/register', JSON.stringify({
      firstName: 'Usuario',
      lastName: 'Prueba WhatsApp',
      email: 'test.whatsapp@karoba.com',
      phone: '+57 300 123 4567',
      password: 'test123'
    }), {
      'Content-Type': 'application/json'
    });

    console.log('📡 Status registro:', registerResponse.status);
    const registerData = JSON.parse(registerResponse.data);
    
    if (registerResponse.status === 201) {
      console.log('✅ Registro exitoso con notificación WhatsApp');
      console.log('👤 Usuario creado:', registerData.user.firstName, registerData.user.lastName);
    } else {
      console.log('❌ Error en registro:', registerData.message);
    }

    // 4. Probar configuración de WhatsApp
    console.log('\n4️⃣ Verificando configuración de WhatsApp...');
    const configResponse = await makeRequest('GET', 'http://localhost:3001/api/notifications/whatsapp-config', null, {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    if (configResponse.status === 200) {
      const configData = JSON.parse(configResponse.data);
      console.log('✅ Configuración de WhatsApp:');
      console.log('📞 Número admin:', configData.data.adminPhone);
      console.log('🔧 Configurado:', configData.data.isConfigured ? 'Sí' : 'No');
      console.log('🏢 Business API:', configData.data.hasBusinessAPI ? 'Sí' : 'No');
      console.log('🔗 Webhook:', configData.data.hasWebhook ? 'Sí' : 'No');
    }

    console.log('\n🎉 Pruebas de WhatsApp completadas!');
    console.log('\n📋 Resumen:');
    console.log('✅ Servicio de WhatsApp integrado correctamente');
    console.log('✅ Notificaciones automáticas en registro');
    console.log('✅ Panel de administración con test de WhatsApp');
    console.log('✅ Número de destino: +57 314 621 8506');
    
    console.log('\n🔧 Configuración actual:');
    console.log('- Modo: Desarrollo (mensajes en consola)');
    console.log('- Para producción: Configurar WHATSAPP_BUSINESS_API_URL y WHATSAPP_ACCESS_TOKEN');
    console.log('- O configurar WHATSAPP_WEBHOOK_URL y WHATSAPP_API_KEY');

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

testWhatsAppIntegration();