import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '../../.env' });

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'karoba_wellness',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Pool de conexiones
export const pool = mysql.createPool(dbConfig);

// Función para inicializar la base de datos
export const initializeDatabase = async () => {
  let connection;
  
  try {
    // Crear conexión temporal sin especificar base de datos
    const tempConfig = { ...dbConfig };
    const { database, ...configWithoutDb } = tempConfig;
    
    connection = await mysql.createConnection(configWithoutDb);
    
    // Crear base de datos si no existe
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    
    console.log(`✅ Base de datos '${dbConfig.database}' creada/verificada exitosamente`);
    
    // Cerrar conexión temporal
    await connection.end();
    
    // Crear tablas usando el pool principal
    await createTables();
    
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    if (connection) {
      await connection.end();
    }
    throw error;
  }
};

// Función para crear las tablas
const createTables = async () => {
  try {
    // Tabla de usuarios
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        birth_date DATE NULL,
        interests JSON NULL,
        is_active BOOLEAN DEFAULT TRUE,
        email_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        INDEX idx_email (email),
        INDEX idx_active (is_active),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Tabla de sesiones (para manejo avanzado de tokens)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        token_hash VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        user_agent TEXT NULL,
        ip_address VARCHAR(45) NULL,
        is_active BOOLEAN DEFAULT TRUE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_token_hash (token_hash),
        INDEX idx_expires_at (expires_at),
        INDEX idx_active (is_active)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Tabla de reservas (para futuras funcionalidades)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        tour_type ENUM('pasadia', 'tour', 'custom') NOT NULL,
        tour_name VARCHAR(255) NOT NULL,
        booking_date DATE NOT NULL,
        number_of_people INT NOT NULL DEFAULT 1,
        total_amount DECIMAL(10,2) NOT NULL,
        status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
        special_requests TEXT NULL,
        contact_phone VARCHAR(20) NULL,
        emergency_contact VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_booking_date (booking_date),
        INDEX idx_status (status),
        INDEX idx_tour_type (tour_type)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Tabla de contactos/leads
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NULL,
        message TEXT NOT NULL,
        source VARCHAR(50) DEFAULT 'website',
        status ENUM('new', 'contacted', 'converted', 'closed') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Todas las tablas creadas/verificadas exitosamente');
    
  } catch (error) {
    console.error('❌ Error creando tablas:', error);
    throw error;
  }
};

// Función para verificar la conexión (sin especificar base de datos)
export const testConnection = async () => {
  try {
    const tempConfig = { ...dbConfig };
    const { database, ...configWithoutDb } = tempConfig;
    
    const connection = await mysql.createConnection(configWithoutDb);
    await connection.ping();
    await connection.end();
    console.log('✅ Conexión a MySQL exitosa');
    return true;
  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error);
    return false;
  }
};

// Función para cerrar el pool de conexiones
export const closeDatabase = async () => {
  try {
    await pool.end();
    console.log('✅ Pool de conexiones cerrado');
  } catch (error) {
    console.error('❌ Error cerrando pool de conexiones:', error);
  }
};

export default pool;