import Image from 'next/image';

const wellnessExperiences = [
  {
    id: 1,
    title: 'Terapias de Relajación',
    description: 'Masajes terapéuticos con vista al mar',
    image: '/images/wellness-1.jpeg',
    category: 'Spa & Relajación'
  },
  {
    id: 2,
    title: 'Yoga al Amanecer',
    description: 'Sesiones de yoga frente al océano',
    image: '/images/wellness-2.jpeg',
    category: 'Mindfulness'
  },
  {
    id: 3,
    title: 'Meditación en la Playa',
    description: 'Encuentra tu paz interior',
    image: '/images/destination-1.jpeg',
    category: 'Meditación'
  },
  {
    id: 4,
    title: 'Tratamientos Naturales',
    description: 'Medicina ancestral caribeña',
    image: '/images/destination-2.jpeg',
    category: 'Medicina Natural'
  },
  {
    id: 5,
    title: 'Hidroterapia Marina',
    description: 'Sanación con elementos del mar',
    image: '/images/destination-3.jpeg',
    category: 'Terapias Marinas'
  },
  {
    id: 6,
    title: 'Retiros Espirituales',
    description: 'Reconexión con tu esencia',
    image: '/images/destination-4.jpeg',
    category: 'Espiritualidad'
  }
];

export default function WellnessGallery() {
  return (
    <section className="py-20 bg-gradient-to-br from-gold-50/30 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide mb-6">
            🧘‍♀️ EXPERIENCIAS DE BIENESTAR
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-dark-800 mb-6">
            Galería de
            <span className="block text-gradient-luxury">Wellness Auténtico</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sumérgete en un mundo de relajación y renovación con nuestras experiencias 
            de wellness diseñadas para nutrir tu cuerpo, mente y espíritu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wellnessExperiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`group cursor-pointer ${
                index === 0 || index === 3 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="card-luxury hover:shadow-2xl transition-all duration-500 p-0 overflow-hidden transform hover:-translate-y-2">
                <div className={`relative ${
                  index === 0 || index === 3 ? 'h-80' : 'h-64'
                }`}>
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent"></div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-gold-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                      {experience.category}
                    </span>
                  </div>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                      {experience.title}
                    </h3>
                    <p className="text-gray-200 text-sm md:text-base">
                      {experience.description}
                    </p>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-gold-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-gold-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para tu Transformación Wellness?
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Nuestros expertos en bienestar están listos para diseñar la experiencia perfecta para ti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
                Consulta Personalizada
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
                Ver Paquetes Completos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}