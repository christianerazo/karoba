import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Importar configuración de base de datos
import { initializeDatabase, testConnection } from './config/database';

// Importar rutas
import authRoutes from './routes/auth';
import destinationRoutes from './routes/destinations';
import bookingRoutes from './routes/bookings';
import reviewRoutes from './routes/reviews';
import userRoutes from './routes/users';
import notificationRoutes from './routes/notifications';

// Importar middlewares
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Función para inicializar el servidor
async function startServer() {
  try {
    // Probar conexión a la base de datos
    console.log('📡 Conectando a MySQL...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ No se pudo conectar a MySQL');
      console.error('💡 Ejecuta: npm run init-db para configurar la base de datos');
      process.exit(1);
    }
    
    // Inicializar base de datos y tablas
    console.log('🏗️  Inicializando base de datos...');
    await initializeDatabase();
    
    console.log('✅ Base de datos lista');
    
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    process.exit(1);
  }
}

// Middlewares globales
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3002',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    database: 'MySQL Connected'
  });
});

// Middlewares de manejo de errores
app.use(notFound);
app.use(errorHandler);

// Inicializar servidor
async function init() {
  await startServer();
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor API ejecutándose en puerto ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`🗄️  Base de datos: MySQL (karoba_wellness)`);
    console.log(`🎯 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  });
}

// Iniciar aplicación
init().catch((error) => {
  console.error('❌ Error iniciando servidor:', error);
  process.exit(1);
});