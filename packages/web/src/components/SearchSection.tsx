import { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

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
        <div className="text-center mb-8 fade-in-up">
          <h2 className="text-3xl font-bold text-dark-800 mb-4">
            Encuentra tu Paraíso Wellness Caribeño
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Personaliza tu búsqueda para descubrir retiros en la naturaleza, spas con vista panorámica 
            y experiencias de bienestar únicas en el Caribe colombiano 🏝️
          </p>
        </div>
        
        <div className="card-luxury">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Destino */}
            <div className="relative">
              <label className="block text-sm font-semibold text-dark-700 mb-3">
                🏝️ Destino Caribeño
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-4 top-4 h-5 w-5 text-blue-500" />
                <input
                  type="text"
                  placeholder="¿Qué playa te llama?"
                  className="input pl-12"
                  value={searchData.destination}
                  onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="relative">
              <label className="block text-sm font-semibold text-dark-700 mb-3">
                🌅 Fecha de Llegada
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-4 top-4 h-5 w-5 text-blue-600" />
                <input
                  type="date"
                  className="input pl-12"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="relative">
              <label className="block text-sm font-semibold text-dark-700 mb-3">
                🌇 Fecha de Salida
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-4 top-4 h-5 w-5 text-blue-600" />
                <input
                  type="date"
                  className="input pl-12"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                />
              </div>
            </div>

            {/* Huéspedes */}
            <div className="relative">
              <label className="block text-sm font-semibold text-dark-700 mb-3">
                👥 Viajeros
              </label>
              <div className="relative">
                <UserGroupIcon className="absolute left-4 top-4 h-5 w-5 text-gold-500" />
                <select
                  className="input pl-12"
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

            {/* Botón de búsqueda */}
            <div className="md:col-span-4 flex justify-center mt-6">
              <button
                type="submit"
                className="btn-primary flex items-center space-x-3 px-12 py-4 text-lg shadow-xl hover:shadow-2xl"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
                <span>🌊 Buscar Mi Paraíso Wellness</span>
              </button>
            </div>
          </form>
        </div>
        
        {/* Elementos decorativos */}
        <div className="flex justify-center mt-8 space-x-8 text-sm text-gray-500">
          <span className="flex items-center space-x-1">
            <span>🌿</span>
            <span>Entornos naturales</span>
          </span>
          <span className="flex items-center space-x-1">
            <span>🐠</span>
            <span>Snorkel & buceo</span>
          </span>
          <span className="flex items-center space-x-1">
            <span>🥥</span>
            <span>Gastronomía caribeña</span>
          </span>
        </div>
      </div>
    </section>
  );
}