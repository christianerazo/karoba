const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001';

async function debugAdminError() {
  console.log('🔍 Diagnosticando error del panel de administración...\n');

  try {
    // 1. Verificar servidor API
    console.log('1️⃣ Verificando servidor API...');
    try {
      const healthResponse = await fetch(`${API_URL}/health`);
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        console.log('✅ API funcionando:', healthData.status);
      } else {
        console.log('❌ API no responde correctamente');
        return;
      }
    } catch (error) {
      console.log('❌ No se puede conectar al servidor API');
      console.log('💡 Asegúrate de que el servidor esté ejecutándose en puerto 3001');
      return;
    }

    // 2. Probar login de admin
    console.log('\n2️⃣ Probando login de admin...');
    const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@karoba.com',
        password: 'admin123'
      })
    });

    if (!loginResponse.ok) {
      console.log('❌ Error en login de admin');
      const errorData = await loginResponse.json();
      console.log('Error:', errorData.message);
      console.log('💡 El usuario admin puede no existir. Ejecuta: node setup-crud.js');
      return;
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;
    console.log('✅ Login exitoso');
    console.log('👤 Usuario:', loginData.user.firstName, loginData.user.lastName);
    console.log('📧 Email:', loginData.user.email);

    // 3. Probar obtener usuarios con detalles
    console.log('\n3️⃣ Probando obtener usuarios...');
    const usersResponse = await fetch(`${API_URL}/api/users?page=1&limit=10`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Status de respuesta:', usersResponse.status);
    console.log('📋 Headers de respuesta:', Object.fromEntries(usersResponse.headers));

    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      console.log('✅ Usuarios obtenidos exitosamente');
      console.log('📊 Estructura de respuesta:', {
        success: usersData.success,
        dataExists: !!usersData.data,
        usersCount: usersData.data?.users?.length || 0,
        pagination: usersData.data?.pagination || 'No pagination'
      });
      
      if (usersData.data?.users?.length > 0) {
        console.log('👥 Primer usuario:', {
          id: usersData.data.users[0].id,
          email: usersData.data.users[0].email,
          firstName: usersData.data.users[0].firstName,
          lastName: usersData.data.users[0].lastName
        });
      }
    } else {
      console.log('❌ Error obteniendo usuarios');
      const errorText = await usersResponse.text();
      console.log('📄 Respuesta completa:', errorText);
      
      try {
        const errorData = JSON.parse(errorText);
        console.log('🔍 Error parseado:', errorData);
      } catch (e) {
        console.log('⚠️ No se pudo parsear la respuesta como JSON');
      }
    }

    // 4. Verificar base de datos directamente
    console.log('\n4️⃣ Verificando base de datos...');
    const mysql = require('mysql2/promise');
    
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'karoba_wellness'
      });

      const [users] = await connection.execute('SELECT COUNT(*) as total FROM users');
      const [adminUsers] = await connection.execute('SELECT COUNT(*) as total FROM users WHERE email = "admin@karoba.com"');
      
      console.log('✅ Conexión a MySQL exitosa');
      console.log('👥 Total usuarios en DB:', users[0].total);
      console.log('👑 Usuarios admin en DB:', adminUsers[0].total);

      await connection.end();
    } catch (dbError) {
      console.log('❌ Error conectando a MySQL:', dbError.message);
      console.log('💡 Verifica que MySQL esté funcionando y la base de datos exista');
    }

  } catch (error) {
    console.error('❌ Error general:', error.message);
    console.log('\n🔧 Pasos para solucionar:');
    console.log('1. Verifica que MySQL esté funcionando');
    console.log('2. Ejecuta: node setup-crud.js');
    console.log('3. Inicia el servidor API: npm run dev (en packages/api)');
    console.log('4. Verifica los logs del servidor API');
  }
}

debugAdminError();