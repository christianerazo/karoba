# Tourism App 🌍

App de turismo multiplataforma desarrollada con React Native (móvil) y Next.js (web).

## Estructura del Proyecto

```
tourism-app/
├── packages/
│   ├── mobile/          # App React Native con Expo
│   ├── web/             # App web con Next.js
│   ├── shared/          # Componentes y lógica compartida
│   └── api/             # Backend API con Express
├── docs/                # Documentación del proyecto
└── tools/               # Scripts y herramientas de desarrollo
```

## Tecnologías Utilizadas

- **Frontend Móvil**: React Native + Expo
- **Frontend Web**: Next.js + TypeScript
- **Backend**: Node.js + Express
- **Base de Datos**: PostgreSQL
- **Estilos**: Tailwind CSS
- **Monorepo**: Turborepo

## Instalación y Desarrollo

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Expo CLI (para desarrollo móvil)

### Instalación
```bash
npm install
```

### Desarrollo
```bash
# Ejecutar todos los servicios
npm run dev

# Solo app móvil
npm run mobile

# Solo app web
npm run web

# Solo API
npm run api
```

## Funcionalidades Principales

### MVP
- [ ] Autenticación de usuarios
- [ ] Listado de destinos turísticos
- [ ] Búsqueda de destinos
- [ ] Perfil de usuario
- [ ] Diseño responsive

### Fase 2
- [ ] Sistema de reservas
- [ ] Integración de pagos
- [ ] Mapas interactivos
- [ ] Sistema de reseñas
- [ ] Notificaciones

### Fase 3
- [ ] Recomendaciones personalizadas
- [ ] Itinerarios automáticos
- [ ] Chat de soporte
- [ ] Analytics avanzados

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

MIT License