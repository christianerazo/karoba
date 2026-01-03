const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function createAdminUser() {
  let connection;
  
  try {
    // Conectar a MySQL
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'karoba_wellness'
    });

    console.log('🔍 Verificando usuario admin...');
    
    // Verificar si el admin ya existe
    const [existingUsers] = await connection.execute(
      'SELECT id, email, first_name, last_name FROM users WHERE email = ?',
      ['admin@karoba.com']
    );

    if (existingUsers.length > 0) {
      console.log('✅ Usuario admin ya existe:');
      console.log(existingUsers[0]);
      return;
    }

    console.log('📝 Creando usuario admin...');
    
    // Crear usuario admin
    const adminId = uuidv4();
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await connection.execute(`
      INSERT INTO users (
        id, email, password, first_name, last_name, phone, 
        interests, is_active, email_verified, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
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

    console.log('✅ Usuario admin creado exitosamente');
    console.log('📧 Email: admin@karoba.com');
    console.log('🔑 Password: admin123');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createAdminUser();