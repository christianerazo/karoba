import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import ScrollReveal from './ScrollReveal';

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
        <div className="text-center mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredDestinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.id}`}
              className="group"
            >
              <div className="card-luxury hover:shadow-2xl transition-all duration-500 p-0 overflow-hidden transform hover:-translate-y-2">
                <div className="relative h-56">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-gold-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {destination.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-1 mb-2">
                      <StarIcon className="h-4 w-4 text-gold-400" />
                      <span className="text-sm font-semibold text-white">
                        {destination.rating}
                      </span>
                      <span className="text-xs text-blue-200">Paradisíaco</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl text-dark-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {destination.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    {destination.city}, {destination.country}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gold-600">
                        {formatCurrency(destination.price, destination.currency)}
                      </span>
                      <p className="text-xs text-gray-500">por experiencia caribeña</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-gold-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-white text-sm">🌊</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/destinations" className="btn-primary text-lg px-8 py-4">
            🏝️ Explorar Todos los Paraísos Caribeños
          </Link>
        </div>
        
        {/* Elementos decorativos del mar */}
        <div className="flex justify-center mt-12 space-x-12 text-sm text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">🐠</div>
            <span>Snorkel incluido</span>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🥥</div>
            <span>Gastronomía local</span>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🌿</div>
            <span>Entornos naturales</span>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🌺</div>
            <span>Cultura caribeña</span>
          </div>
        </div>
      </div>
    </section>
  );
}