const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function setupCRUD() {
  let connection;
  
  try {
    console.log('🚀 Configurando CRUD para Karoba Wellness Travel...\n');

    // 1. Conectar a MySQL
    console.log('1️⃣ Conectando a MySQL...');
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'karoba_wellness'
    });
    console.log('✅ Conectado a MySQL');

    // 2. Verificar que las tablas existan
    console.log('\n2️⃣ Verificando estructura de base de datos...');
    const [tables] = await connection.execute("SHOW TABLES LIKE 'users'");
    
    if (tables.length === 0) {
      console.log('📝 Creando tabla users...');
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
          INDEX idx_active (is_active),
          INDEX idx_created (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      console.log('✅ Tabla users creada');
    } else {
      console.log('✅ Tabla users existe');
    }

    // 3. Verificar/crear usuario admin
    console.log('\n3️⃣ Configurando usuario administrador...');
    const [adminUsers] = await connection.execute(
      'SELECT id, email FROM users WHERE email = ?',
      ['admin@karoba.com']
    );

    if (adminUsers.length === 0) {
      console.log('📝 Creando usuario admin...');
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
        JSON.stringify(['Administración', 'Gestión de usuarios']),
        true,
        true
      ]);
      console.log('✅ Usuario admin creado');
    } else {
      console.log('✅ Usuario admin existe');
    }

    // 4. Crear algunos usuarios de ejemplo
    console.log('\n4️⃣ Creando usuarios de ejemplo...');
    const exampleUsers = [
      {
        email: 'maria.rodriguez@email.com',
        firstName: 'María',
        lastName: 'Rodríguez',
        phone: '+57 300 123 4567',
        interests: ['Wellness', 'Yoga', 'Meditación']
      },
      {
        email: 'carlos.mendoza@email.com',
        firstName: 'Carlos',
        lastName: 'Mendoza',
        phone: '+57 301 234 5678',
        interests: ['Aventura', 'Naturaleza', 'Fotografía']
      },
      {
        email: 'ana.herrera@email.com',
        firstName: 'Ana',
        lastName: 'Herrera',
        phone: '+57 302 345 6789',
        interests: ['Spa', 'Relajación', 'Gastronomía']
      }
    ];

    for (const userData of exampleUsers) {
      const [existing] = await connection.execute(
        'SELECT id FROM users WHERE email = ?',
        [userData.email]
      );

      if (existing.length === 0) {
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash('user123', 10);
        
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
          JSON.stringify(userData.interests),
          true,
          true
        ]);
        console.log(`✅ Usuario ${userData.firstName} ${userData.lastName} creado`);
      }
    }

    // 5. Mostrar estadísticas
    console.log('\n5️⃣ Estadísticas finales:');
    const [userCount] = await connection.execute('SELECT COUNT(*) as total FROM users WHERE is_active = TRUE');
    const [adminCount] = await connection.execute('SELECT COUNT(*) as total FROM users WHERE email = "admin@karoba.com"');
    
    console.log(`👥 Total usuarios activos: ${userCount[0].total}`);
    console.log(`👑 Usuarios admin: ${adminCount[0].total}`);

    console.log('\n🎉 CRUD configurado exitosamente!');
    console.log('\n📋 Credenciales de acceso:');
    console.log('   📧 Email: admin@karoba.com');
    console.log('   🔑 Password: admin123');
    console.log('\n🌐 Para acceder al panel:');
    console.log('   1. Inicia sesión con las credenciales de admin');
    console.log('   2. Ve a la sección "Admin" en el menú');
    console.log('   3. Gestiona usuarios con las funciones CRUD');

  } catch (error) {
    console.error('❌ Error configurando CRUD:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupCRUD();