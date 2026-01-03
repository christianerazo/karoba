#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');

console.log('🔗 Conectando CRUD Visual con Base de Datos MySQL...\n');

async function connectCRUD() {
  try {
    // 1. Verificar archivos necesarios
    console.log('1️⃣ Verificando archivos del sistema...');
    
    const requiredFiles = [
      'packages/api/src/models/User.ts',
      'packages/api/src/routes/users.ts', 
      'packages/web/src/pages/admin/dashboard.tsx',
      'packages/api/src/config/database.ts'
    ];

    for (const file of requiredFiles) {
      if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
      } else {
        console.log(`❌ ${file} - FALTANTE`);
        return false;
      }
    }

    // 2. Configurar base de datos
    console.log('\n2️⃣ Configurando base de datos...');
    await runScript('node setup-crud.js');

    // 3. Verificar conexión
    console.log('\n3️⃣ Verificando conexión...');
    await runScript('node verify-crud.js');

    console.log('\n🎉 ¡CRUD VISUAL CONECTADO EXITOSAMENTE!');
    console.log('\n📋 Resumen de la configuración:');
    console.log('   🗄️  Base de datos: MySQL (karoba_wellness)');
    console.log('   👑 Usuario admin: admin@karoba.com / admin123');
    console.log('   🔗 API Backend: http://localhost:3001');
    console.log('   🌐 Frontend Web: http://localhost:3000');
    console.log('   📊 Panel Admin: /admin/dashboard');

    console.log('\n🚀 Para usar el CRUD:');
    console.log('   1. Ejecuta: npm run dev (en la raíz del proyecto)');
    console.log('   2. Ve a: http://localhost:3000');
    console.log('   3. Inicia sesión como admin');
    console.log('   4. Accede al Panel de Administración');
    console.log('   5. ¡Gestiona usuarios con interfaz visual!');

    console.log('\n📖 Documentación completa: CRUD_GUIDE.md');

    return true;

  } catch (error) {
    console.error('❌ Error conectando CRUD:', error.message);
    return false;
  }
}

function runScript(command) {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    const process = spawn(cmd, args, { stdio: 'inherit' });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script failed with code ${code}`));
      }
    });
  });
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  connectCRUD();
}

module.exports = { connectCRUD };