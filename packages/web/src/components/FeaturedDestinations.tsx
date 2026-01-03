import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';

// Función temporal para formatear moneda
const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Mock data - destinos caribeños de Colombia con imágenes reales
const featuredDestinations = [
  {
    id: '1',
    name: 'Retiro Wellness Islas del Rosario',
    city: 'Cartagena',
    country: 'Colombia',
    image: '/images/destination-1.jpeg',
    rating: 4.9,
    price: 650,
    currency: 'USD',
    category: 'Retiro Exclusivo'
  },
  {
    id: '2',
    name: 'Spa Natural - Providencia',
    city: 'San Andrés y Providencia',
    country: 'Colombia',
    image: '/images/destination-2.jpeg',
    rating: 4.8,
    price: 480,
    currency: 'USD',
    category: 'Terapias Naturales'
  },
  {
    id: '3',
    name: 'Eco Lodge Playa Blanca',
    city: 'Santa Marta',
    country: 'Colombia',
    image: '/images/destination-3.jpeg',
    rating: 4.9,
    price: 420,
    currency: 'USD',
    category: 'Eco Wellness'
  },
  {
    id: '4',
    name: 'Centro Ayurvédico Caribeño',
    city: 'Barranquilla',
    country: 'Colombia',
    image: '/images/destination-4.jpeg',
    rating: 4.7,
    price: 380,
    currency: 'USD',
    category: 'Medicina Ancestral'
  }
];

export default function FeaturedDestinations() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-gold-50/30 luxury-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header simplificado - SIN ScrollReveal */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-6 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold tracking-wide mb-6">
            🏝️ EXPERIENCIAS CARIBEÑAS EXCLUSIVAS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-dark-800 mb-6">
            Paraísos Wellness
            <span className="block text-gradient-luxury">del Caribe Colombiano</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre los destinos más exclusivos donde el wellness se encuentra con las aguas cristalinas 
            y la cultura vibrante del Caribe colombiano 🌊
          </p>
        </div>

        {/* Grid simplificado - SIN staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {featuredDestinations.map((destination, index) => (
            <div key={destination.id}>
              <Link href={`/destinations/${destination.id}`} className="group block">
                <div className="card-luxury hover:shadow-2xl transition-all duration-300 p-0 overflow-hidden transform hover:-translate-y-2 hover:scale-105">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent"></div>
                    
                    {/* Category badge */}
                    <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform duration-300">
                      <span className="bg-gradient-to-r from-gold-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-lg">
                        {destination.category}
                      </span>
                    </div>
                    
                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-1 mb-2 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                        <StarIcon className="h-4 w-4 text-gold-400 group-hover:text-gold-300 transition-colors duration-200" />
                        <span className="text-sm font-semibold text-white">
                          {destination.rating}
                        </span>
                        <span className="text-xs text-blue-200 group-hover:text-blue-100 transition-colors duration-200">Paradisíaco</span>
                      </div>
                    </div>

                    {/* Overlay de hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-gold-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-dark-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {destination.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 flex items-center group-hover:text-gray-700 transition-colors duration-300">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 group-hover:bg-blue-500 transition-colors duration-300"></span>
                      {destination.city}, {destination.country}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gold-600 group-hover:text-gold-700 transition-colors duration-300">
                          {formatCurrency(destination.price, destination.currency)}
                        </span>
                        <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">por experiencia caribeña</p>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-gold-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                        <span className="text-white text-sm">🌊</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA simplificado */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Link href="/pasadia" className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
            🏝️ Conoce Nuestro Pasadía Exclusivo
          </Link>
        </div>
        
        {/* Elementos decorativos simplificados */}
        <div className="flex justify-center mt-12 space-x-12 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          {[
            { icon: '🐠', text: 'Snorkel incluido' },
            { icon: '🥥', text: 'Gastronomía local' },
            { icon: '🌿', text: 'Entornos naturales' },
            { icon: '🌺', text: 'Cultura caribeña' }
          ].map((item, index) => (
            <div key={index} className="text-center group cursor-default">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <span className="group-hover:text-gray-700 transition-colors duration-300">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}