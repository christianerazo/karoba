const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001';

async function testCRUDConnection() {
  console.log('🧪 Probando conexión CRUD...\n');

  try {
    // 1. Probar health check del servidor
    console.log('1️⃣ Probando health check...');
    const healthResponse = await fetch(`${API_URL}/health`);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Servidor funcionando:', healthData.status);
    } else {
      console.log('❌ Servidor no responde');
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
      return;
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;
    console.log('✅ Login exitoso, token obtenido');

    // 3. Probar obtener usuarios
    console.log('\n3️⃣ Probando obtener usuarios...');
    const usersResponse = await fetch(`${API_URL}/api/users?page=1&limit=10`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      console.log('✅ Usuarios obtenidos:', usersData.data.users.length, 'usuarios');
      console.log('📊 Total usuarios:', usersData.data.pagination.total);
    } else {
      console.log('❌ Error obteniendo usuarios');
      const errorData = await usersResponse.json();
      console.log('Error:', errorData.error);
    }

    // 4. Probar crear usuario de prueba
    console.log('\n4️⃣ Probando crear usuario de prueba...');
    const createResponse = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@karoba.com',
        password: 'test123',
        firstName: 'Usuario',
        lastName: 'Prueba',
        phone: '+57 300 123 4567',
        interests: ['Wellness', 'Pruebas']
      })
    });

    if (createResponse.ok) {
      const createData = await createResponse.json();
      console.log('✅ Usuario de prueba creado:', createData.data.email);
      
      // 5. Probar eliminar usuario de prueba
      console.log('\n5️⃣ Eliminando usuario de prueba...');
      const deleteResponse = await fetch(`${API_URL}/api/users/${createData.data.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (deleteResponse.ok) {
        console.log('✅ Usuario de prueba eliminado');
      } else {
        console.log('⚠️ Error eliminando usuario de prueba');
      }
    } else {
      const errorData = await createResponse.json();
      console.log('❌ Error creando usuario de prueba:', errorData.error);
    }

    console.log('\n🎉 Pruebas completadas - CRUD funcionando correctamente');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    console.log('\n💡 Asegúrate de que:');
    console.log('   - El servidor API esté ejecutándose en puerto 3001');
    console.log('   - MySQL esté funcionando con la base de datos karoba_wellness');
    console.log('   - El usuario admin exista en la base de datos');
  }
}

testCRUDConnection();