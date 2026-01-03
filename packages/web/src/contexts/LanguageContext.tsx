import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones completas
const translations = {
  es: {
    // Header
    'nav.pasadia': 'Pasadía',
    'nav.about': 'Nosotros',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Únete a Karoba',
    
    // Home
    'home.hero.title': 'Bienestar Auténtico',
    'home.hero.subtitle': 'Caribe Colombiano',
    'home.hero.description': 'Vive experiencias transformadoras de wellness que conectan cuerpo, mente y espíritu en los destinos más auténticos del Caribe colombiano.',
    'home.hero.cta': 'Descubre Nuestro Pasadía',
    
    // Experience Section
    'experience.badge': 'NUESTRA EXPERIENCIA',
    'experience.title': 'Más que un Pasadía',
    'experience.subtitle': 'Una Conexión Auténtica',
    'experience.description': 'En Karoba creemos que cada experiencia de wellness en el Caribe debe ser especial. Por eso cuidamos cada detalle para ofrecerte vivencias auténticas que van más allá del turismo tradicional.',
    'experience.feature1.title': 'Destinos Caribeños Únicos',
    'experience.feature1.description': 'Descubre los rincones más hermosos del Caribe colombiano, desde aguas cristalinas hasta playas vírgenes perfectas para el bienestar.',
    'experience.feature2.title': 'Gastronomía Wellness Caribeña',
    'experience.feature2.description': 'Disfruta de sabores saludables y auténticos preparados con ingredientes frescos del Caribe colombiano.',
    'experience.feature3.title': 'Bienestar Integral',
    'experience.feature3.description': 'Desconéctate del estrés y reconecta contigo mismo a través de experiencias de wellness diseñadas para renovar tu energía.',
    'experience.image.caption': 'Paraíso Wellness',
    'experience.image.subtitle': 'Caribe Colombiano',
    'experience.stat.minutes': 'minutos en lancha',
    'experience.stat.hours': 'horas de experiencia',
    'experience.values.title': 'Nuestros Valores',
    'experience.values.description': 'Lo que nos hace diferentes y nos impulsa a crear experiencias memorables',
    'experience.value1.title': 'Sostenibilidad',
    'experience.value1.description': 'Cuidamos el medio ambiente y apoyamos a las comunidades locales',
    'experience.value2.title': 'Calidad Humana',
    'experience.value2.description': 'Tratamos a cada huésped como parte de nuestra familia',
    'experience.value3.title': 'Experiencias Únicas',
    'experience.value3.description': 'Cada día es diferente, cada momento es especial',
    'experience.cta.title': '¿Listo para tu Experiencia Wellness?',
    'experience.cta.description': 'Descubre nuestras experiencias de bienestar en el Caribe y renueva tu energía en destinos paradisíacos',
    'experience.cta.button': 'Explorar Experiencias',
    'experience.cta.contact': 'Consultar Disponibilidad',
    'home.hero.widget.title': 'Pasadía Coral Sand',
    'home.hero.widget.subtitle': 'Islas del Rosario - Experiencia completa',
    'home.hero.widget.cta': 'Ver detalles completos',
    'home.hero.widget.lunch': 'Almuerzo',
    'home.hero.widget.transport': 'Transporte',
    'home.wellness.title': 'Experiencias de Bienestar',
    'home.wellness.subtitle': 'Conecta con la naturaleza y renueva tu espíritu',
    'home.wellness.description': 'Descubre el equilibrio perfecto entre relajación y aventura en los destinos más exclusivos del Caribe colombiano.',
    'home.destinations.title': 'Destinos Exclusivos',
    'home.destinations.subtitle': 'Lugares únicos para experiencias inolvidables',
    
    // About
    'about.hero.title': 'Somos',
    'about.hero.subtitle': 'Creadores de experiencias auténticas y transformadoras en el Caribe colombiano',
    'about.hero.location': 'Cartagena, Colombia',
    'about.hero.wellness': 'Wellness & Bienestar',
    'about.mission.title': 'Nuestra Misión',
    'about.authentic.title': 'Experiencias Auténticas',
    'about.authentic.description': 'En Karoba somos un operador turístico apasionado por crear experiencias auténticas, memorables y transformadoras en Cartagena y sus islas. Nacimos con el propósito de mostrar la belleza natural, cultural y humana del Caribe colombiano, ofreciendo pasadías cuidadosamente diseñadas para todo tipo de turistas.',
    'about.wellness.title': 'Wellness & Bienestar',
    'about.wellness.description': 'Nos especializamos en experiencias de wellness y bienestar, combinando descanso, naturaleza, mar y conexión personal. Creemos que viajar no solo es conocer nuevos lugares, sino también renovar cuerpo, mente y espíritu. Por eso, cada una de nuestras experiencias está pensada para brindar tranquilidad, equilibrio y disfrute en entornos únicos.',
    'about.commitment.title': 'Nuestro Compromiso',
    'about.forall.title': 'Para Todos',
    'about.forall.description': 'En Karoba atendemos a viajeros individuales, parejas, familias y grupos, adaptándonos a diferentes estilos y necesidades. Trabajamos con aliados locales y guías profesionales comprometidos con la calidad, la seguridad y el turismo responsable.',
    'about.experience.title': 'Experiencia Completa',
    'about.experience.description': 'Nuestro compromiso es ofrecerte más que un tour: una experiencia que se sienta, que te conecte con el mar, la cultura y contigo mismo. Con Karoba, Cartagena se vive de una manera diferente, auténtica y consciente.',
    'about.cta.title': 'Vive Cartagena con',
    'about.cta.subtitle': 'Descubre experiencias que transforman, conectan y renuevan tu espíritu',
    'about.cta.pasadia': 'Conoce Nuestras Pasadías',
    'about.cta.contact': 'Contáctanos',
    
    // Pasadia
    'pasadia.hero.badge': 'PASADÍA EXCLUSIVA',
    'pasadia.hero.title': 'Pasadía',
    'pasadia.hero.subtitle': 'Coral Sand',
    'pasadia.hero.description': 'Un día de tranquilidad frente al mar en las paradisíacas Islas del Rosario',
    'pasadia.hero.location': 'Islas del Rosario, Cartagena',
    'pasadia.hero.price': '¡Pregunta por chat!',
    'pasadia.schedule.title': 'Horario',
    'pasadia.schedule.departure': 'Salida: 8:45 a.m.',
    'pasadia.schedule.return': 'Regreso: 3:00 p.m.',
    'pasadia.meeting.title': 'Punto de Encuentro',
    'pasadia.meeting.location': 'Muelle La Bodeguita',
    'pasadia.meeting.gate': 'Puerta #1 - 7:45 a.m.',
    'pasadia.price.title': 'Precio',
    'pasadia.price.amount': '¡Consulta disponibilidad!',
    'pasadia.price.currency': 'Consulta por chat',
    'pasadia.price.availability': 'Consulta disponibilidad y precios',
    'pasadia.price.whatsapp': 'Consultar precio',
    'pasadia.price.whatsapp.cta': '💬 Consultar',
    'pasadia.includes.title': '¿Qué Incluye?',
    'pasadia.transport.boat': 'Transporte en lancha',
    'pasadia.transport.description': 'Ida y regreso desde Cartagena',
    'pasadia.transport.oceanarium': 'Transporte al oceanario',
    'pasadia.transport.note': 'No incluye entrada',
    'pasadia.welcome.cocktail': 'Cóctel de bienvenida',
    'pasadia.welcome.description': 'Al llegar a la isla',
    'pasadia.bike.tour': 'Tour en bicicleta',
    'pasadia.bike.description': 'Por la isla (disponible por turnos)',
    'pasadia.beach.access': 'Asoleadora en la playa',
    'pasadia.beach.description': 'Playa libre para disfrutar',
    'pasadia.lunch.complete': 'Almuerzo completo',
    'pasadia.lunch.description': 'Menú con 5 opciones disponibles',
    'pasadia.facilities.use': 'Uso de instalaciones',
    'pasadia.facilities.description': 'Hotel Coral Sand: piscina, baños',
    'pasadia.menu.title': 'Menú de Almuerzo',
    'pasadia.menu.subtitle': 'Elige entre 5 deliciosas opciones:',
    'pasadia.menu.chicken': 'Pechuga de pollo',
    'pasadia.menu.fish': 'Mojarra frita',
    'pasadia.menu.pork': 'Chuleta de cerdo',
    'pasadia.menu.pasta': 'Pasta con vegetales',
    'pasadia.menu.rice': 'Arroz con camarones',
    'pasadia.gallery.title': 'Galería - Islas del Rosario',
    'pasadia.gallery.subtitle': 'Descubre la belleza natural de las Islas del Rosario',
    'pasadia.gallery.photo1': 'Aguas Cristalinas',
    'pasadia.gallery.photo1.subtitle': 'Haz clic para ampliar',
    'pasadia.gallery.photo2': 'Paraíso Caribeño',
    'pasadia.gallery.photo2.subtitle': 'Haz clic para ampliar',
    'pasadia.gallery.video.badge': 'Video HD',
    'pasadia.gallery.cta': '¿Te gusta lo que ves? ¡Reserva tu pasadía ahora!',
    'pasadia.reserve': '¡Quiero Reservar!',
    'pasadia.location.title': 'Ubicación - Islas del Rosario',
    'pasadia.location.subtitle': 'Encuentra la ubicación exacta de nuestro destino paradisíaco en las Islas del Rosario',
    'pasadia.location.destination': 'Destino',
    'pasadia.location.destination.name': 'Coral Sand - Islas del Rosario',
    'pasadia.location.travel.time': 'Tiempo de viaje',
    'pasadia.location.travel.description': '45 minutos en lancha desde Cartagena',
    'pasadia.location.departure': 'Punto de partida',
    'pasadia.location.departure.name': 'Muelle La Bodeguita, Puerta #1',
    'pasadia.location.coordinates': 'Coordenadas',
    'pasadia.location.coordinates.name': 'Islas del Rosario',
    'pasadia.location.coordinates.country': 'Cartagena, Colombia',
    'pasadia.location.access': 'Acceso',
    'pasadia.location.access.sea': 'Solo por vía marítima',
    'pasadia.location.access.included': 'Transporte incluido en el tour',
    'pasadia.location.maps': 'Abrir en Google Maps',
    'pasadia.location.directions': 'Cómo llegar',
    'pasadia.directions.title': 'Cómo Llegar',
    'pasadia.directions.airport': 'Desde el Aeropuerto',
    'pasadia.directions.airport.1': 'Tomar taxi o Uber al Muelle La Bodeguita (20 min)',
    'pasadia.directions.airport.2': 'Dirigirse a la Puerta #1',
    'pasadia.directions.airport.3': 'Presentarse a las 7:45 a.m.',
    'pasadia.directions.center': 'Desde el Centro Histórico',
    'pasadia.directions.center.1': 'Caminar o tomar taxi al Muelle (10 min)',
    'pasadia.directions.center.2': 'Buscar la Puerta #1 de La Bodeguita',
    'pasadia.directions.center.3': 'Llegar puntualmente a las 7:45 a.m.',
    'pasadia.directions.tip': 'Te recomendamos llegar 15 minutos antes para el check-in y recibir las instrucciones de seguridad.',
    'pasadia.directions.help': 'Ayuda con direcciones',
    'pasadia.directions.maps': 'Ver en Google Maps',
    'pasadia.itinerary.title': 'Itinerario del Día',
    'pasadia.itinerary.meeting': 'Encuentro',
    'pasadia.itinerary.meeting.location': 'Muelle La Bodeguita, Puerta #1',
    'pasadia.itinerary.departure': 'Salida',
    'pasadia.itinerary.departure.description': 'Partida en lancha hacia las Islas del Rosario',
    'pasadia.itinerary.return': 'Retorno a Cartagena',
    'pasadia.sidebar.duration': 'Duración:',
    'pasadia.sidebar.duration.time': '1 día completo',
    'pasadia.sidebar.departure': 'Salida:',
    'pasadia.sidebar.return': 'Regreso:',
    'pasadia.sidebar.location': 'Ubicación:',
    'pasadia.sidebar.location.name': 'Islas del Rosario',
    'pasadia.sidebar.reserve.whatsapp': 'Reservar ahora',
    'pasadia.sidebar.reserve.title': '¡RESERVA YA!',
    'pasadia.sidebar.reserve.subtitle': 'Información y RESERVAS',
    'pasadia.sidebar.info': '¿Necesitas más información?',
    'pasadia.sidebar.whatsapp': '+57 323 688 2227',
    'pasadia.sidebar.email': 'karoba.wellness@gmail.com',
    'pasadia.sidebar.map': 'Ver ubicación en mapa',
    
    // Tours
    
    // Register
    'register.title': 'Únete a Karoba',
    'register.subtitle': 'Crea tu cuenta y descubre experiencias exclusivas',
    'register.form.name': 'Nombre completo',
    'register.form.email': 'Correo electrónico',
    'register.form.phone': 'Teléfono',
    'register.form.password': 'Contraseña',
    'register.form.confirm': 'Confirmar contraseña',
    'register.form.interests': 'Intereses',
    'register.form.interests.wellness': 'Experiencias de bienestar',
    'register.form.interests.adventure': 'Aventura y naturaleza',
    'register.form.interests.gastronomy': 'Experiencias gastronómicas',
    'register.form.submit': 'Crear Cuenta',
    'register.form.login': '¿Ya tienes cuenta? Inicia sesión',
    'register.success': 'Cuenta creada exitosamente',
    'register.error': 'Error al crear la cuenta',
    
    // Login
    'login.title': 'Iniciar Sesión',
    'login.subtitle': 'Accede a tu cuenta de Karoba Wellness',
    'login.description': 'Inicia sesión en tu cuenta de Karoba Wellness Travel para acceder a experiencias exclusivas',
    'login.form.email': 'Correo electrónico',
    'login.form.email.placeholder': 'tu@email.com',
    'login.form.email.required': 'El email es requerido',
    'login.form.email.invalid': 'El email no es válido',
    'login.form.password': 'Contraseña',
    'login.form.password.placeholder': 'Tu contraseña',
    'login.form.password.required': 'La contraseña es requerida',
    'login.form.remember': 'Recordar sesión',
    'login.form.forgot': '¿Olvidaste tu contraseña?',
    'login.form.submit': 'Iniciar Sesión',
    'login.form.signing': 'Iniciando sesión...',
    'login.form.no.account': '¿No tienes cuenta?',
    'login.form.register': 'Regístrate aquí',
    'login.success': '¡Bienvenido de vuelta! Redirigiendo...',
    'login.error': 'Error al iniciar sesión',
    'login.error.connection': 'Error de conexión. Inténtalo de nuevo.',
    'login.secure.connection': '🔒 Conexión segura y encriptada',
    'login.privacy': 'Privacidad',
    'login.terms': 'Términos',
    'login.help': 'Ayuda',
    
    // Footer
    'footer.tagline': 'Experiencias auténticas en el Caribe colombiano',
    'footer.quick.links': 'Enlaces Rápidos',
    'footer.contact.info': 'Información de Contacto',
    'footer.contact.phone': 'Teléfono',
    'footer.contact.email': 'Email',
    'footer.contact.address': 'Dirección',
    'footer.contact.address.text': 'Cartagena de Indias, Colombia',
    'footer.social': 'Síguenos',
    'footer.social.instagram': 'Instagram',
    'footer.social.tiktok': 'TikTok',
    'footer.social.whatsapp': 'WhatsApp',
    'footer.newsletter': 'Boletín',
    'footer.newsletter.text': 'Suscríbete para recibir ofertas exclusivas',
    'footer.newsletter.placeholder': 'Tu email',
    'footer.newsletter.button': 'Suscribirse',
    'footer.copyright': '© 2024 Karoba Wellness Travel. Todos los derechos reservados.',
    
    // Common
    'common.price': 'Precio',
    'common.duration': 'Duración',
    'common.location': 'Ubicación',
    'common.schedule': 'Horario',
    'common.contact': 'Contactar',
    'common.reserve': 'Reservar',
    'common.close': 'Cerrar',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.view': 'Ver',
    'common.more.info': 'Más información',
    'common.book.now': 'Reservar ahora',
    'common.learn.more': 'Conoce más',
    
    // Additional keys for better coverage
    'hero.wellness.natural': 'Meditación Natural',
    'hero.wellness.natural.desc': 'Reconecta con el sonido de la naturaleza',
    'hero.wellness.retreats': 'Retiros Exclusivos', 
    'hero.wellness.retreats.desc': 'Sanación en paraísos naturales',
    'hero.wellness.therapies': 'Terapias Ancestrales',
    'hero.wellness.therapies.desc': 'Tratamientos con sabiduría milenaria',
    
    // Gallery and Media
    'gallery.video.unsupported': 'Tu navegador no soporta la reproducción de video.',
    'gallery.image.alt': 'Imagen de galería',
    'gallery.click.play': 'Haz clic para reproducir',
    'gallery.view.more': 'Ver más',
    
    // Modal Actions
    'modal.close': 'Cerrar',
    'modal.understood': 'Entendido',
    'modal.contact': 'Contactar',
    'modal.previous': 'Anterior',
    'modal.next': 'Siguiente',
    
    // Footer Modal Content
    'footer.more.experiences': 'Más Experiencias',
    'footer.more.experiences.title': 'Próximamente: Más Experiencias',
    'footer.more.experiences.content': 'Estamos trabajando en nuevas experiencias wellness para ofrecerte:',
    'footer.privacy.policy': 'Política de Privacidad',
    'footer.privacy.policy.title': 'Política de Privacidad',
    'footer.privacy.policy.content': 'Karoba Wellness Travel Colombia se compromete a proteger tu privacidad.',
    'footer.terms.conditions': 'Términos y Condiciones',
    'footer.terms.conditions.title': 'Términos y Condiciones',
    'footer.terms.conditions.content': 'Términos de Servicio - Karoba Wellness Travel Colombia',
    'footer.certifications': 'Certificaciones',
    'footer.certifications.title': 'Certificaciones y Legal',
    'footer.newsletter.title': 'Boletín de Noticias',
    
    // Admin Dashboard
    'admin.users.registered': 'Usuarios Registrados',
    'admin.user.create': 'Crear Usuario',
    'admin.user.edit': 'Editar Usuario',
    'admin.user.delete': 'Eliminar Usuario',
    'admin.user.create.new': 'Crear Nuevo Usuario',
    'admin.user.details': 'Detalles del Usuario',
    'admin.user.update': 'Actualizar Usuario',
    'admin.error.create': 'Error al crear usuario',
    'admin.error.delete': 'Error al eliminar usuario',
    
    // Authentication
    'auth.logout': 'Cerrar Sesión',
    
    // Video Modal
    'video.modal.title': '🏝️ Descubre el Paraíso Wellness de Karoba',
    'video.modal.subtitle': 'Experiencias auténticas en el Caribe colombiano',
    'video.modal.description': 'Sumérgete en la experiencia completa de wellness que Karoba tiene para ofrecerte en los destinos más exclusivos del Caribe colombiano. Descubre cómo transformamos vidas a través del bienestar auténtico.',
    'video.modal.reserve': 'Reservar Mi Experiencia',
    'video.modal.contact': 'Contactar Asesor VIP',
    
    // Wellness Gallery
    'wellness.gallery.badge': '🧘‍♀️ EXPERIENCIAS DE BIENESTAR',
    'wellness.gallery.title': 'Galería de',
    'wellness.gallery.subtitle': 'Wellness Auténtico',
    'wellness.gallery.description': 'Sumérgete en un mundo de relajación y renovación con nuestras experiencias de wellness diseñadas para nutrir tu cuerpo, mente y espíritu',
    'wellness.gallery.cta.title': '¿Listo para tu Transformación Wellness?',
    'wellness.gallery.cta.description': 'Nuestros expertos en bienestar están listos para diseñar la experiencia perfecta para ti',
    'wellness.gallery.cta.consultation': 'Consulta Personalizada',
    'wellness.gallery.cta.packages': 'Ver Paquetes Completos',
    
    // Wellness Experience Categories
    'wellness.category.spa': 'Spa & Relajación',
    'wellness.category.mindfulness': 'Mindfulness',
    'wellness.category.meditation': 'Meditación',
    'wellness.category.natural': 'Medicina Natural',
    'wellness.category.therapy': 'Terapias Naturales',
    'wellness.category.spiritual': 'Espiritualidad',
    
    // Wellness Experience Titles
    'wellness.experience.relaxation.title': 'Terapias de Relajación',
    'wellness.experience.relaxation.description': 'Masajes terapéuticos con vista al mar',
    'wellness.experience.natural.title': 'Meditación Natural',
    'wellness.experience.natural.description': 'Sesiones de meditación en la naturaleza',
    'wellness.experience.beach.title': 'Meditación en la Playa',
    'wellness.experience.beach.description': 'Encuentra tu paz interior',
    'wellness.experience.treatments.title': 'Tratamientos Naturales',
    'wellness.experience.treatments.description': 'Medicina ancestral caribeña',
    'wellness.experience.hydrotherapy.title': 'Hidroterapia Natural',
    'wellness.experience.hydrotherapy.description': 'Sanación con aguas termales',
    'wellness.experience.retreats.title': 'Retiros Espirituales',
    'wellness.experience.retreats.description': 'Reconexión con tu esencia',
    
    // Register Interest Options
    'register.interest.yoga': 'Yoga y Meditación',
    'register.interest.therapies': 'Terapias Naturales',
    'register.interest.ancestral': 'Medicina Ancestral',
    'register.interest.retreats': 'Retiros Espirituales',
    'register.interest.gastronomy': 'Gastronomía Wellness',
    'register.interest.adventures': 'Aventuras Naturales',
    'register.interest.spa': 'Spas y Relajación',
    
    // Testimonials
    'testimonials.badge': '⭐ TESTIMONIOS REALES',
    'testimonials.title': 'Experiencias',
    'testimonials.subtitle': 'Inolvidables',
    'testimonials.description': 'Descubre lo que dicen nuestros huéspedes sobre su día perfecto en las paradisíacas Islas del Rosario',
    'testimonials.cta.title': '¿Listo para tu Propia Historia de Transformación?',
    'testimonials.cta.description': 'Únete a cientos de huéspedes que han encontrado su bienestar en el Caribe colombiano',
    'testimonials.cta.button': '🌊 Conocer Nuestro Pasadía',
    
    // Testimonials Content
    'testimonials.maria.comment': 'El pasadía a las Islas del Rosario fue increíble. Las aguas cristalinas, el almuerzo delicioso y la atención personalizada hicieron que fuera un día perfecto de relajación.',
    'testimonials.carlos.comment': 'Karoba superó todas mis expectativas. El transporte fue cómodo, las instalaciones excelentes y pude desconectarme completamente del estrés de la ciudad.',
    'testimonials.ana.comment': 'Un día mágico en el Caribe. El snorkel, la comida y el ambiente relajado fueron exactamente lo que necesitaba. Definitivamente regresaré.',
    
    // Stats
    'stats.guests': 'Huéspedes Satisfechos',
    'stats.rating': 'Calificación Promedio',
    'stats.destination': 'Destino Exclusivo',
    'stats.recommend': 'Recomendarían Karoba',
    
    // Meta Tags
    'meta.home.title': 'Karoba Wellness Travel - Turismo de Bienestar en el Caribe Colombiano',
    'meta.home.description': 'Descubre experiencias de wellness auténticas en el Caribe colombiano con Karoba. Turismo de bienestar, relajación y conexión con la naturaleza.',
    
    // Register Additional
    'register.interests.title': 'Intereses Wellness',
    'register.interests.description': 'Selecciona las experiencias que más te interesan:',
    'register.preferences.title': 'Preferencias',
    
    // Pasadia Additional
    'pasadia.gallery.photos.title': 'Galería de Fotos y Videos',
    
    // Footer Additional
    'footer.privacy.wellness.preferences': 'Preferencias de experiencias wellness',
    
    // Register Page Complete
    'register.meta.title': 'Únete a Karoba - Registro Wellness Travel Colombia',
    'register.meta.description': 'Únete a la comunidad exclusiva de Karoba Wellness Travel Colombia. Accede a experiencias únicas de bienestar en el Caribe colombiano.',
    'register.personal.info': 'Información Personal',
    'register.security': 'Seguridad',
    'register.form.first.name': 'Nombre *',
    'register.form.last.name': 'Apellido *',
    'register.form.email.label': 'Correo Electrónico *',
    'register.form.phone.label': 'Teléfono *',
    'register.form.birth.date': 'Fecha de Nacimiento *',
    'register.form.country': 'País *',
    'register.form.city': 'Ciudad *',
    'register.form.password.label': 'Contraseña *',
    'register.form.confirm.password.label': 'Confirmar Contraseña *',
    'register.form.confirm.password.placeholder': 'Repite tu contraseña',
    'register.form.submit.text': 'Únete a Karoba',
    'register.form.already.account': '¿Ya tienes cuenta?',
    'register.form.login.here': 'Inicia sesión aquí',
    
    // Register Validation Messages
    'register.error.first.name.required': 'El nombre es requerido',
    'register.error.last.name.required': 'El apellido es requerido',
    'register.error.email.required': 'El email es requerido',
    'register.error.email.invalid': 'El email no es válido',
    'register.error.phone.required': 'El teléfono es requerido',
    'register.error.password.required': 'La contraseña es requerida',
    'register.error.password.length': 'La contraseña debe tener al menos 6 caracteres',
    'register.error.password.mismatch': 'Las contraseñas no coinciden',
    'register.error.birth.date.required': 'La fecha de nacimiento es requerida',
    'register.error.country.required': 'El país es requerido',
    'register.error.city.required': 'La ciudad es requerida',
    'register.error.terms.required': 'Debes aceptar los términos y condiciones',
    
    // Register Placeholders
    'register.placeholder.first.name': 'Tu nombre',
    'register.placeholder.last.name': 'Tu apellido',
    'register.placeholder.email': 'tu@email.com',
    'register.placeholder.phone': '+57 300 123 4567',
    'register.placeholder.country': 'Colombia',
    'register.placeholder.city': 'Bogotá',
    'register.placeholder.password': 'Mínimo 6 caracteres',
    
    // Register Checkboxes
    'register.newsletter.text': 'Quiero recibir ofertas exclusivas y noticias de wellness por email',
    'register.terms.text': 'Acepto los',
    'register.terms.link': 'términos y condiciones',
    'register.terms.and': 'y la',
    
    // Register Additional
    'register.privacy.policy': 'política de privacidad',
    'register.karoba.text': 'de Karoba *',
    'register.error.general': 'Error en el registro',
    'register.error.connection': 'Error de conexión. Inténtalo de nuevo.',
    
    // Register Loading
    'register.creating.account': 'Creando tu cuenta...',
    
    // Register Hero Description
    'register.hero.description': 'Únete a nuestra comunidad exclusiva y accede a experiencias transformadoras de wellness en los destinos más auténticos del Caribe colombiano',
  },
  en: {
    // Header
    'nav.pasadia': 'Day Trip',
    'nav.about': 'About Us',
    'nav.login': 'Sign In',
    'nav.register': 'Join Karoba',
    
    // Home
    'home.hero.title': 'Authentic Wellness',
    'home.hero.subtitle': 'Colombian Caribbean',
    'home.hero.description': 'Live transformative wellness experiences that connect body, mind and spirit in the most authentic destinations of the Colombian Caribbean.',
    'home.hero.cta': 'Discover Our Day Trip',
    
    // Experience Section
    'experience.badge': 'OUR EXPERIENCE',
    'experience.title': 'More than a Day Trip',
    'experience.subtitle': 'An Authentic Connection',
    'experience.description': 'At Karoba we believe that every wellness experience in the Caribbean should be special. That\'s why we take care of every detail to offer you authentic experiences that go beyond traditional tourism.',
    'experience.feature1.title': 'Unique Caribbean Destinations',
    'experience.feature1.description': 'Discover the most beautiful corners of the Colombian Caribbean, from crystal-clear waters to pristine beaches perfect for wellness.',
    'experience.feature2.title': 'Caribbean Wellness Gastronomy',
    'experience.feature2.description': 'Enjoy healthy and authentic flavors prepared with fresh ingredients from the Colombian Caribbean.',
    'experience.feature3.title': 'Integral Wellness',
    'experience.feature3.description': 'Disconnect from stress and reconnect with yourself through wellness experiences designed to renew your energy.',
    'experience.image.caption': 'Wellness Paradise',
    'experience.image.subtitle': 'Colombian Caribbean',
    'experience.stat.minutes': 'minutes by boat',
    'experience.stat.hours': 'hours of experience',
    'experience.values.title': 'Our Values',
    'experience.values.description': 'What makes us different and drives us to create memorable experiences',
    'experience.value1.title': 'Sustainability',
    'experience.value1.description': 'We care for the environment and support local communities',
    'experience.value2.title': 'Human Quality',
    'experience.value2.description': 'We treat each guest as part of our family',
    'experience.value3.title': 'Unique Experiences',
    'experience.value3.description': 'Every day is different, every moment is special',
    'experience.cta.title': 'Ready for your Wellness Experience?',
    'experience.cta.description': 'Discover our wellness experiences in the Caribbean and renew your energy in paradisiacal destinations',
    'experience.cta.button': 'Explore Experiences',
    'experience.cta.contact': 'Check Availability',
    'home.hero.widget.title': 'Coral Sand Day Trip',
    'home.hero.widget.subtitle': 'Rosario Islands - Complete experience',
    'home.hero.widget.cta': 'View full details',
    'home.hero.widget.lunch': 'Lunch',
    'home.hero.widget.transport': 'Transport',
    'home.wellness.title': 'Wellness Experiences',
    'home.wellness.subtitle': 'Connect with nature and renew your spirit',
    'home.wellness.description': 'Discover the perfect balance between relaxation and adventure in the most exclusive destinations of the Colombian Caribbean.',
    'home.destinations.title': 'Exclusive Destinations',
    'home.destinations.subtitle': 'Unique places for unforgettable experiences',
    
    // About
    'about.hero.title': 'We Are',
    'about.hero.subtitle': 'Creators of authentic and transformative experiences in the Colombian Caribbean',
    'about.hero.location': 'Cartagena, Colombia',
    'about.hero.wellness': 'Wellness & Well-being',
    'about.mission.title': 'Our Mission',
    'about.authentic.title': 'Authentic Experiences',
    'about.authentic.description': 'At Karoba we are a tour operator passionate about creating authentic, memorable and transformative experiences in Cartagena and its islands. We were born with the purpose of showcasing the natural, cultural and human beauty of the Colombian Caribbean, offering day trips carefully designed for all types of travelers.',
    'about.wellness.title': 'Wellness & Well-being',
    'about.wellness.description': 'We specialize in wellness and well-being experiences, combining rest, nature, sea and personal connection. We believe that traveling is not only about discovering new places, but also about renewing body, mind and spirit. That is why each of our experiences is designed to provide tranquility, balance and enjoyment in unique environments.',
    'about.commitment.title': 'Our Commitment',
    'about.forall.title': 'For Everyone',
    'about.forall.description': 'At Karoba we serve individual travelers, couples, families and groups, adapting to different styles and needs. We work with local partners and professional guides committed to quality, safety and responsible tourism.',
    'about.experience.title': 'Complete Experience',
    'about.experience.description': 'Our commitment is to offer you more than a tour: an experience that you can feel, that connects you with the sea, culture and yourself. With Karoba, Cartagena is lived in a different, authentic and conscious way.',
    'about.cta.title': 'Live Cartagena with',
    'about.cta.subtitle': 'Discover experiences that transform, connect and renew your spirit',
    'about.cta.pasadia': 'Discover Our Day Trips',
    'about.cta.contact': 'Contact Us',
    
    // Pasadia
    'pasadia.hero.badge': 'EXCLUSIVE DAY TRIP',
    'pasadia.hero.title': 'Day Trip',
    'pasadia.hero.subtitle': 'Coral Sand',
    'pasadia.hero.description': 'A day of tranquility by the sea in the paradisiacal Rosario Islands',
    'pasadia.hero.location': 'Rosario Islands, Cartagena',
    'pasadia.hero.price': 'Ask via chat!',
    'pasadia.schedule.title': 'Schedule',
    'pasadia.schedule.departure': 'Departure: 8:45 a.m.',
    'pasadia.schedule.return': 'Return: 3:00 p.m.',
    'pasadia.meeting.title': 'Meeting Point',
    'pasadia.meeting.location': 'La Bodeguita Pier',
    'pasadia.meeting.gate': 'Gate #1 - 7:45 a.m.',
    'pasadia.price.title': 'Price',
    'pasadia.price.amount': 'Check availability!',
    'pasadia.price.currency': 'Ask via chat',
    'pasadia.price.whatsapp': 'Ask price',
    'pasadia.price.whatsapp.cta': '💬 Ask price',
    'pasadia.price.availability': 'Check availability and prices',
    'pasadia.includes.title': 'What\'s Included?',
    'pasadia.transport.boat': 'Boat transportation',
    'pasadia.transport.description': 'Round trip from Cartagena',
    'pasadia.transport.oceanarium': 'Transportation to oceanarium',
    'pasadia.transport.note': 'Entrance not included',
    'pasadia.welcome.cocktail': 'Welcome cocktail',
    'pasadia.welcome.description': 'Upon arrival to the island',
    'pasadia.bike.tour': 'Bike tour',
    'pasadia.bike.description': 'Around the island (available by shifts)',
    'pasadia.beach.access': 'Beach lounging',
    'pasadia.beach.description': 'Free beach access to enjoy',
    'pasadia.lunch.complete': 'Complete lunch',
    'pasadia.lunch.description': 'Menu with 5 available options',
    'pasadia.facilities.use': 'Facilities access',
    'pasadia.facilities.description': 'Coral Sand Hotel: pool, bathrooms',
    'pasadia.menu.title': 'Lunch Menu',
    'pasadia.menu.subtitle': 'Choose from 5 delicious options:',
    'pasadia.menu.chicken': 'Chicken breast',
    'pasadia.menu.fish': 'Fried mojarra fish',
    'pasadia.menu.pork': 'Pork chop',
    'pasadia.menu.pasta': 'Pasta with vegetables',
    'pasadia.menu.rice': 'Rice with shrimp',
    'pasadia.gallery.title': 'Gallery - Rosario Islands',
    'pasadia.gallery.subtitle': 'Discover the natural beauty of the Rosario Islands',
    'pasadia.gallery.photo1': 'Crystal Clear Waters',
    'pasadia.gallery.photo1.subtitle': 'Click to enlarge',
    'pasadia.gallery.photo2': 'Caribbean Paradise',
    'pasadia.gallery.photo2.subtitle': 'Click to enlarge',
    'pasadia.gallery.video.badge': 'HD Video',
    'pasadia.gallery.cta': 'Do you like what you see? Book your day trip now!',
    'pasadia.reserve': 'I Want to Book!',
    'pasadia.location.title': 'Location - Rosario Islands',
    'pasadia.location.subtitle': 'Find the exact location of our paradisiacal destination in the Rosario Islands',
    'pasadia.location.destination': 'Destination',
    'pasadia.location.destination.name': 'Coral Sand - Rosario Islands',
    'pasadia.location.travel.time': 'Travel time',
    'pasadia.location.travel.description': '45 minutes by boat from Cartagena',
    'pasadia.location.departure': 'Departure point',
    'pasadia.location.departure.name': 'La Bodeguita Pier, Gate #1',
    'pasadia.location.coordinates': 'Coordinates',
    'pasadia.location.coordinates.name': 'Rosario Islands',
    'pasadia.location.coordinates.country': 'Cartagena, Colombia',
    'pasadia.location.access': 'Access',
    'pasadia.location.access.sea': 'By sea only',
    'pasadia.location.access.included': 'Transportation included in tour',
    'pasadia.location.maps': 'Open in Google Maps',
    'pasadia.location.directions': 'Get Directions',
    'pasadia.directions.title': 'How to Get There',
    'pasadia.directions.airport': 'From the Airport',
    'pasadia.directions.airport.1': 'Take taxi or Uber to La Bodeguita Pier (20 min)',
    'pasadia.directions.airport.2': 'Go to Gate #1',
    'pasadia.directions.airport.3': 'Arrive at 7:45 a.m.',
    'pasadia.directions.center': 'From Historic Center',
    'pasadia.directions.center.1': 'Walk or take taxi to the Pier (10 min)',
    'pasadia.directions.center.2': 'Look for Gate #1 at La Bodeguita',
    'pasadia.directions.center.3': 'Arrive punctually at 7:45 a.m.',
    'pasadia.directions.tip': 'We recommend arriving 15 minutes early for check-in and safety instructions.',
    'pasadia.directions.help': 'Help with directions',
    'pasadia.directions.maps': 'View on Google Maps',
    'pasadia.itinerary.title': 'Daily Itinerary',
    'pasadia.itinerary.meeting': 'Meeting',
    'pasadia.itinerary.meeting.location': 'La Bodeguita Pier, Gate #1',
    'pasadia.itinerary.departure': 'Departure',
    'pasadia.itinerary.departure.description': 'Boat departure to Rosario Islands',
    'pasadia.itinerary.return': 'Return to Cartagena',
    'pasadia.sidebar.duration': 'Duration:',
    'pasadia.sidebar.duration.time': '1 full day',
    'pasadia.sidebar.departure': 'Departure:',
    'pasadia.sidebar.return': 'Return:',
    'pasadia.sidebar.location': 'Location:',
    'pasadia.sidebar.location.name': 'Rosario Islands',
    'pasadia.sidebar.reserve.whatsapp': 'Book now',
    'pasadia.sidebar.reserve.title': 'BOOK NOW!',
    'pasadia.sidebar.reserve.subtitle': 'Information and BOOKINGS',
    'pasadia.sidebar.info': 'Need more information?',
    'pasadia.sidebar.whatsapp': '+57 323 688 2227',
    'pasadia.sidebar.email': 'karoba.wellness@gmail.com',
    'pasadia.sidebar.map': 'View location on map',
    
    
    // Register
    'register.title': 'Join Karoba',
    'register.subtitle': 'Create your account and discover exclusive experiences',
    'register.form.name': 'Full name',
    'register.form.email': 'Email address',
    'register.form.phone': 'Phone number',
    'register.form.password': 'Password',
    'register.form.confirm': 'Confirm password',
    'register.form.interests': 'Interests',
    'register.form.interests.wellness': 'Wellness experiences',
    'register.form.interests.adventure': 'Adventure and nature',
    'register.form.interests.gastronomy': 'Gastronomic experiences',
    'register.form.submit': 'Create Account',
    'register.form.login': 'Already have an account? Sign in',
    'register.success': 'Account created successfully',
    'register.error': 'Error creating account',
    
    // Login
    'login.title': 'Sign In',
    'login.subtitle': 'Access your Karoba Wellness account',
    'login.description': 'Sign in to your Karoba Wellness Travel account to access exclusive experiences',
    'login.form.email': 'Email address',
    'login.form.email.placeholder': 'your@email.com',
    'login.form.email.required': 'Email is required',
    'login.form.email.invalid': 'Email is not valid',
    'login.form.password': 'Password',
    'login.form.password.placeholder': 'Your password',
    'login.form.password.required': 'Password is required',
    'login.form.remember': 'Remember me',
    'login.form.forgot': 'Forgot your password?',
    'login.form.submit': 'Sign In',
    'login.form.signing': 'Signing in...',
    'login.form.no.account': 'Don\'t have an account?',
    'login.form.register': 'Register here',
    'login.success': 'Welcome back! Redirecting...',
    'login.error': 'Error signing in',
    'login.error.connection': 'Connection error. Please try again.',
    'login.secure.connection': '🔒 Secure and encrypted connection',
    'login.privacy': 'Privacy',
    'login.terms': 'Terms',
    'login.help': 'Help',
    
    // Footer
    'footer.tagline': 'Authentic experiences in the Colombian Caribbean',
    'footer.quick.links': 'Quick Links',
    'footer.contact.info': 'Contact Information',
    'footer.contact.phone': 'Phone',
    'footer.contact.email': 'Email',
    'footer.contact.address': 'Address',
    'footer.contact.address.text': 'Cartagena de Indias, Colombia',
    'footer.social': 'Follow Us',
    'footer.social.instagram': 'Instagram',
    'footer.social.tiktok': 'TikTok',
    'footer.social.whatsapp': 'WhatsApp',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.text': 'Subscribe to receive exclusive offers',
    'footer.newsletter.placeholder': 'Your email',
    'footer.newsletter.button': 'Subscribe',
    'footer.copyright': '© 2024 Karoba Wellness Travel. All rights reserved.',
    
    // Common
    'common.price': 'Price',
    'common.duration': 'Duration',
    'common.location': 'Location',
    'common.schedule': 'Schedule',
    'common.contact': 'Contact',
    'common.reserve': 'Book',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.more.info': 'More information',
    'common.book.now': 'Book now',
    'common.learn.more': 'Learn more',
    
    // Additional keys for better coverage
    'hero.wellness.natural': 'Natural Meditation',
    'hero.wellness.natural.desc': 'Reconnect with the sound of nature',
    'hero.wellness.retreats': 'Exclusive Retreats', 
    'hero.wellness.retreats.desc': 'Healing in natural paradises',
    'hero.wellness.therapies': 'Ancestral Therapies',
    'hero.wellness.therapies.desc': 'Treatments with ancient wisdom',
    
    // Gallery and Media
    'gallery.video.unsupported': 'Your browser does not support video playback.',
    'gallery.image.alt': 'Gallery image',
    'gallery.click.play': 'Click to play',
    'gallery.view.more': 'View more',
    
    // Modal Actions
    'modal.close': 'Close',
    'modal.understood': 'Understood',
    'modal.contact': 'Contact',
    'modal.previous': 'Previous',
    'modal.next': 'Next',
    
    // Footer Modal Content
    'footer.more.experiences': 'More Experiences',
    'footer.more.experiences.title': 'Coming Soon: More Experiences',
    'footer.more.experiences.content': 'We are working on new wellness experiences to offer you:',
    'footer.privacy.policy': 'Privacy Policy',
    'footer.privacy.policy.title': 'Privacy Policy',
    'footer.privacy.policy.content': 'Karoba Wellness Travel Colombia is committed to protecting your privacy.',
    'footer.terms.conditions': 'Terms & Conditions',
    'footer.terms.conditions.title': 'Terms & Conditions',
    'footer.terms.conditions.content': 'Terms of Service - Karoba Wellness Travel Colombia',
    'footer.certifications': 'Certifications',
    'footer.certifications.title': 'Certifications and Legal',
    'footer.newsletter.title': 'Newsletter',
    
    // Admin Dashboard
    'admin.users.registered': 'Registered Users',
    'admin.user.create': 'Create User',
    'admin.user.edit': 'Edit User',
    'admin.user.delete': 'Delete User',
    'admin.user.create.new': 'Create New User',
    'admin.user.details': 'User Details',
    'admin.user.update': 'Update User',
    'admin.error.create': 'Error creating user',
    'admin.error.delete': 'Error deleting user',
    
    // Authentication
    'auth.logout': 'Sign Out',
    
    // Video Modal
    'video.modal.title': '🏝️ Discover Karoba\'s Wellness Paradise',
    'video.modal.subtitle': 'Authentic experiences in the Colombian Caribbean',
    'video.modal.description': 'Immerse yourself in the complete wellness experience that Karoba has to offer in the most exclusive destinations of the Colombian Caribbean. Discover how we transform lives through authentic wellness.',
    'video.modal.reserve': 'Book My Experience',
    'video.modal.contact': 'Contact VIP Advisor',
    
    // Wellness Gallery
    'wellness.gallery.badge': '🧘‍♀️ WELLNESS EXPERIENCES',
    'wellness.gallery.title': 'Gallery of',
    'wellness.gallery.subtitle': 'Authentic Wellness',
    'wellness.gallery.description': 'Immerse yourself in a world of relaxation and renewal with our wellness experiences designed to nourish your body, mind and spirit',
    'wellness.gallery.cta.title': 'Ready for your Wellness Transformation?',
    'wellness.gallery.cta.description': 'Our wellness experts are ready to design the perfect experience for you',
    'wellness.gallery.cta.consultation': 'Personalized Consultation',
    'wellness.gallery.cta.packages': 'View Complete Packages',
    
    // Wellness Experience Categories
    'wellness.category.spa': 'Spa & Relaxation',
    'wellness.category.mindfulness': 'Mindfulness',
    'wellness.category.meditation': 'Meditation',
    'wellness.category.natural': 'Natural Medicine',
    'wellness.category.therapy': 'Natural Therapies',
    'wellness.category.spiritual': 'Spirituality',
    
    // Wellness Experience Titles
    'wellness.experience.relaxation.title': 'Relaxation Therapies',
    'wellness.experience.relaxation.description': 'Therapeutic massages with ocean view',
    'wellness.experience.natural.title': 'Natural Meditation',
    'wellness.experience.natural.description': 'Meditation sessions in nature',
    'wellness.experience.beach.title': 'Beach Meditation',
    'wellness.experience.beach.description': 'Find your inner peace',
    'wellness.experience.treatments.title': 'Natural Treatments',
    'wellness.experience.treatments.description': 'Ancestral Caribbean medicine',
    'wellness.experience.hydrotherapy.title': 'Natural Hydrotherapy',
    'wellness.experience.hydrotherapy.description': 'Healing with thermal waters',
    'wellness.experience.retreats.title': 'Spiritual Retreats',
    'wellness.experience.retreats.description': 'Reconnection with your essence',
    
    // Register Interest Options
    'register.interest.yoga': 'Yoga & Meditation',
    'register.interest.therapies': 'Natural Therapies',
    'register.interest.ancestral': 'Ancestral Medicine',
    'register.interest.retreats': 'Spiritual Retreats',
    'register.interest.gastronomy': 'Wellness Gastronomy',
    'register.interest.adventures': 'Natural Adventures',
    'register.interest.spa': 'Spas & Relaxation',
    
    // Testimonials
    'testimonials.badge': '⭐ REAL TESTIMONIALS',
    'testimonials.title': 'Unforgettable',
    'testimonials.subtitle': 'Experiences',
    'testimonials.description': 'Discover what our guests say about their perfect day in the paradisiacal Rosario Islands',
    'testimonials.cta.title': 'Ready for Your Own Transformation Story?',
    'testimonials.cta.description': 'Join hundreds of guests who have found their wellness in the Colombian Caribbean',
    'testimonials.cta.button': '🌊 Discover Our Day Trip',
    
    // Testimonials Content
    'testimonials.maria.comment': 'The day trip to the Rosario Islands was incredible. The crystal-clear waters, delicious lunch and personalized attention made it a perfect day of relaxation.',
    'testimonials.carlos.comment': 'Karoba exceeded all my expectations. The transportation was comfortable, the facilities excellent and I was able to completely disconnect from city stress.',
    'testimonials.ana.comment': 'A magical day in the Caribbean. The snorkeling, food and relaxed atmosphere were exactly what I needed. I will definitely return.',
    
    // Stats
    'stats.guests': 'Satisfied Guests',
    'stats.rating': 'Average Rating',
    'stats.destination': 'Exclusive Destination',
    'stats.recommend': 'Would Recommend Karoba',
    
    // Meta Tags
    'meta.home.title': 'Karoba Wellness Travel - Wellness Tourism in the Colombian Caribbean',
    'meta.home.description': 'Discover authentic wellness experiences in the Colombian Caribbean with Karoba. Wellness tourism, relaxation and connection with nature.',
    
    // Register Additional
    'register.interests.title': 'Wellness Interests',
    'register.interests.description': 'Select the experiences that interest you most:',
    'register.preferences.title': 'Preferences',
    
    // Pasadia Additional
    'pasadia.gallery.photos.title': 'Photo and Video Gallery',
    
    // Footer Additional
    'footer.privacy.wellness.preferences': 'Wellness experience preferences',
    
    // Register Page Complete
    'register.meta.title': 'Join Karoba - Wellness Travel Colombia Registration',
    'register.meta.description': 'Join the exclusive Karoba Wellness Travel Colombia community. Access unique wellness experiences in the Colombian Caribbean.',
    'register.personal.info': 'Personal Information',
    'register.security': 'Security',
    'register.form.first.name': 'First Name *',
    'register.form.last.name': 'Last Name *',
    'register.form.email.label': 'Email Address *',
    'register.form.phone.label': 'Phone *',
    'register.form.birth.date': 'Date of Birth *',
    'register.form.country': 'Country *',
    'register.form.city': 'City *',
    'register.form.password.label': 'Password *',
    'register.form.confirm.password.label': 'Confirm Password *',
    'register.form.confirm.password.placeholder': 'Repeat your password',
    'register.form.submit.text': 'Join Karoba',
    'register.form.already.account': 'Already have an account?',
    'register.form.login.here': 'Sign in here',
    
    // Register Validation Messages
    'register.error.first.name.required': 'First name is required',
    'register.error.last.name.required': 'Last name is required',
    'register.error.email.required': 'Email is required',
    'register.error.email.invalid': 'Email is not valid',
    'register.error.phone.required': 'Phone is required',
    'register.error.password.required': 'Password is required',
    'register.error.password.length': 'Password must be at least 6 characters',
    'register.error.password.mismatch': 'Passwords do not match',
    'register.error.birth.date.required': 'Date of birth is required',
    'register.error.country.required': 'Country is required',
    'register.error.city.required': 'City is required',
    'register.error.terms.required': 'You must accept the terms and conditions',
    
    // Register Placeholders
    'register.placeholder.first.name': 'Your first name',
    'register.placeholder.last.name': 'Your last name',
    'register.placeholder.email': 'your@email.com',
    'register.placeholder.phone': '+57 300 123 4567',
    'register.placeholder.country': 'Colombia',
    'register.placeholder.city': 'Bogotá',
    'register.placeholder.password': 'Minimum 6 characters',
    
    // Register Checkboxes
    'register.newsletter.text': 'I want to receive exclusive offers and wellness news by email',
    'register.terms.text': 'I accept the',
    'register.terms.link': 'terms and conditions',
    'register.terms.and': 'and the',
    
    // Register Additional
    'register.privacy.policy': 'privacy policy',
    'register.karoba.text': 'of Karoba *',
    'register.error.general': 'Registration error',
    'register.error.connection': 'Connection error. Please try again.',
    
    // Register Loading
    'register.creating.account': 'Creating your account...',
    
    // Register Hero Description
    'register.hero.description': 'Join our exclusive community and access transformative wellness experiences in the most authentic destinations of the Colombian Caribbean',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    // Cargar idioma guardado del localStorage
    const savedLanguage = localStorage.getItem('karoba-language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('karoba-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};