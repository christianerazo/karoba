import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { StarIcon, ClockIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { CalendarIcon, CameraIcon } from '@heroicons/react/24/outline';

// Datos del tour (por ahora solo uno)
const tour = {
  id: 'tour-caribe-wellness',
  name: 'Experiencia Wellness Caribe Completa',
  subtitle: 'Retiro de 5 días en el paraíso caribeño',
  description: 'Sumérgete en una experiencia transformadora de wellness en las costas más exclusivas del Caribe colombiano. Combina terapias ancestrales, gastronomía saludable y momentos de conexión profunda con la naturaleza.',
  longDescription: 'Este tour exclusivo de Karoba te llevará a través de un viaje de autodescubrimiento y renovación en los destinos más pristinos del Caribe colombiano. Durante 5 días, experimentarás una combinación única de prácticas de wellness, aventuras naturales y momentos de relajación profunda.',
  duration: '5 días / 4 noches',
  groupSize: '8-12 personas',
  difficulty: 'Principiante - Intermedio',
  price: 2850,
  originalPrice: 3200,
  rating: 4.9,
  reviewCount: 47,
  location: 'Providencia y San Andrés, Colombia',
  images: [
    '/images/tour-1.jpeg',
    '/images/tour-2.jpeg', 
    '/images/tour-3.jpeg',
    '/images/tour-4.jpeg',
    '/images/wellness-1.jpeg',
    '/images/wellness-2.jpeg'
  ],
  highlights: [
    'Meditación en entornos naturales',
    'Gastronomía wellness con ingredientes locales',
    'Snorkeling en arrecifes de coral',
    'Masajes con aceites esenciales caribeños',
    'Talleres de medicina ancestral',
    'Ceremonias de conexión con la naturaleza'
  ],
  itinerary: [
    {
      day: 1,
      title: 'Llegada y Bienvenida',
      activities: ['Recepción en el aeropuerto', 'Check-in en eco-lodge', 'Ceremonia de bienvenida', 'Cena wellness']
    },
    {
      day: 2,
      title: 'Conexión Natural',
      activities: ['Meditación al amanecer', 'Desayuno orgánico', 'Snorkeling guiado', 'Masaje relajante', 'Meditación al atardecer']
    },
    {
      day: 3,
      title: 'Sabiduría Ancestral',
      activities: ['Taller de medicina ancestral', 'Caminata consciente', 'Almuerzo detox', 'Masaje con piedras volcánicas', 'Fogata bajo las estrellas']
    },
    {
      day: 4,
      title: 'Renovación Profunda',
      activities: ['Aqua fitness', 'Taller de cocina wellness', 'Tiempo libre en la playa', 'Ritual de purificación', 'Cena de despedida']
    },
    {
      day: 5,
      title: 'Integración y Partida',
      activities: ['Meditación final', 'Desayuno de despedida', 'Círculo de cierre', 'Traslado al aeropuerto']
    }
  ],
  included: [
    'Alojamiento en eco-lodge de lujo',
    'Todas las comidas (desayuno, almuerzo, cena)',
    'Todas las actividades de wellness',
    'Guías especializados certificados',
    'Traslados aeropuerto-hotel-aeropuerto',
    'Equipo para actividades acuáticas',
    'Kit de wellness personalizado',
    'Seguro de viaje'
  ],
  notIncluded: [
    'Vuelos internacionales',
    'Bebidas alcohólicas',
    'Propinas',
    'Gastos personales',
    'Actividades opcionales no mencionadas'
  ]
};

export default function Tours() {
  return (
    <>
      <Head>
        <title>Tours Wellness - Karoba Travel Colombia</title>
        <meta name="description" content="Descubre nuestros tours exclusivos de wellness en el Caribe colombiano. Experiencias transformadoras que combinan bienestar, naturaleza y cultura ancestral." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/karoba-logo.jpeg" />
      </Head>
      
      <Layout>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-dark-900 via-blue-900 to-dark-800 text-white overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${tour.images[0]}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/80 via-blue-900/70 to-dark-800/80"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10">
            <div className="text-center fade-in-up">
              <div className="mb-6">
                <span className="inline-block px-6 py-2 bg-gold-500/20 text-gold-200 rounded-full text-sm font-semibold tracking-wide border border-gold-400/30 backdrop-blur-sm">
                  🏝️ TOUR EXCLUSIVO WELLNESS
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Tours de
                <span className="block text-gradient-hero">Bienestar Caribeño</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200 leading-relaxed">
                Experiencias transformadoras que combinan wellness, naturaleza y cultura ancestral 
                en los destinos más exclusivos del Caribe colombiano
              </p>
            </div>
          </div>
        </section>

        {/* Tour Principal */}
        <section className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-gold-50/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Galería de Imágenes */}
            <div className="mb-12 fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl overflow-hidden">
                <div className="md:col-span-2">
                  <img 
                    src={tour.images[0]} 
                    alt={tour.name}
                    className="w-full h-96 md:h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                  {tour.images.slice(1, 5).map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${tour.name} - Vista ${index + 2}`}
                      className="w-full h-44 md:h-48 object-cover hover:scale-105 transition-transform duration-700 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Información Principal */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Header del Tour */}
                <div className="fade-in-up">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(tour.rating) ? 'text-gold-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-dark-700 font-semibold ml-2">
                        {tour.rating} ({tour.reviewCount} reseñas)
                      </span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {tour.location}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-2">
                    {tour.name}
                  </h1>
                  <p className="text-xl text-gold-600 font-medium mb-6">
                    {tour.subtitle}
                  </p>
                  
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {tour.description}
                  </p>
                </div>

                {/* Detalles Rápidos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-up">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                    <ClockIcon className="h-8 w-8 text-blue-500 mb-3" />
                    <h3 className="font-semibold text-dark-800 mb-1">Duración</h3>
                    <p className="text-gray-600">{tour.duration}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gold-100">
                    <UserGroupIcon className="h-8 w-8 text-gold-500 mb-3" />
                    <h3 className="font-semibold text-dark-800 mb-1">Grupo</h3>
                    <p className="text-gray-600">{tour.groupSize}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                    <CameraIcon className="h-8 w-8 text-blue-500 mb-3" />
                    <h3 className="font-semibold text-dark-800 mb-1">Nivel</h3>
                    <p className="text-gray-600">{tour.difficulty}</p>
                  </div>
                </div>

                {/* Descripción Extendida */}
                <div className="fade-in-up">
                  <h2 className="text-2xl font-bold text-dark-900 mb-4">Sobre esta Experiencia</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {tour.longDescription}
                  </p>
                </div>

                {/* Highlights */}
                <div className="fade-in-up">
                  <h2 className="text-2xl font-bold text-dark-900 mb-6">Lo que Incluye esta Experiencia</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gold-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Itinerario */}
                <div className="fade-in-up">
                  <h2 className="text-2xl font-bold text-dark-900 mb-6">Itinerario Detallado</h2>
                  <div className="space-y-6">
                    {tour.itinerary.map((day, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center text-white font-bold">
                            {day.day}
                          </div>
                          <h3 className="text-xl font-semibold text-dark-900">{day.title}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {day.activities.map((activity, actIndex) => (
                            <div key={actIndex} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar de Reserva */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gold-200/50 p-8 fade-in-up">
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-3xl font-bold text-gold-600">${tour.price.toLocaleString()}</span>
                        <span className="text-lg text-gray-500 line-through">${tour.originalPrice.toLocaleString()}</span>
                      </div>
                      <p className="text-gray-600">por persona</p>
                      <div className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold mt-2">
                        ¡Ahorra ${(tour.originalPrice - tour.price).toLocaleString()}!
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-dark-800 mb-2">
                          Fecha de inicio
                        </label>
                        <div className="relative">
                          <input 
                            type="date" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                          />
                          <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-dark-800 mb-2">
                          Número de personas
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent">
                          <option>1 persona</option>
                          <option>2 personas</option>
                          <option>3 personas</option>
                          <option>4 personas</option>
                        </select>
                      </div>
                    </div>

                    <button className="w-full btn-gold text-lg py-4 mb-4">
                      Reservar Ahora
                    </button>
                    
                    <button className="w-full btn-secondary text-lg py-4 mb-6">
                      Consultar Disponibilidad
                    </button>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-semibold text-dark-800 mb-4">Incluye:</h3>
                      <div className="space-y-2">
                        {tour.included.slice(0, 4).map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                        <button className="text-gold-600 text-sm font-medium hover:text-gold-700 transition-colors">
                          Ver todo lo incluido →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}