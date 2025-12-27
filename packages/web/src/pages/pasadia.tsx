import Head from 'next/head';
import Layout from '../components/Layout';
import VideoGalleryModal from '../components/VideoGalleryModal';
import ImageModal from '../components/ImageModal';
import { useState } from 'react';
import { 
  ClockIcon, 
  MapPinIcon, 
  CurrencyDollarIcon,
  CheckCircleIcon,
  CalendarIcon,
  UserGroupIcon,
  PlayIcon
} from '@heroicons/react/24/solid';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Pasadia() {
  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    title: string;
    description: string;
    thumbnail: string;
  } | null>(null);

  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
    description: string;
  } | null>(null);

  const images = [
    {
      src: "/images/islas-rosario/rosario-1.jpeg",
      title: "Aguas Cristalinas - Islas del Rosario",
      description: "Vista panorámica de las aguas cristalinas y la belleza natural de las Islas del Rosario, un paraíso caribeño único."
    },
    {
      src: "/images/islas-rosario/rosario-2.jpeg", 
      title: "Paraíso Caribeño - Coral Sand",
      description: "Instalaciones del hotel Coral Sand donde disfrutarás de un día completo de relajación y diversión en el Caribe colombiano."
    }
  ];

  const videos = [
    {
      src: "/images/islas-rosario/rosario-video-1.mp4",
      title: "Aguas Cristalinas - Islas del Rosario",
      description: "Descubre la belleza natural de las aguas cristalinas en las paradisíacas Islas del Rosario. Un destino único para relajarse y conectar con la naturaleza.",
      thumbnail: "/images/video-thumb-1.jpeg"
    },
    {
      src: "/images/islas-rosario/rosario-video-2.mp4",
      title: "Coral Sand - Experiencia Completa",
      description: "Vive la experiencia completa en Coral Sand con todas las comodidades y actividades incluidas en tu pasadía.",
      thumbnail: "/images/video-thumb-2.jpeg"
    },
    {
      src: "/images/islas-rosario/rosario-video-3.mp4",
      title: "Actividades y Relajación",
      description: "Disfruta de múltiples actividades: tour en bicicleta, playa libre, piscina y todas las instalaciones del hotel.",
      thumbnail: "/images/video-thumb-3.jpeg"
    },
    {
      src: "/images/islas-rosario/rosario-video-4.mp4",
      title: "Paraíso Caribeño",
      description: "Un día completo de tranquilidad y diversión en el paraíso caribeño de las Islas del Rosario.",
      thumbnail: "/images/video-thumb-4.jpeg"
    }
  ];

  return (
    <>
      <Head>
        <title>Pasadía Coral Sand - Islas del Rosario | Karoba</title>
        <meta name="description" content="Disfruta de un día de tranquilidad frente al mar en las Islas del Rosario. Pasadía Coral Sand con transporte, almuerzo y actividades incluidas." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/karoba-logo.jpeg" />
      </Head>
      
      <Layout>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-dark-900 via-blue-900 to-dark-800 text-white overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/playa-fondo.jpeg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/80 via-blue-900/70 to-dark-800/80"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10">
            <div className="text-center fade-in-up">
              <div className="mb-6">
                <span className="inline-block px-6 py-2 bg-gold-500/20 text-gold-200 rounded-full text-sm font-semibold tracking-wide border border-gold-400/30 backdrop-blur-sm">
                  🏝️ PASADÍA EXCLUSIVA
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Pasadía
                <span className="block text-gradient-hero">Coral Sand</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200 leading-relaxed">
                Un día de tranquilidad frente al mar en las paradisíacas Islas del Rosario
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center space-x-2 text-gold-300">
                  <MapPinIcon className="h-5 w-5" />
                  <span>Islas del Rosario, Cartagena</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-300">
                  <CurrencyDollarIcon className="h-5 w-5" />
                  <span>$280.000 COP</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Información Principal */}
        <section className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-gold-50/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Detalles Rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 fade-in-up">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                <ClockIcon className="h-8 w-8 text-blue-500 mb-3" />
                <h3 className="font-semibold text-dark-800 mb-1">Horario</h3>
                <p className="text-gray-600 text-sm">Salida: 8:45 a.m.</p>
                <p className="text-gray-600 text-sm">Regreso: 3:00 p.m.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gold-100">
                <MapPinIcon className="h-8 w-8 text-gold-500 mb-3" />
                <h3 className="font-semibold text-dark-800 mb-1">Punto de Encuentro</h3>
                <p className="text-gray-600 text-sm">Muelle La Bodeguita</p>
                <p className="text-gray-600 text-sm">Puerta #1 - 7:45 a.m.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                <CurrencyDollarIcon className="h-8 w-8 text-blue-500 mb-3" />
                <h3 className="font-semibold text-dark-800 mb-1">Precio</h3>
                <p className="text-2xl font-bold text-gold-600">$280.000</p>
                <p className="text-gray-600 text-sm">COP por persona</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Contenido Principal */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* ¿Qué Incluye? */}
                <div className="bg-white rounded-2xl shadow-xl border border-gold-200/50 p-8 fade-in-up">
                  <h2 className="text-3xl font-bold text-dark-900 mb-6 flex items-center">
                    <CheckCircleIcon className="h-8 w-8 text-gold-500 mr-3" />
                    ¿Qué Incluye?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">Transporte en lancha</p>
                          <p className="text-gray-600 text-sm">Ida y regreso desde Cartagena</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">Transporte al oceanario</p>
                          <p className="text-gray-600 text-sm">No incluye entrada</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">Cóctel de bienvenida</p>
                          <p className="text-gray-600 text-sm">Al llegar a la isla</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">Tour en bicicleta</p>
                          <p className="text-gray-600 text-sm">Por la isla (disponible por turnos)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">Asoleadora en la playa</p>
                          <p className="text-gray-600 text-sm">Playa libre para disfrutar</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">Almuerzo completo</p>
                          <p className="text-gray-600 text-sm">Menú con 5 opciones disponibles</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">Uso de instalaciones</p>
                          <p className="text-gray-600 text-sm">Hotel Coral Sand: piscina, baños</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menú de Almuerzo */}
                <div className="bg-white rounded-2xl shadow-xl border border-blue-200/50 p-8 fade-in-up">
                  <h2 className="text-3xl font-bold text-dark-900 mb-6">
                    🍽️ Menú de Almuerzo
                  </h2>
                  <p className="text-gray-600 mb-6">Elige entre 5 deliciosas opciones:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gold-50 rounded-lg">
                        <span className="text-2xl">🍗</span>
                        <span className="font-medium text-dark-800">Pechuga de pollo</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <span className="text-2xl">🐟</span>
                        <span className="font-medium text-dark-800">Mojarra frita</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gold-50 rounded-lg">
                        <span className="text-2xl">🥩</span>
                        <span className="font-medium text-dark-800">Chuleta de cerdo</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <span className="text-2xl">🍝</span>
                        <span className="font-medium text-dark-800">Pasta con vegetales</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gold-50 rounded-lg">
                        <span className="text-2xl">🦐</span>
                        <span className="font-medium text-dark-800">Arroz con camarones</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Galería de Fotos y Videos */}
                <div className="bg-white rounded-2xl shadow-xl border border-blue-200/50 p-8 fade-in-up">
                  <h2 className="text-3xl font-bold text-dark-900 mb-6">
                    📸 Galería - Islas del Rosario
                  </h2>
                  <p className="text-gray-600 mb-8">Descubre la belleza natural de las Islas del Rosario</p>
                  
                  {/* Grid de Galería */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Foto 1 - Clickeable */}
                    <div 
                      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer image-thumbnail"
                      onClick={() => setSelectedImage(images[0])}
                    >
                      <img 
                        src="/images/islas-rosario/rosario-1.jpeg" 
                        alt="Islas del Rosario - Vista 1"
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="font-semibold drop-shadow-lg">Aguas Cristalinas</p>
                          <p className="text-sm opacity-90 drop-shadow-lg">Haz clic para ampliar</p>
                        </div>
                      </div>
                      {/* Icono de ampliar */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 rounded-full p-2 zoom-icon">
                          <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Foto 2 - Clickeable */}
                    <div 
                      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer image-thumbnail"
                      onClick={() => setSelectedImage(images[1])}
                    >
                      <img 
                        src="/images/islas-rosario/rosario-2.jpeg" 
                        alt="Islas del Rosario - Vista 2"
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="font-semibold drop-shadow-lg">Paraíso Caribeño</p>
                          <p className="text-sm opacity-90 drop-shadow-lg">Haz clic para ampliar</p>
                        </div>
                      </div>
                      {/* Icono de ampliar */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 rounded-full p-2 zoom-icon">
                          <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Videos con botones de reproducción */}
                    {videos.map((video, index) => (
                      <div 
                        key={index}
                        className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer video-thumbnail"
                        onClick={() => setSelectedVideo(video)}
                      >
                        {/* Thumbnail del video */}
                        <div className="relative w-full h-64 bg-black rounded-xl overflow-hidden">
                          <img 
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          
                          {/* Overlay sutil sin oscurecimiento en hover */}
                          <div className="absolute inset-0 bg-black/20 transition-colors duration-300"></div>
                          
                          {/* Botón de play centrado */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/95 hover:bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl play-button">
                              <PlayIcon className="h-10 w-10 text-gold-600 ml-1" />
                            </div>
                          </div>
                          
                          {/* Información del video */}
                          <div className="absolute bottom-4 left-4 text-white z-10">
                            <p className="font-semibold text-sm drop-shadow-lg">{video.title}</p>
                            <p className="text-xs opacity-90 drop-shadow-lg">Haz clic para reproducir</p>
                          </div>
                          
                          {/* Badge de video */}
                          <div className="absolute top-4 right-4 z-10">
                            <span className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
                              <PlayIcon className="h-3 w-3" />
                              <span>Video HD</span>
                            </span>
                          </div>

                          {/* Efecto de brillo sutil en hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Botón para ver más */}
                  <div className="text-center mt-8">
                    <p className="text-gray-600 mb-4">¿Te gusta lo que ves? ¡Reserva tu pasadía ahora!</p>
                    <a 
                      href="https://wa.me/573236882227?text=¡Hola!%20He%20visto%20la%20galería%20de%20las%20Islas%20del%20Rosario%20y%20me%20encanta.%20Quiero%20reservar%20la%20pasadía%20Coral%20Sand."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <span className="text-xl">📱</span>
                      <span>¡Quiero Reservar!</span>
                    </a>
                  </div>
                </div>

                {/* Mapa de Ubicación */}
                <div className="bg-white rounded-2xl shadow-xl border border-gold-200/50 p-8 fade-in-up">
                  <h2 className="text-3xl font-bold text-dark-900 mb-6 flex items-center">
                    <MapPinIcon className="h-8 w-8 text-gold-500 mr-3" />
                    Ubicación - Islas del Rosario
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Encuentra la ubicación exacta de nuestro destino paradisíaco en las Islas del Rosario
                  </p>
                  
                  {/* Información de Ubicación */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPinIcon className="h-5 w-5 text-gold-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">Destino</p>
                          <p className="text-gray-600">Coral Sand - Islas del Rosario</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <ClockIcon className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">Tiempo de viaje</p>
                          <p className="text-gray-600">45 minutos en lancha desde Cartagena</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <span className="text-gold-500 mt-1 text-lg">🚤</span>
                        <div>
                          <p className="font-semibold text-dark-800">Punto de partida</p>
                          <p className="text-gray-600">Muelle La Bodeguita, Puerta #1</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-gold-50 to-blue-50 rounded-xl p-4">
                        <h3 className="font-semibold text-dark-800 mb-2">📍 Coordenadas</h3>
                        <p className="text-gray-600 text-sm">Islas del Rosario</p>
                        <p className="text-gray-600 text-sm">Cartagena, Colombia</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-gold-50 rounded-xl p-4">
                        <h3 className="font-semibold text-dark-800 mb-2">🌊 Acceso</h3>
                        <p className="text-gray-600 text-sm">Solo por vía marítima</p>
                        <p className="text-gray-600 text-sm">Transporte incluido en el tour</p>
                      </div>
                    </div>
                  </div>

                  {/* Mapa Embebido */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <div className="aspect-w-16 aspect-h-9" style={{ aspectRatio: '16/9' }}>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31330.468!2d-75.7234567!3d10.1666667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625c5c3b5b5b5%3A0x1234567890abcdef!2sIslas%20del%20Rosario%2C%20Cartagena%2C%20Bol%C3%ADvar%2C%20Colombia!5e0!3m2!1ses!2sco!4v1640995200000!5m2!1ses!2sco"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación Coral Sand - Islas del Rosario"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    
                    {/* Overlay con botón para abrir en Google Maps */}
                    <div className="absolute top-4 right-4">
                      <a
                        href="https://maps.app.goo.gl/zgqiXXaNWLPkM1yH7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-gray-50 text-dark-800 px-4 py-2 rounded-lg shadow-lg transition-colors duration-300 flex items-center space-x-2 text-sm font-medium"
                      >
                        <MapPinIcon className="h-4 w-4" />
                        <span>Abrir en Google Maps</span>
                      </a>
                    </div>
                    
                    {/* Botón adicional para direcciones */}
                    <div className="absolute bottom-4 left-4">
                      <a
                        href="https://maps.app.goo.gl/zgqiXXaNWLPkM1yH7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-300 flex items-center space-x-2 text-sm font-medium"
                      >
                        <span>🧭</span>
                        <span>Cómo llegar</span>
                      </a>
                    </div>
                  </div>

                  {/* Instrucciones de Llegada */}
                  <div className="mt-8 bg-gradient-to-r from-blue-50 to-gold-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-dark-900 mb-4">🧭 Cómo Llegar</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-dark-800 mb-2">Desde el Aeropuerto</h4>
                        <ol className="text-gray-600 text-sm space-y-1 list-decimal list-inside">
                          <li>Tomar taxi o Uber al Muelle La Bodeguita (20 min)</li>
                          <li>Dirigirse a la Puerta #1</li>
                          <li>Presentarse a las 7:45 a.m.</li>
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark-800 mb-2">Desde el Centro Histórico</h4>
                        <ol className="text-gray-600 text-sm space-y-1 list-decimal list-inside">
                          <li>Caminar o tomar taxi al Muelle (10 min)</li>
                          <li>Buscar la Puerta #1 de La Bodeguita</li>
                          <li>Llegar puntualmente a las 7:45 a.m.</li>
                        </ol>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gold-200">
                      <p className="text-sm text-gray-700 mb-3">
                        <span className="font-semibold text-gold-600">💡 Consejo:</span> 
                        Te recomendamos llegar 15 minutos antes para el check-in y recibir las instrucciones de seguridad.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href="https://wa.me/573236882227?text=Hola,%20necesito%20ayuda%20con%20las%20direcciones%20para%20llegar%20al%20Muelle%20La%20Bodeguita%20para%20la%20pasadía%20Coral%20Sand"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
                        >
                          <span>📱</span>
                          <span>Ayuda con direcciones</span>
                        </a>
                        
                        <a
                          href="https://maps.app.goo.gl/zgqiXXaNWLPkM1yH7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
                        >
                          <MapPinIcon className="h-4 w-4" />
                          <span>Ver en Google Maps</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Itinerario */}
                <div className="bg-white rounded-2xl shadow-xl border border-gold-200/50 p-8 fade-in-up">
                  <h2 className="text-3xl font-bold text-dark-900 mb-6">
                    📅 Itinerario del Día
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        7:45
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-800 mb-1">Encuentro</h3>
                        <p className="text-gray-600">Muelle La Bodeguita, Puerta #1</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        8:45
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-800 mb-1">Salida</h3>
                        <p className="text-gray-600">Partida en lancha hacia las Islas del Rosario</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        15:00
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-800 mb-1">Regreso</h3>
                        <p className="text-gray-600">Retorno a Cartagena</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar de Reserva */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gold-200/50 p-8 fade-in-up">
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-3xl font-bold text-gold-600">$280.000</span>
                        <span className="text-gray-500">COP</span>
                      </div>
                      <p className="text-gray-600">por persona</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Duración:</span>
                        <span className="font-medium">1 día completo</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Salida:</span>
                        <span className="font-medium">8:45 a.m.</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Regreso:</span>
                        <span className="font-medium">3:00 p.m.</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-600">Ubicación:</span>
                        <span className="font-medium">Islas del Rosario</span>
                      </div>
                    </div>

                    <a 
                      href="https://wa.me/573236882227?text=Hola,%20me%20interesa%20reservar%20la%20pasadía%20Coral%20Sand%20en%20las%20Islas%20del%20Rosario.%20¿Podrían%20darme%20más%20información?"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn-gold text-lg py-4 mb-4 block text-center"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span className="text-xl">📱</span>
                        <span>Reservar por WhatsApp</span>
                      </span>
                    </a>

                    {/* Información de Reserva Actualizada */}
                    <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl p-4 mb-4 text-white text-center">
                      <p className="font-bold text-lg mb-2">¡RESERVA YA!</p>
                      <p className="text-sm mb-3">Información y RESERVAS</p>
                      <a 
                        href="https://wa.me/573236882227?text=Hola,%20me%20interesa%20reservar%20la%20pasadía%20Coral%20Sand%20en%20las%20Islas%20del%20Rosario.%20¿Podrían%20darme%20más%20información?"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 rounded-lg py-2 px-4 transition-colors"
                      >
                        <span className="text-xl">📱</span>
                        <span className="font-bold">323 688 2227</span>
                      </a>
                    </div>

                    <div className="text-center space-y-2">
                      <p className="text-sm text-gray-600">¿Necesitas más información?</p>
                      <div className="flex flex-col space-y-2">
                        <a 
                          href="https://wa.me/573236882227?text=Hola,%20me%20interesa%20más%20información%20sobre%20la%20pasadía%20Coral%20Sand"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700"
                        >
                          <span className="text-lg">📱</span>
                          <span className="text-sm">+57 323 688 2227 (WhatsApp)</span>
                        </a>
                        <a href="mailto:info@karoba.com" className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700">
                          <EnvelopeIcon className="h-4 w-4" />
                          <span className="text-sm">info@karoba.com</span>
                        </a>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <a 
                        href="https://maps.app.goo.gl/zgqiXXaNWLPkM1yH7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 text-gold-600 hover:text-gold-700 transition-colors"
                      >
                        <MapPinIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Ver ubicación en mapa</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal de Video */}
        {selectedVideo && (
          <VideoGalleryModal
            isOpen={!!selectedVideo}
            onClose={() => setSelectedVideo(null)}
            videoSrc={selectedVideo.src}
            title={selectedVideo.title}
            description={selectedVideo.description}
            thumbnail={selectedVideo.thumbnail}
          />
        )}

        {/* Modal de Imagen */}
        {selectedImage && (
          <ImageModal
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            imageSrc={selectedImage.src}
            title={selectedImage.title}
            description={selectedImage.description}
          />
        )}
      </Layout>
    </>
  );
}