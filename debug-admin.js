const mysql = require('mysql2/promise');

async function checkAdmin() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'karoba_wellness'
    });

    console.log('🔍 Verificando usuario admin...');
    
    const [rows] = await connection.execute(
      'SELECT id, email, firstName, lastName, isActive FROM users WHERE email = ?',
      ['admin@karoba.com']
    );

    if (rows.length > 0) {
      console.log('✅ Usuario admin encontrado:');
      console.log(rows[0]);
    } else {
      console.log('❌ Usuario admin NO encontrado');
      console.log('💡 Creando usuario admin...');
      
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await connection.execute(
        'INSERT INTO users (email, password, firstName, lastName, phone, isActive, emailVerified) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['admin@karoba.com', hashedPassword, 'Admin', 'Karoba', '+57 323 688 2227', true, true]
      );
      
      console.log('✅ Usuario admin creado exitosamente');
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkAdmin();