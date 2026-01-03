# KAROBA WELLNESS TRAVEL COLOMBIA 🌴

App de turismo de bienestar desarrollada con React Native (móvil) y Next.js (web), especializada en experiencias de wellness en el Caribe colombiano.

## 🚀 Estado del Proyecto

✅ **Completado:**
- Estructura completa del monorepo
- App web con Next.js + TypeScript + Tailwind
- Sistema de autenticación con MySQL
- Páginas: Inicio, Pasadía, Tours, Nosotros, Login, Registro
- Sistema de internacionalización (Español/Inglés)
- Galería interactiva con videos y fotos
- Integración con WhatsApp para reservas
- Base de datos MySQL con tablas optimizadas

🔄 **En Progreso:**
- Configuración de MySQL en entorno local
- Sistema de reservas avanzado
- App móvil React Native

## 📋 Configuración Rápida

### 1. Instalar MySQL
- **Windows:** Descargar desde https://dev.mysql.com/downloads/installer/
- Durante la instalación, dejar contraseña de root VACÍA para desarrollo
- Asegurar que el servicio MySQL esté ejecutándose

### 2. Verificar Configuración
```cmd
# Verificar que todo esté listo
node setup-check.js

# O usar el script automático (Windows)
setup-windows.bat
```

### 3. Inicializar Proyecto
```cmd
# Instalar dependencias
npm install

# Configurar base de datos
cd packages/api
npm run init-db

# Iniciar desarrollo
npm run dev
```

### 4. Acceder a la Aplicación
- **Web:** http://localhost:3000
- **API:** http://localhost:3001/health
- **Admin:** http://localhost:3000/admin/users

## 🏗️ Estructura del Proyecto

```
karoba-wellness-travel/
├── packages/
│   ├── web/             # App web Next.js + TypeScript
│   ├── mobile/          # App React Native + Expo (futuro)
│   ├── api/             # Backend Express + MySQL
│   └── shared/          # Componentes compartidos
├── img/                 # Imágenes y videos del proyecto
├── data/                # Datos JSON (migrados a MySQL)
├── docs/                # Documentación
├── .env                 # Variables de entorno
├── MYSQL_SETUP.md       # Guía de configuración MySQL
├── setup-check.js       # Script de verificación
└── setup-windows.bat    # Setup automático Windows
```

## 🛠️ Tecnologías

- **Frontend Web**: Next.js 13+ + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Base de Datos**: MySQL 8.0+ con conexiones pooled
- **Autenticación**: JWT + bcrypt
- **Internacionalización**: React Context (ES/EN)
- **Estilos**: Tailwind CSS + Glassmorphism
- **Monorepo**: Turborepo

## 📱 Funcionalidades

### ✅ Implementadas
- **Autenticación completa**: Registro, login, perfil de usuario
- **Páginas principales**: Inicio, Pasadía (Islas del Rosario), Tours, Nosotros
- **Sistema i18n**: Cambio dinámico Español/Inglés
- **Galería interactiva**: Videos fullscreen, modales de imágenes
- **Reservas WhatsApp**: Integración directa con mensajes predefinidos
- **Base de datos MySQL**: Usuarios, sesiones, reservas, contactos
- **Admin panel**: Gestión de usuarios registrados
- **Responsive design**: Optimizado para móvil y desktop

### 🔄 En Desarrollo
- Sistema de reservas con base de datos
- Integración de pagos
- App móvil React Native
- Panel de administración avanzado

## 📞 Información de Contacto

- **Empresa**: KAROBA WELLNESS TRAVEL COLOMBIA
- **Teléfono**: 323 688 2227
- **Email**: karoba.wellness@gmail.com
- **Instagram**: @karoba.wellness
- **TikTok**: @karoba.wellness.t

## 🎨 Paleta de Colores

- **Dorado**: #D4AF37 (exclusividad)
- **Azul**: #1E40AF (confianza)
- **Negro**: #000000 (elegancia)
- **Blanco**: #FFFFFF (pureza)

## 📚 Documentación Adicional

- [Configuración MySQL](./MYSQL_SETUP.md)
- [Guía de Desarrollo](./docs/README.md)