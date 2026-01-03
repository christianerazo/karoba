// Script simple para probar la conexión a MySQL
const mysql = require('mysql2/promise');
require('dotenv').config();

async function testMySQL() {
  console.log('🧪 Probando conexión a MySQL...');
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '3306')
  };
  
  console.log(`📡 Conectando a: ${config.user}@${config.host}:${config.port}`);
  console.log(`🔑 Usando contraseña: ${config.password ? '***' : '(vacía)'}`);
  
  try {
    const connection = await mysql.createConnection(config);
    
    console.log('✅ Conexión exitosa a MySQL');
    
    // Probar crear base de datos
    await connection.execute('CREATE DATABASE IF NOT EXISTS karoba_wellness_test');
    console.log('✅ Base de datos de prueba creada');
    
    // Limpiar
    await connection.execute('DROP DATABASE IF EXISTS karoba_wellness_test');
    console.log('✅ Base de datos de prueba eliminada');
    
    await connection.end();
    console.log('🎉 ¡MySQL está funcionando correctamente!');
    
  } catch (error) {
    console.error('❌ Error conectando a MySQL:');
    console.error('   Mensaje:', error.message);
    console.error('');
    console.error('💡 Posibles soluciones:');
    console.error('   1. Verificar contraseña en archivo .env');
    console.error('   2. Verificar que MySQL esté ejecutándose');
    console.error('   3. Verificar credenciales (usuario/contraseña)');
    console.error('   4. Verificar que el puerto 3306 esté disponible');
  }
}

testMySQL();