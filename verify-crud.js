const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001';
const WEB_URL = 'http://localhost:3000';

async function verifyCRUD() {
  console.log('🔍 Verificando conexión CRUD completa...\n');

  try {
    // 1. Verificar servidor API
    console.log('1️⃣ Verificando servidor API...');
    try {
      const healthResponse = await fetch(`${API_URL}/health`);
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        console.log('✅ API funcionando:', healthData.status);
      } else {
        console.log('❌ API no responde');
        return false;
      }
    } catch (error) {
      console.log('❌ No se puede conectar al servidor API');
      console.log('💡 Ejecuta: npm run dev:api');
      return false;
    }

    // 2. Verificar servidor Web
    console.log('\n2️⃣ Verificando servidor Web...');
    try {
      const webResponse = await fetch(WEB_URL);
      if (webResponse.ok) {
        console.log('✅ Servidor Web funcionando');
      } else {
        console.log('❌ Servidor Web no responde');
      }
    } catch (error) {
      console.log('❌ No se puede conectar al servidor Web');
      console.log('💡 Ejecuta: npm run dev:web');
    }

    // 3. Probar autenticación admin
    console.log('\n3️⃣ Probando autenticación admin...');
    const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@karoba.com',
        password: 'admin123'
      })
    });

    if (!loginResponse.ok) {
      console.log('❌ Error en login de admin');
      const errorData = await loginResponse.json();
      console.log('Error:', errorData.message);
      console.log('💡 Ejecuta: node setup-crud.js');
      return false;
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;
    console.log('✅ Login admin exitoso');

    // 4. Probar operaciones CRUD
    console.log('\n4️⃣ Probando operaciones CRUD...');
    
    // READ - Obtener usuarios
    const usersResponse = await fetch(`${API_URL}/api/users?page=1&limit=10`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!usersResponse.ok) {
      console.log('❌ Error obteniendo usuarios');
      return false;
    }

    const usersData = await usersResponse.json();
    console.log('✅ READ: Usuarios obtenidos -', usersData.data.users.length, 'usuarios');

    // CREATE - Crear usuario de prueba
    const testUser = {
      email: `test-${Date.now()}@karoba.com`,
      password: 'test123',
      firstName: 'Test',
      lastName: 'User',
      phone: '+57 300 000 0000',
      interests: ['Testing', 'CRUD']
    };

    const createResponse = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    });

    if (!createResponse.ok) {
      console.log('❌ Error creando usuario');
      return false;
    }

    const createData = await createResponse.json();
    const testUserId = createData.data.id;
    console.log('✅ CREATE: Usuario creado -', createData.data.email);

    // UPDATE - Actualizar usuario
    const updateResponse = await fetch(`${API_URL}/api/users/${testUserId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: 'Updated',
        lastName: 'User'
      })
    });

    if (!updateResponse.ok) {
      console.log('❌ Error actualizando usuario');
      return false;
    }

    console.log('✅ UPDATE: Usuario actualizado');

    // DELETE - Eliminar usuario
    const deleteResponse = await fetch(`${API_URL}/api/users/${testUserId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!deleteResponse.ok) {
      console.log('❌ Error eliminando usuario');
      return false;
    }

    console.log('✅ DELETE: Usuario eliminado');

    // 5. Verificar estadísticas
    console.log('\n5️⃣ Estadísticas del sistema:');
    console.log(`📊 Total usuarios: ${usersData.data.pagination.total}`);
    console.log(`📄 Página actual: ${usersData.data.pagination.page}`);
    console.log(`📋 Usuarios por página: ${usersData.data.pagination.limit}`);

    console.log('\n🎉 ¡CRUD completamente funcional!');
    console.log('\n🚀 Pasos para usar el panel admin:');
    console.log('   1. Ve a: http://localhost:3000');
    console.log('   2. Haz clic en "Iniciar Sesión"');
    console.log('   3. Usa: admin@karoba.com / admin123');
    console.log('   4. Accede al "Panel de Administración"');
    console.log('   5. Gestiona usuarios con CRUD visual');

    return true;

  } catch (error) {
    console.error('❌ Error en verificación:', error.message);
    return false;
  }
}

verifyCRUD();