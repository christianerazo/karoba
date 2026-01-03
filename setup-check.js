// Script para verificar que todo esté configurado correctamente
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function checkSetup() {
  console.log('🔍 Verificando configuración de Karoba Wellness Travel...\n');
  
  let allGood = true;
  
  // 1. Verificar archivo .env
  console.log('1️⃣ Verificando archivo .env...');
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      if (envContent.includes('DB_HOST=localhost') && envContent.includes('DB_USER=root')) {
        console.log('   ✅ Archivo .env encontrado y configurado');
      } else {
        console.log('   ⚠️  Archivo .env existe pero puede tener configuración incorrecta');
      }
    } else {
      console.log('   ❌ Archivo .env no encontrado');
      allGood = false;
    }
  } catch (error) {
    console.log('   ❌ Error leyendo .env:', error.message);
    allGood = false;
  }
  
  // 2. Verificar conexión MySQL
  console.log('\n2️⃣ Verificando conexión a MySQL...');
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: parseInt(process.env.DB_PORT || '3306')
    });
    
    await connection.ping();
    console.log('   ✅ Conexión a MySQL exitosa');
    await connection.end();
  } catch (error) {
    console.log('   ❌ Error conectando a MySQL:', error.message);
    console.log('   💡 Verificar contraseña en archivo .env');
    allGood = false;
  }
  
  // 3. Verificar dependencias de API
  console.log('\n3️⃣ Verificando dependencias de API...');
  try {
    const apiPackagePath = path.join(__dirname, 'packages', 'api', 'package.json');
    const nodeModulesPath = path.join(__dirname, 'packages', 'api', 'node_modules');
    
    if (fs.existsSync(apiPackagePath) && fs.existsSync(nodeModulesPath)) {
      console.log('   ✅ Dependencias de API instaladas');
    } else {
      console.log('   ❌ Dependencias de API no instaladas');
      console.log('   💡 Ejecutar: cd packages/api && npm install');
      allGood = false;
    }
  } catch (error) {
    console.log('   ❌ Error verificando dependencias:', error.message);
    allGood = false;
  }
  
  // 4. Verificar estructura de archivos
  console.log('\n4️⃣ Verificando estructura de archivos...');
  const requiredFiles = [
    'packages/api/src/config/database.ts',
    'packages/api/src/models/User.ts',
    'packages/api/src/routes/auth.ts',
    'packages/api/src/scripts/init-db.ts'
  ];
  
  let filesOk = true;
  for (const file of requiredFiles) {
    if (fs.existsSync(path.join(__dirname, file))) {
      console.log(`   ✅ ${file}`);
    } else {
      console.log(`   ❌ ${file} no encontrado`);
      filesOk = false;
    }
  }
  
  if (filesOk) {
    console.log('   ✅ Todos los archivos necesarios están presentes');
  } else {
    allGood = false;
  }
  
  // Resumen final
  console.log('\n' + '='.repeat(50));
  if (allGood) {
    console.log('🎉 ¡Todo está configurado correctamente!');
    console.log('\n📋 Próximos pasos:');
    console.log('   1. cd packages/api');
    console.log('   2. npm run init-db');
    console.log('   3. npm run dev');
    console.log('   4. Abrir http://localhost:3001/health');
  } else {
    console.log('⚠️  Hay algunos problemas que resolver');
    console.log('\n📋 Pasos recomendados:');
    console.log('   1. Instalar MySQL si no está instalado');
    console.log('   2. Verificar que MySQL esté ejecutándose');
    console.log('   3. cd packages/api && npm install');
    console.log('   4. Ejecutar este script nuevamente');
  }
  console.log('='.repeat(50));
}

checkSetup().catch(console.error);