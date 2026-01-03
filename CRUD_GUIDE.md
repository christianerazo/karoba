# 🎯 Guía del CRUD Visual - Karoba Wellness Travel

## 📋 Descripción
Sistema completo de gestión de usuarios con interfaz visual conectado a base de datos MySQL.

## 🚀 Configuración Inicial

### 1. Configurar Base de Datos
```bash
# Ejecutar script de configuración
node setup-crud.js
```

### 2. Verificar Conexión
```bash
# Verificar que todo funcione
node verify-crud.js
```

### 3. Iniciar Servidores
```bash
# Terminal 1 - API Backend
cd packages/api
npm run dev

# Terminal 2 - Frontend Web
cd packages/web  
npm run dev
```

## 👑 Acceso de Administrador

### Credenciales
- **Email:** admin@karoba.com
- **Password:** admin123

### Acceso al Panel
1. Ve a: http://localhost:3000
2. Haz clic en "Iniciar Sesión"
3. Ingresa las credenciales de admin
4. Aparecerá el enlace "👑 Admin" en el menú
5. Haz clic para acceder al Panel de Administración

## 🛠️ Funcionalidades CRUD

### ✅ CREATE (Crear)
- **Botón:** "Nuevo Usuario"
- **Campos obligatorios:**
  - Nombre
  - Apellido  
  - Email
  - Teléfono
  - Contraseña
- **Campos opcionales:**
  - Fecha de nacimiento
  - Intereses

### 👁️ READ (Leer)
- **Vista de tabla** con todos los usuarios
- **Paginación** (10 usuarios por página)
- **Búsqueda** por nombre o email
- **Estadísticas** en tiempo real

### ✏️ UPDATE (Actualizar)
- **Botón:** Ícono de lápiz en cada fila
- **Editar todos los campos** excepto email
- **Contraseña opcional** (dejar vacío para mantener actual)

### 🗑️ DELETE (Eliminar)
- **Botón:** Ícono de basura en cada fila
- **Confirmación** antes de eliminar
- **Soft delete** (desactivar usuario)
- **Protección:** No se puede eliminar el admin

### 👀 VIEW (Ver)
- **Botón:** Ícono de ojo en cada fila
- **Vista de solo lectura** con todos los detalles
- **Información completa** del usuario

## 🔧 Características Técnicas

### Backend (API)
- **Framework:** Express.js + TypeScript
- **Base de datos:** MySQL con mysql2
- **Autenticación:** JWT tokens
- **Seguridad:** bcrypt para contraseñas
- **Validación:** Middleware de admin
- **CORS:** Configurado para localhost

### Frontend (Web)
- **Framework:** Next.js + React + TypeScript
- **Estilos:** Tailwind CSS
- **Estado:** React Context (Auth + Language)
- **Iconos:** Heroicons
- **Modales:** Headless UI

### Base de Datos
```sql
-- Estructura de tabla users
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
  last_login TIMESTAMP NULL
);
```

## 🔐 Seguridad

### Autenticación
- **JWT tokens** con expiración
- **Middleware de verificación** en todas las rutas
- **Verificación de rol admin** para operaciones CRUD

### Autorización
- Solo **admin@karoba.com** puede acceder al CRUD
- **Protección contra auto-eliminación** del admin
- **Validación de datos** en frontend y backend

### Contraseñas
- **Encriptación bcrypt** con salt rounds 10
- **Validación de longitud** mínima 6 caracteres
- **Actualización opcional** (no obligatoria en edición)

## 📊 Estadísticas del Panel

### Métricas Mostradas
- **Total Usuarios:** Cantidad total registrados
- **Usuarios Activos:** Solo usuarios activos
- **Administradores:** Cantidad de admins

### Paginación
- **10 usuarios por página**
- **Navegación** anterior/siguiente
- **Indicador de página** actual

## 🐛 Solución de Problemas

### Error: "No se puede conectar"
```bash
# Verificar que MySQL esté funcionando
mysql -u root -p1234

# Verificar que la base de datos exista
USE karoba_wellness;
SHOW TABLES;
```

### Error: "Usuario admin no existe"
```bash
# Ejecutar script de configuración
node setup-crud.js
```

### Error: "Token inválido"
- Cerrar sesión y volver a iniciar
- Verificar que el servidor API esté funcionando
- Revisar la consola del navegador para errores

### Error: "CORS"
- Verificar que el frontend esté en puerto 3000
- Verificar que el backend esté en puerto 3001
- Revisar configuración CORS en packages/api/src/index.ts

## 🔄 Flujo de Trabajo

### Para Desarrolladores
1. **Modificar modelo:** packages/api/src/models/User.ts
2. **Actualizar rutas:** packages/api/src/routes/users.ts
3. **Ajustar frontend:** packages/web/src/pages/admin/dashboard.tsx
4. **Probar cambios:** node verify-crud.js

### Para Administradores
1. **Acceder al panel** con credenciales admin
2. **Gestionar usuarios** con interfaz visual
3. **Monitorear estadísticas** en tiempo real
4. **Realizar operaciones CRUD** según necesidad

## 📞 Soporte

Si encuentras problemas:
1. Ejecuta `node verify-crud.js` para diagnóstico
2. Revisa los logs del servidor API
3. Verifica la consola del navegador
4. Consulta esta documentación

---

**¡El CRUD visual está completamente funcional y conectado a MySQL!** 🎉