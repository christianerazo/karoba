# Documentación del Proyecto Tourism App

## Arquitectura del Sistema

### Estructura General
```
tourism-app/
├── packages/
│   ├── mobile/          # React Native + Expo
│   ├── web/             # Next.js
│   ├── shared/          # Tipos y utilidades compartidas
│   └── api/             # Backend API con Express
├── docs/                # Documentación
└── tools/               # Scripts y herramientas
```

### Stack Tecnológico

**Frontend Móvil:**
- React Native 0.72
- Expo SDK 49
- React Navigation 6
- React Query para estado global
- TypeScript

**Frontend Web:**
- Next.js 14
- React 18
- Tailwind CSS
- React Query
- TypeScript

**Backend:**
- Node.js + Express
- PostgreSQL (base de datos principal)
- Redis (caché y sesiones)
- JWT para autenticación
- TypeScript

**Compartido:**
- Monorepo con Turborepo
- Tipos TypeScript compartidos
- Utilidades comunes

## Funcionalidades Implementadas

### MVP (Versión Actual)
- ✅ Estructura base del proyecto
- ✅ Configuración de monorepo
- ✅ Componentes básicos de UI
- ✅ Navegación móvil y web
- ✅ Tipos TypeScript compartidos
- ✅ API endpoints básicos (mock)

### Próximas Fases

**Fase 1 - Funcionalidad Core:**
- [ ] Autenticación completa (JWT)
- [ ] Base de datos PostgreSQL
- [ ] CRUD de destinos
- [ ] Sistema de búsqueda
- [ ] Perfil de usuario

**Fase 2 - Reservas y Pagos:**
- [ ] Sistema de reservas
- [ ] Integración con Stripe
- [ ] Notificaciones push
- [ ] Sistema de reseñas

**Fase 3 - Funciones Avanzadas:**
- [ ] Mapas con Google Maps
- [ ] Recomendaciones IA
- [ ] Chat de soporte
- [ ] Analytics

## Comandos de Desarrollo

### Instalación
```bash
npm install
```

### Desarrollo
```bash
# Todos los servicios
npm run dev

# Solo móvil
npm run mobile

# Solo web
npm run web

# Solo API
npm run api
```

### Build
```bash
npm run build
```

## Variables de Entorno

Copia los archivos `.env.example` y configura las variables necesarias:

- `packages/api/.env` - Configuración del backend
- `packages/web/.env.local` - Configuración web
- `packages/mobile/app.json` - Configuración móvil

## Contribución

1. Crea una rama para tu feature
2. Implementa los cambios
3. Ejecuta tests y linting
4. Crea un Pull Request

## Recursos Adicionales

- [Documentación de React Native](https://reactnative.dev/)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Expo](https://docs.expo.dev/)
- [Guía de Turborepo](https://turbo.build/repo/docs)