# 🔧 Guía de Solución de Problemas - Karoba Wellness Travel

## 🚨 Problemas Comunes y Soluciones

### 1. Error: "Access denied for user 'root'@'localhost'"

**Causa:** MySQL no está instalado o las credenciales son incorrectas.

**Soluciones:**

**A. MySQL no instalado:**
```cmd
# Descargar e instalar MySQL
# https://dev.mysql.com/downloads/installer/
# Seleccionar "mysql-installer-community-8.x.x.x.msi"
```

**B. Contraseña incorrecta:**
```cmd
# Si configuraste contraseña durante la instalación
# Editar .env y cambiar:
DB_PASSWORD=tu_contraseña_aqui
```

**C. Resetear contraseña de MySQL:**
```cmd
# Parar servicio
net stop mysql80

# Iniciar en modo seguro
mysqld --skip-grant-tables

# En otra terminal
mysql -u root
UPDATE mysql.user SET authentication_string='' WHERE User='root';
FLUSH PRIVILEGES;
EXIT;

# Reiniciar servicio normal
net start mysql80
```

### 2. Error: "Can't connect to MySQL server"

**Causa:** Servicio MySQL no está ejecutándose.

**Soluciones:**
```cmd
# Verificar estado del servicio
services.msc
# Buscar "MySQL80" y verificar que esté "Ejecutándose"

# O desde terminal como administrador
net start mysql80
```

### 3. Error: "Port 3306 is already in use"

**Causa:** Otro servicio está usando el puerto 3306.

**Soluciones:**
```cmd
# Ver qué está usando el puerto
netstat -ano | findstr :3306

# Cambiar puerto en .env
DB_PORT=3307

# O terminar el proceso que usa el puerto
taskkill /PID [número_del_proceso] /F
```

### 4. Error: "Module not found" o dependencias

**Causa:** Dependencias no instaladas correctamente.

**Soluciones:**
```cmd
# Limpiar e instalar dependencias
cd packages/api
rmdir /s node_modules
del package-lock.json
npm install

# Si persiste, instalar manualmente
npm install mysql2 bcrypt jsonwebtoken uuid express cors helmet morgan
```

### 5. Error: "Database 'karoba_wellness' doesn't exist"

**Causa:** Base de datos no inicializada.

**Soluciones:**
```cmd
cd packages/api
npm run init-db
```

### 6. Error: "ECONNREFUSED" al iniciar API

**Causa:** MySQL no está ejecutándose o configuración incorrecta.

**Soluciones:**
```cmd
# 1. Verificar MySQL
node test-mysql.js

# 2. Verificar configuración
node setup-check.js

# 3. Reiniciar servicios
net stop mysql80
net start mysql80
```

### 7. Página web no carga (localhost:3000)

**Causa:** Servidor web no iniciado o puerto ocupado.

**Soluciones:**
```cmd
# Verificar que el servidor web esté ejecutándose
cd packages/web
npm run dev

# Si el puerto está ocupado
netstat -ano | findstr :3000
# Cambiar puerto en package.json o terminar proceso
```

### 8. Error: "JWT token invalid" en login

**Causa:** Problema con autenticación o base de datos.

**Soluciones:**
```cmd
# 1. Verificar que la API esté ejecutándose
curl http://localhost:3001/health

# 2. Limpiar datos de navegador
# Ir a DevTools > Application > Storage > Clear storage

# 3. Reiniciar API
cd packages/api
npm run dev
```

## 🔍 Comandos de Diagnóstico

### Verificar Estado General
```cmd
node setup-check.js
```

### Probar Conexión MySQL
```cmd
node test-mysql.js
```

### Verificar Servicios
```cmd
# MySQL
net start mysql80

# API Health Check
curl http://localhost:3001/health

# Web App
curl http://localhost:3000
```

### Ver Logs de Error
```cmd
# API logs
cd packages/api
npm run dev
# Los errores aparecerán en la consola

# MySQL logs (Windows)
# Ir a: C:\ProgramData\MySQL\MySQL Server 8.0\Data\
# Abrir archivo .err
```

## 📞 Obtener Ayuda

Si ninguna de estas soluciones funciona:

1. **Ejecutar diagnóstico completo:**
   ```cmd
   node setup-check.js > diagnostico.txt
   ```

2. **Recopilar información del sistema:**
   ```cmd
   systeminfo > sistema.txt
   mysql --version >> sistema.txt
   node --version >> sistema.txt
   npm --version >> sistema.txt
   ```

3. **Contactar soporte técnico** con los archivos generados.

## 🚀 Instalación Limpia (Último Recurso)

Si todo falla, instalación desde cero:

```cmd
# 1. Desinstalar MySQL completamente
# Panel de Control > Programas > Desinstalar MySQL

# 2. Limpiar archivos residuales
# Eliminar carpetas:
# C:\Program Files\MySQL
# C:\ProgramData\MySQL
# C:\Users\[usuario]\AppData\Roaming\MySQL

# 3. Reinstalar MySQL
# https://dev.mysql.com/downloads/installer/
# Configurar SIN contraseña para desarrollo

# 4. Reinstalar dependencias del proyecto
rmdir /s node_modules
del package-lock.json
npm install

# 5. Ejecutar setup
node setup-check.js
```

¡Con estos pasos deberías poder resolver cualquier problema! 🎉