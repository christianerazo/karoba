import Head from 'next/head';
import Layout from '../components/Layout';
import VideoGalleryModal from '../components/VideoGalleryModal';
import ImageModal from '../components/ImageModal';
import GalleryModal from '../components/GalleryModal';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
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
  const { t } = useLanguage();
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);

  const images = [
    {
      src: "/images/islas-rosario/rosario-1.jpeg",
      title: t('pasadia.gallery.photo1'),
      description: "Vista panorámica de las aguas cristalinas y la belleza natural de las Islas del Rosario, un paraíso caribeño único."
    },
    {
      src: "/images/islas-rosario/rosario-2.jpeg", 
      title: t('pasadia.gallery.photo2'),
      description: "Instalaciones del hotel Coral Sand donde disfrutarás de un día completo de relajación y diversión en el Caribe colombiano."
    }
  ];

  const videos = [
    {
      src: "/images/islas-rosario/rosario-video-1.mp4",
      title: "Aguas Cristalinas - Islas del Rosario",
      description: "Descubre la belleza natural de las aguas cristalinas en las paradisíacas Islas del Rosario. Un destino único para relajarse y conectar con la naturaleza.",
      thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      src: "/images/islas-rosario/rosario-video-2.mp4",
      title: "Coral Sand - Experiencia Completa",
      description: "Vive la experiencia completa en Coral Sand con todas las comodidades y actividades incluidas en tu pasadía.",
      thumbnail: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      src: "/images/islas-rosario/rosario-video-3.mp4",
      title: "Actividades y Relajación",
      description: "Disfruta de múltiples actividades: tour en bicicleta, playa libre, piscina y todas las instalaciones del hotel.",
      thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      src: "/images/islas-rosario/rosario-video-4.mp4",
      title: "Paraíso Caribeño",
      description: "Un día completo de tranquilidad y diversión en el paraíso caribeño de las Islas del Rosario.",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  // Combinar imágenes y videos en una sola galería
  const galleryItems = [
    ...images.map(img => ({ type: 'image' as const, src: img.src })),
    ...videos.map(video => ({ type: 'video' as const, src: video.src, thumbnail: video.thumbnail }))
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
                  🏝️ {t('pasadia.hero.badge')}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {t('pasadia.hero.title')}
                <span className="block text-gradient-hero">{t('pasadia.hero.subtitle')}</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200 leading-relaxed">
                {t('pasadia.hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center space-x-2 text-gold-300">
                  <MapPinIcon className="h-5 w-5" />
                  <span>{t('pasadia.hero.location')}</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-300">
                  <CurrencyDollarIcon className="h-5 w-5" />
                  <span>{t('pasadia.hero.price')}</span>
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
                <h3 className="font-semibold text-dark-800 mb-1">{t('pasadia.schedule.title')}</h3>
                <p className="text-gray-600 text-sm">{t('pasadia.schedule.departure')}</p>
                <p className="text-gray-600 text-sm">{t('pasadia.schedule.return')}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gold-100">
                <MapPinIcon className="h-8 w-8 text-gold-500 mb-3" />
                <h3 className="font-semibold text-dark-800 mb-1">{t('pasadia.meeting.title')}</h3>
                <p className="text-gray-600 text-sm">{t('pasadia.meeting.location')}</p>
                <p className="text-gray-600 text-sm">{t('pasadia.meeting.gate')}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center space-x-2 mb-3">
                  <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 className="font-semibold text-dark-800">{t('pasadia.price.title')}</h3>
                </div>
                <p className="text-lg font-bold text-green-600 mb-2">{t('pasadia.price.amount')}</p>
                <p className="text-gray-600 text-sm mb-4">{t('pasadia.price.currency')}</p>
                <a 
                  href="https://wa.me/573236882227?text=Hola! Me interesa el pasadía a las Islas del Rosario. ¿Podrían darme información sobre precios y disponibilidad?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>{t('pasadia.price.whatsapp.cta')}</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Contenido Principal */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* ¿Qué Incluye? */}
                <div className="bg-white rounded-2xl shadow-xl border border-gold-200/50 p-8 fade-in-up">
                  <h2 className="text-3xl font-bold text-dark-900 mb-6 flex items-center">
                    <CheckCircleIcon className="h-8 w-8 text-gold-500 mr-3" />
                    {t('pasadia.includes.title')}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">{t('pasadia.transport.boat')}</p>
                          <p className="text-gray-600 text-sm">{t('pasadia.transport.description')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">{t('pasadia.transport.oceanarium')}</p>
                          <p className="text-gray-600 text-sm">{t('pasadia.transport.note')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">{t('pasadia.welcome.cocktail')}</p>
                          <p className="text-gray-600 text-sm">{t('pasadia.welcome.description')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">{t('pasadia.bike.tour')}</p>
                          <p className="text-gray-600 text-sm">{t('pasadia.bike.description')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">{t('pasadia.beach.access')}</p>
                          <p className="text-gray-600 text-sm">{t('pasadia.beach.description')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">{t('pasadia.lunch.complete')}</p>
                          <p className="text-gray-600 text-sm">{t('pasadia.lunch.description')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">{t('pasadia.facilities.use')}</p>
                          <p className="text-gray-600 text-sm">{t('pasadia.facilities.description')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Galería de Fotos y Videos */}
                <div className="bg-white rounded-2xl shadow-xl border border-blue-200/50 p-8 fade-in-up">
                  <h2 className="text-3xl font-bold text-dark-900 mb-6">
                    📸 {t('pasadia.gallery.title')}
                  </h2>
                  <p className="text-gray-600 mb-8">{t('pasadia.gallery.subtitle')}</p>
                  
                  {/* Grid de Galería */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Foto 1 - Clickeable */}
                    <div 
                      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer image-thumbnail"
                      onClick={() => setSelectedGalleryIndex(0)}
                    >
                      <img 
                        src="/images/islas-rosario/rosario-1.jpeg" 
                        alt="Islas del Rosario - Vista 1"
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="font-semibold drop-shadow-lg">{t('pasadia.gallery.photo1')}</p>
                          <p className="text-sm opacity-90 drop-shadow-lg">{t('pasadia.gallery.photo1.subtitle')}</p>
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
                      onClick={() => setSelectedGalleryIndex(1)}
                    >
                      <img 
                        src="/images/islas-rosario/rosario-2.jpeg" 
                        alt="Islas del Rosario - Vista 2"
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="font-semibold drop-shadow-lg">{t('pasadia.gallery.photo2')}</p>
                          <p className="text-sm opacity-90 drop-shadow-lg">{t('pasadia.gallery.photo2.subtitle')}</p>
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
                        onClick={() => setSelectedGalleryIndex(images.length + index)}
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
                            <p className="text-xs opacity-90 drop-shadow-lg">{t('gallery.click.play')}</p>
                          </div>
                          
                          {/* Badge de video */}
                          <div className="absolute top-4 right-4 z-10">
                            <span className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
                              <PlayIcon className="h-3 w-3" />
                              <span>{t('pasadia.gallery.video.badge')}</span>
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
                    <p className="text-gray-600 mb-4">{t('pasadia.gallery.cta')}</p>
                    <a 
                      href="https://wa.me/573236882227?text=¡Hola!%20He%20visto%20la%20galería%20de%20las%20Islas%20del%20Rosario%20y%20me%20encanta.%20Quiero%20reservar%20la%20pasadía%20Coral%20Sand."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <span className="text-xl">📱</span>
                      <span>{t('pasadia.reserve')}</span>
                    </a>
                  </div>
                </div>

                {/* Menú de Almuerzo */}
                <div className="bg-white rounded-2xl shadow-xl border border-blue-200/50 p-8 fade-in-up">
                  <h2 className="text-3xl font-bold text-dark-900 mb-6">
                    🍽️ {t('pasadia.menu.title')}
                  </h2>
                  <p className="text-gray-600 mb-6">{t('pasadia.menu.subtitle')}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gold-50 rounded-lg">
                        <span className="text-2xl">🍗</span>
                        <span className="font-medium text-dark-800">{t('pasadia.menu.chicken')}</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <span className="text-2xl">🐟</span>
                        <span className="font-medium text-dark-800">{t('pasadia.menu.fish')}</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gold-50 rounded-lg">
                        <span className="text-2xl">🥩</span>
                        <span className="font-medium text-dark-800">{t('pasadia.menu.pork')}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <span className="text-2xl">🍝</span>
                        <span className="font-medium text-dark-800">{t('pasadia.menu.pasta')}</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gold-50 rounded-lg">
                        <span className="text-2xl">🦐</span>
                        <span className="font-medium text-dark-800">{t('pasadia.menu.rice')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mapa de Ubicación */}
                <div className="bg-white rounded-2xl shadow-xl border border-gold-200/50 p-8 fade-in-up">
                  <h2 className="text-3xl font-bold text-dark-900 mb-6 flex items-center">
                    <MapPinIcon className="h-8 w-8 text-gold-500 mr-3" />
                    {t('pasadia.location.title')}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {t('pasadia.location.subtitle')}
                  </p>
                  
                  {/* Información de Ubicación */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPinIcon className="h-5 w-5 text-gold-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">{t('pasadia.location.destination')}</p>
                          <p className="text-gray-600">{t('pasadia.location.destination.name')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <ClockIcon className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-dark-800">{t('pasadia.location.travel.time')}</p>
                          <p className="text-gray-600">{t('pasadia.location.travel.description')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <span className="text-gold-500 mt-1 text-lg">🚤</span>
                        <div>
                          <p className="font-semibold text-dark-800">{t('pasadia.location.departure')}</p>
                          <p className="text-gray-600">{t('pasadia.location.departure.name')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-gold-50 to-blue-50 rounded-xl p-4">
                        <h3 className="font-semibold text-dark-800 mb-2">📍 {t('pasadia.location.coordinates')}</h3>
                        <p className="text-gray-600 text-sm">{t('pasadia.location.coordinates.name')}</p>
                        <p className="text-gray-600 text-sm">{t('pasadia.location.coordinates.country')}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-gold-50 rounded-xl p-4">
                        <h3 className="font-semibold text-dark-800 mb-2">🌊 {t('pasadia.location.access')}</h3>
                        <p className="text-gray-600 text-sm">{t('pasadia.location.access.sea')}</p>
                        <p className="text-gray-600 text-sm">{t('pasadia.location.access.included')}</p>
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
                        <span>{t('pasadia.location.maps')}</span>
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
                        <span>{t('pasadia.location.directions')}</span>
                      </a>
                    </div>
                  </div>

                  {/* Instrucciones de Llegada */}
                  <div className="mt-8 bg-gradient-to-r from-blue-50 to-gold-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-dark-900 mb-4">🧭 {t('pasadia.directions.title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-dark-800 mb-2">{t('pasadia.directions.airport')}</h4>
                        <ol className="text-gray-600 text-sm space-y-1 list-decimal list-inside">
                          <li>{t('pasadia.directions.airport.1')}</li>
                          <li>{t('pasadia.directions.airport.2')}</li>
                          <li>{t('pasadia.directions.airport.3')}</li>
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark-800 mb-2">{t('pasadia.directions.center')}</h4>
                        <ol className="text-gray-600 text-sm space-y-1 list-decimal list-inside">
                          <li>{t('pasadia.directions.center.1')}</li>
                          <li>{t('pasadia.directions.center.2')}</li>
                          <li>{t('pasadia.directions.center.3')}</li>
                        </ol>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gold-200">
                      <p className="text-sm text-gray-700 mb-3">
                        <span className="font-semibold text-gold-600">💡 Consejo:</span> 
                        {t('pasadia.directions.tip')}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href="https://wa.me/573236882227?text=Hola,%20necesito%20ayuda%20con%20las%20direcciones%20para%20llegar%20al%20Muelle%20La%20Bodeguita%20para%20la%20pasadía%20Coral%20Sand"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
                        >
                          <span>📱</span>
                          <span>{t('pasadia.directions.help')}</span>
                        </a>
                        
                        <a
                          href="https://maps.app.goo.gl/zgqiXXaNWLPkM1yH7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
                        >
                          <MapPinIcon className="h-4 w-4" />
                          <span>{t('pasadia.directions.maps')}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Itinerario */}
                <div className="bg-white rounded-2xl shadow-xl border border-gold-200/50 p-8 fade-in-up">
                  <h2 className="text-3xl font-bold text-dark-900 mb-6">
                    📅 {t('pasadia.itinerary.title')}
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        7:45
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-800 mb-1">{t('pasadia.itinerary.meeting')}</h3>
                        <p className="text-gray-600">{t('pasadia.itinerary.meeting.location')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        8:45
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-800 mb-1">{t('pasadia.itinerary.departure')}</h3>
                        <p className="text-gray-600">{t('pasadia.itinerary.departure.description')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        15:00
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-800 mb-1">Regreso</h3>
                        <p className="text-gray-600">{t('pasadia.itinerary.return')}</p>
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
                        <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        <span className="text-2xl font-bold text-green-600">{t('pasadia.price.availability')}</span>
                      </div>
                      <p className="text-gray-600">{t('pasadia.price.whatsapp')}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{t('pasadia.sidebar.duration')}</span>
                        <span className="font-medium">{t('pasadia.sidebar.duration.time')}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{t('pasadia.sidebar.departure')}</span>
                        <span className="font-medium">8:45 a.m.</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{t('pasadia.sidebar.return')}</span>
                        <span className="font-medium">3:00 p.m.</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-600">{t('pasadia.sidebar.location')}</span>
                        <span className="font-medium">{t('pasadia.sidebar.location.name')}</span>
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
                        <span>{t('pasadia.sidebar.reserve.whatsapp')}</span>
                      </span>
                    </a>

                    {/* Información de Reserva Actualizada */}
                    <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl p-4 mb-4 text-white text-center">
                      <p className="font-bold text-lg mb-2">{t('pasadia.sidebar.reserve.title')}</p>
                      <p className="text-sm mb-3">{t('pasadia.sidebar.reserve.subtitle')}</p>
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
                      <p className="text-sm text-gray-600">{t('pasadia.sidebar.info')}</p>
                      <div className="flex flex-col space-y-2">
                        <a 
                          href="https://wa.me/573236882227?text=Hola,%20me%20interesa%20más%20información%20sobre%20la%20pasadía%20Coral%20Sand"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700"
                        >
                          <span className="text-lg">📱</span>
                          <span className="text-sm">{t('pasadia.sidebar.whatsapp')}</span>
                        </a>
                        <a href="mailto:karoba.wellness@gmail.com" className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700">
                          <EnvelopeIcon className="h-4 w-4" />
                          <span className="text-sm">{t('pasadia.sidebar.email')}</span>
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
                        <span className="text-sm font-medium">{t('pasadia.sidebar.map')}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal de Galería Unificado */}
        {selectedGalleryIndex !== null && (
          <GalleryModal
            isOpen={selectedGalleryIndex !== null}
            onClose={() => setSelectedGalleryIndex(null)}
            items={galleryItems}
            currentIndex={selectedGalleryIndex}
            onNavigate={setSelectedGalleryIndex}
          />
        )}
      </Layout>
    </>
  );
}