import { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import ScrollReveal from './ScrollReveal';

export default function SearchSection() {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Búsqueda:', searchData);
    // TODO: Implementar lógica de búsqueda
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-gold-50 py-16 -mt-16 relative z-10 luxury-pattern">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={200} duration={800}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark-800 mb-4">
              Encuentra tu Paraíso Wellness Caribeño
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Personaliza tu búsqueda para descubrir retiros en la naturaleza, spas con vista panorámica 
              y experiencias de bienestar únicas en el Caribe colombiano 🏝️
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={400} duration={1000} distance={40}>
          <div className="card-luxury hover:shadow-2xl transition-all duration-500">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Destino */}
              <ScrollReveal direction="up" delay={600} duration={600} distance={20}>
                <div className="relative">
                  <label className="block text-sm font-semibold text-dark-700 mb-3">
                    🏝️ Destino Caribeño
                  </label>
                  <div className="relative group">
                    <MapPinIcon className="absolute left-4 top-4 h-5 w-5 text-blue-500 group-hover:text-blue-600 transition-colors duration-200" />
                    <input
                      type="text"
                      placeholder="¿Qué playa te llama?"
                      className="input pl-12 hover:border-blue-300 focus:scale-105 transition-all duration-300"
                      value={searchData.destination}
                      onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Check-in */}
              <ScrollReveal direction="up" delay={700} duration={600} distance={20}>
                <div className="relative">
                  <label className="block text-sm font-semibold text-dark-700 mb-3">
                    🌅 Fecha de Llegada
                  </label>
                  <div className="relative group">
                    <CalendarIcon className="absolute left-4 top-4 h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />
                    <input
                      type="date"
                      className="input pl-12 hover:border-blue-300 focus:scale-105 transition-all duration-300"
                      value={searchData.checkIn}
                      onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Check-out */}
              <ScrollReveal direction="up" delay={800} duration={600} distance={20}>
                <div className="relative">
                  <label className="block text-sm font-semibold text-dark-700 mb-3">
                    🌇 Fecha de Salida
                  </label>
                  <div className="relative group">
                    <CalendarIcon className="absolute left-4 top-4 h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />
                    <input
                      type="date"
                      className="input pl-12 hover:border-blue-300 focus:scale-105 transition-all duration-300"
                      value={searchData.checkOut}
                      onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Huéspedes */}
              <ScrollReveal direction="up" delay={900} duration={600} distance={20}>
                <div className="relative">
                  <label className="block text-sm font-semibold text-dark-700 mb-3">
                    👥 Viajeros
                  </label>
                  <div className="relative group">
                    <UserGroupIcon className="absolute left-4 top-4 h-5 w-5 text-gold-500 group-hover:text-gold-600 transition-colors duration-200" />
                    <select
                      className="input pl-12 hover:border-gold-300 focus:scale-105 transition-all duration-300"
                      value={searchData.guests}
                      onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) })}
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'persona' : 'personas'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </ScrollReveal>

              {/* Botón de búsqueda */}
              <ScrollReveal direction="up" delay={1000} duration={800} distance={30}>
                <div className="md:col-span-4 flex justify-center mt-6">
                  <button
                    type="submit"
                    className="btn-primary flex items-center space-x-3 px-12 py-4 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <MagnifyingGlassIcon className="h-6 w-6" />
                    <span>🌊 Buscar Mi Paraíso Wellness</span>
                  </button>
                </div>
              </ScrollReveal>
            </form>
          </div>
        </ScrollReveal>
        
        {/* Elementos decorativos con animación escalonada */}
        <ScrollReveal direction="fade" delay={1200} duration={800}>
          <div className="flex justify-center mt-8 space-x-8 text-sm text-gray-500">
            {[
              { icon: '🌿', text: 'Entornos naturales' },
              { icon: '🐠', text: 'Snorkel & buceo' },
              { icon: '🥥', text: 'Gastronomía caribeña' }
            ].map((item, index) => (
              <ScrollReveal key={index} direction="scale" delay={1300 + (index * 100)} duration={500}>
                <span className="flex items-center space-x-1 hover:text-gray-700 transition-colors duration-300 cursor-default">
                  <span className="text-lg hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  <span>{item.text}</span>
                </span>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}