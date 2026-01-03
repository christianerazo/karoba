# 🗄️ Configuración de MySQL para Karoba Wellness Travel

## 📋 Requisitos Previos

### 1. Instalar MySQL en Windows

**Opción A: MySQL Installer (Recomendado)**
1. Ir a: https://dev.mysql.com/downloads/installer/
2. Descargar "mysql-installer-community-8.x.x.x.msi"
3. Ejecutar el instalador como administrador
4. Seleccionar "Developer Default" o "Server only"
5. Durante la configuración:
   - **Puerto:** 3306 (mantener por defecto)
   - **Usuario root:** Dejar contraseña VACÍA (más fácil para desarrollo)
   - **Servicio Windows:** Activar "Start the MySQL Server at System Startup"

**Opción B: Instalación Manual**
1. Descargar MySQL Community Server ZIP
2. Extraer en C:\mysql
3. Configurar variables de entorno
4. Inicializar servicio manualmente

**Verificar Instalación:**
```cmd
mysql --version
```

### 2. Iniciar Servicio MySQL (si no está ejecutándose)
```cmd
# Como administrador
net start mysql80
# o
services.msc (buscar MySQL80 y iniciar)
```

**macOS:**
```bash
# Usando Homebrew
brew install mysql
brew services start mysql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

### 2. Verificar Instalación
```bash
mysql --version
```

### 3. Configurar Usuario Root (si es necesario)
```bash
# Conectar a MySQL
mysql -u root -p

# Crear usuario (opcional)
CREATE USER 'karoba'@'localhost' IDENTIFIED BY 'tu_contraseña_aqui';
GRANT ALL PRIVILEGES ON *.* TO 'karoba'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## ⚙️ Configuración del Proyecto

### 1. Variables de Entorno
El archivo `.env` ya está configurado correctamente:

```env
# Base de datos MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=karoba_wellness
DB_PORT=3306
```

**IMPORTANTE:** Si durante la instalación de MySQL configuraste una contraseña para el usuario root, actualiza `DB_PASSWORD=tu_contraseña_aqui`

### 2. Probar Conexión MySQL
```cmd
# Desde la raíz del proyecto
node test-mysql.js
```

Si ves "🎉 ¡MySQL está funcionando correctamente!" continúa al paso 3.

### 3. Inicializar Base de Datos
```cmd
# Instalar dependencias si no lo has hecho
cd packages/api
npm install

# Inicializar base de datos
npm run init-db
```

### 4. Iniciar el Servidor API
```cmd
# Desde packages/api
npm run dev
```

### 5. Verificar que Todo Funciona
- API corriendo en: http://localhost:3001/health
- Deberías ver: `"database": "MySQL Connected"`

## 📊 Estructura de la Base de Datos

### Tabla: `users`
```sql
- id (VARCHAR(36)) - UUID único
- email (VARCHAR(255)) - Email único del usuario
- password (VARCHAR(255)) - Contraseña encriptada
- first_name (VARCHAR(100)) - Nombre
- last_name (VARCHAR(100)) - Apellido
- phone (VARCHAR(20)) - Teléfono
- birth_date (DATE) - Fecha de nacimiento
- interests (JSON) - Intereses del usuario
- is_active (BOOLEAN) - Estado activo
- email_verified (BOOLEAN) - Email verificado
- created_at (TIMESTAMP) - Fecha de creación
- updated_at (TIMESTAMP) - Última actualización
- last_login (TIMESTAMP) - Último inicio de sesión
```

### Tabla: `user_sessions`
```sql
- id (VARCHAR(36)) - UUID de la sesión
- user_id (VARCHAR(36)) - ID del usuario
- token_hash (VARCHAR(255)) - Hash del token
- expires_at (TIMESTAMP) - Expiración del token
- created_at (TIMESTAMP) - Creación de la sesión
- last_used (TIMESTAMP) - Último uso
- user_agent (TEXT) - Información del navegador
- ip_address (VARCHAR(45)) - Dirección IP
- is_active (BOOLEAN) - Estado activo
```

### Tabla: `bookings`
```sql
- id (VARCHAR(36)) - UUID de la reserva
- user_id (VARCHAR(36)) - ID del usuario
- tour_type (ENUM) - Tipo de tour (pasadia, tour, custom)
- tour_name (VARCHAR(255)) - Nombre del tour
- booking_date (DATE) - Fecha de la reserva
- number_of_people (INT) - Número de personas
- total_amount (DECIMAL(10,2)) - Monto total
- status (ENUM) - Estado (pending, confirmed, cancelled, completed)
- special_requests (TEXT) - Solicitudes especiales
- contact_phone (VARCHAR(20)) - Teléfono de contacto
- emergency_contact (VARCHAR(255)) - Contacto de emergencia
- created_at (TIMESTAMP) - Fecha de creación
- updated_at (TIMESTAMP) - Última actualización
```

### Tabla: `contacts`
```sql
- id (VARCHAR(36)) - UUID del contacto
- name (VARCHAR(255)) - Nombre del contacto
- email (VARCHAR(255)) - Email del contacto
- phone (VARCHAR(20)) - Teléfono
- message (TEXT) - Mensaje
- source (VARCHAR(50)) - Fuente del contacto
- status (ENUM) - Estado (new, contacted, converted, closed)
- created_at (TIMESTAMP) - Fecha de creación
- updated_at (TIMESTAMP) - Última actualización
```

## 🚀 Comandos Útiles

### Inicializar/Reinicializar Base de Datos
```bash
cd packages/api
npm run init-db
```

### Conectar a MySQL desde Terminal
```bash
mysql -u root -p karoba_wellness
```

### Ver Tablas Creadas
```sql
USE karoba_wellness;
SHOW TABLES;
DESCRIBE users;
```

### Consultar Usuarios Registrados
```sql
SELECT id, email, first_name, last_name, created_at FROM users;
```

## 🔧 Solución de Problemas

### Error: "Access denied for user 'root'@'localhost'"
**Solución 1:** Contraseña vacía (más común)
- En `.env` asegurar que `DB_PASSWORD=` esté vacío
- Reiniciar el servidor API

**Solución 2:** Contraseña configurada
- Actualizar `.env` con `DB_PASSWORD=tu_contraseña`
- Reiniciar el servidor API

**Solución 3:** Resetear contraseña de MySQL
```cmd
# Parar servicio MySQL
net stop mysql80

# Iniciar en modo seguro y resetear contraseña
mysqld --skip-grant-tables
mysql -u root
UPDATE mysql.user SET authentication_string='' WHERE User='root';
FLUSH PRIVILEGES;
EXIT;

# Reiniciar servicio normal
net start mysql80
```

### Error: "Can't connect to MySQL server"
- Verificar que MySQL esté ejecutándose: `net start mysql80`
- Verificar puerto 3306 disponible
- Verificar firewall de Windows

### Error: "Database doesn't exist"
- Ejecutar: `npm run init-db` desde `packages/api`
- El script creará automáticamente la base de datos

### Error: "Module not found" o dependencias
```cmd
# Reinstalar dependencias
cd packages/api
npm install

# Si persiste el error
npm install mysql2 bcrypt jsonwebtoken uuid
```

## 📈 Ventajas de MySQL vs JSON

✅ **Rendimiento:** Consultas más rápidas con índices
✅ **Escalabilidad:** Maneja miles de usuarios sin problemas
✅ **Integridad:** Relaciones y constraints automáticos
✅ **Seguridad:** Mejor control de acceso y permisos
✅ **Backup:** Herramientas nativas de respaldo
✅ **Concurrencia:** Múltiples usuarios simultáneos
✅ **Análisis:** Consultas complejas y reportes

## 🎯 Próximos Pasos

1. ✅ Configurar MySQL
2. ✅ Ejecutar `npm run init-db`
3. ✅ Probar registro de usuario
4. ✅ Probar inicio de sesión
5. 🔄 Implementar funcionalidades adicionales (reservas, contactos)

¡Tu sistema de autenticación con MySQL está listo para producción! 🚀