const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001';

async function fixAdminPanel() {
  console.log('🔧 Solucionando problema del panel de administración...\n');

  let connection;
  
  try {
    // 1. Verificar conexión a MySQL
    console.log('1️⃣ Verificando MySQL...');
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'karoba_wellness'
    });
    console.log('✅ MySQL conectado');

    // 2. Verificar tabla users
    console.log('\n2️⃣ Verificando tabla users...');
    const [tables] = await connection.execute("SHOW TABLES LIKE 'users'");
    
    if (tables.length === 0) {
      console.log('❌ Tabla users no existe, creándola...');
      await connection.execute(`
        CREATE TABLE users (
          id VARCHAR(36) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          birth_date DATE,
          interests JSON,
          is_active BOOLEAN DEFAULT TRUE,
          email_verified BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          last_login TIMESTAMP NULL,
          INDEX idx_email (email),
          INDEX idx_active (is_active)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      console.log('✅ Tabla users creada');
    } else {
      console.log('✅ Tabla users existe');
    }

    // 3. Verificar/crear usuario admin
    console.log('\n3️⃣ Verificando usuario admin...');
    const [adminUsers] = await connection.execute(
      'SELECT id, email, first_name, last_name, is_active FROM users WHERE email = ?',
      ['admin@karoba.com']
    );

    if (adminUsers.length === 0) {
      console.log('❌ Usuario admin no existe, creándolo...');
      const adminId = uuidv4();
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await connection.execute(`
        INSERT INTO users (
          id, email, password, first_name, last_name, phone, 
          interests, is_active, email_verified
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        adminId,
        'admin@karoba.com',
        hashedPassword,
        'Admin',
        'Karoba',
        '+57 323 688 2227',
        JSON.stringify(['Administración']),
        true,
        true
      ]);
      console.log('✅ Usuario admin creado');
    } else {
      const admin = adminUsers[0];
      console.log('✅ Usuario admin existe:', {
        id: admin.id,
        email: admin.email,
        name: `${admin.first_name} ${admin.last_name}`,
        active: admin.is_active
      });
      
      if (!admin.is_active) {
        console.log('⚠️ Usuario admin inactivo, activándolo...');
        await connection.execute(
          'UPDATE users SET is_active = TRUE WHERE email = ?',
          ['admin@karoba.com']
        );
        console.log('✅ Usuario admin activado');
      }
    }

    // 4. Verificar que hay usuarios en la base de datos
    console.log('\n4️⃣ Verificando usuarios en la base de datos...');
    const [userCount] = await connection.execute('SELECT COUNT(*) as total FROM users WHERE is_active = TRUE');
    console.log(`👥 Total usuarios activos: ${userCount[0].total}`);

    if (userCount[0].total === 1) {
      console.log('📝 Solo existe el admin, creando usuarios de ejemplo...');
      const exampleUsers = [
        {
          email: 'test1@karoba.com',
          firstName: 'Usuario',
          lastName: 'Prueba 1',
          phone: '+57 300 111 1111'
        },
        {
          email: 'test2@karoba.com',
          firstName: 'Usuario',
          lastName: 'Prueba 2',
          phone: '+57 300 222 2222'
        }
      ];

      for (const userData of exampleUsers) {
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash('test123', 10);
        
        await connection.execute(`
          INSERT INTO users (
            id, email, password, first_name, last_name, phone, 
            interests, is_active, email_verified
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          userId,
          userData.email,
          hashedPassword,
          userData.firstName,
          userData.lastName,
          userData.phone,
          JSON.stringify(['Testing']),
          true,
          true
        ]);
      }
      console.log('✅ Usuarios de ejemplo creados');
    }

    await connection.end();

    // 5. Probar API si está disponible
    console.log('\n5️⃣ Probando API...');
    try {
      const healthResponse = await fetch(`${API_URL}/health`);
      if (healthResponse.ok) {
        console.log('✅ API funcionando');
        
        // Probar login
        const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'admin@karoba.com',
            password: 'admin123'
          })
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          console.log('✅ Login admin exitoso');
          
          // Probar obtener usuarios
          const usersResponse = await fetch(`${API_URL}/api/users?page=1&limit=10`, {
            headers: {
              'Authorization': `Bearer ${loginData.token}`,
              'Content-Type': 'application/json'
            }
          });

          if (usersResponse.ok) {
            const usersData = await usersResponse.json();
            console.log('✅ Obtención de usuarios exitosa');
            console.log(`👥 Usuarios obtenidos: ${usersData.data.users.length}`);
          } else {
            console.log('❌ Error obteniendo usuarios:', usersResponse.status);
            const errorText = await usersResponse.text();
            console.log('Error:', errorText);
          }
        } else {
          console.log('❌ Error en login admin');
        }
      } else {
        console.log('⚠️ API no disponible (esto es normal si no está ejecutándose)');
      }
    } catch (apiError) {
      console.log('⚠️ No se puede conectar a la API (ejecuta el servidor)');
    }

    console.log('\n🎉 Reparación completada!');
    console.log('\n📋 Pasos siguientes:');
    console.log('1. Inicia el servidor API: cd packages/api && npm run dev');
    console.log('2. Inicia el servidor Web: cd packages/web && npm run dev');
    console.log('3. Ve a: http://localhost:3000');
    console.log('4. Inicia sesión como admin@karoba.com / admin123');
    console.log('5. Accede al Panel de Administración');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixAdminPanel();