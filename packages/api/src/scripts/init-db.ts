import { initializeDatabase, testConnection, closeDatabase } from '../config/database';

async function initDB() {
  console.log('🚀 Iniciando configuración de base de datos MySQL...');
  
  try {
    // Probar conexión
    console.log('📡 Probando conexión a MySQL...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ No se pudo conectar a MySQL. Verifica que:');
      console.error('   1. MySQL esté instalado y ejecutándose');
      console.error('   2. Las credenciales en .env sean correctas');
      console.error('   3. El puerto 3306 esté disponible');
      process.exit(1);
    }
    
    // Inicializar base de datos y tablas
    console.log('🏗️  Creando base de datos y tablas...');
    await initializeDatabase();
    
    console.log('✅ ¡Base de datos configurada exitosamente!');
    console.log('');
    console.log('📊 Estructura creada:');
    console.log('   • Base de datos: karoba_wellness');
    console.log('   • Tabla: users (usuarios registrados)');
    console.log('   • Tabla: user_sessions (sesiones activas)');
    console.log('   • Tabla: bookings (reservas)');
    console.log('   • Tabla: contacts (contactos/leads)');
    console.log('');
    console.log('🎉 ¡Listo para usar!');
    
  } catch (error) {
    console.error('❌ Error configurando base de datos:', error);
    process.exit(1);
  } finally {
    await closeDatabase();
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  initDB();
}

export default initDB;