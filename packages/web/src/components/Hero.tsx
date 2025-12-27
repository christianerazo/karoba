import { useScrollEffects } from '../hooks/useScrollEffects';

export default function Hero() {
  const { scrollY } = useScrollEffects();
  
  // Parallax effects
  const parallaxBg = scrollY * 0.5;
  const parallaxContent = scrollY * 0.2;
  const parallaxElements = scrollY * 0.3;

  return (
    <>
      <section className="relative bg-gradient-to-br from-dark-900 via-blue-900 to-dark-800 text-white overflow-hidden -mt-20 pt-20">
        {/* Imagen de fondo real con parallax */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate3d(0, ${parallaxBg}px, 0)`,
            willChange: 'transform',
          }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{
              backgroundImage: "url('/images/hero-bg.jpeg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/80 via-blue-900/70 to-dark-800/80"></div>
        </div>
        
        {/* Decorative luxury elements con parallax */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate3d(0, ${parallaxElements}px, 0)`,
            willChange: 'transform',
          }}
        >
          {/* Olas sutiles */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gold-400/10 to-transparent"></div>
          
          {/* Elementos de lujo flotantes */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          {/* Patrones de lujo */}
          <div className="absolute top-40 right-20 w-64 h-64 luxury-pattern rounded-full opacity-30"></div>
          <div className="absolute bottom-40 left-20 w-48 h-48 ocean-wave rounded-full opacity-20"></div>
        </div>
        
        <div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10"
          style={{
            transform: `translate3d(0, ${parallaxContent}px, 0)`,
            willChange: 'transform',
          }}
        >
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-gold-500/20 text-gold-200 rounded-full text-sm font-semibold tracking-wide border border-gold-400/30 backdrop-blur-sm">
                🏝️ WELLNESS EXCLUSIVO EN EL CARIBE COLOMBIANO
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Descubre el
              <span className="block text-gradient-hero">Bienestar Auténtico</span>
              <span className="block text-gold-300">del Caribe</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed backdrop-blur-sm bg-dark-900/20 rounded-2xl p-6">
              Sumérgete en experiencias transformadoras entre aguas cristalinas y arenas doradas. 
              Karoba te conecta con el wellness más exclusivo del Caribe colombiano.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="btn-primary text-lg px-8 py-4 backdrop-blur-sm">
                🌊 Explorar Experiencias Caribeñas
              </button>
              
              {/* Video Preview Window */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 border border-gold-300/30 shadow-2xl hover:shadow-gold-500/20 transition-all duration-500">
                  <div className="relative overflow-hidden rounded-xl">
                    <video 
                      className="w-80 h-48 object-cover rounded-xl"
                      controls
                      poster="/images/hero-bg.jpeg"
                      preload="metadata"
                    >
                      <source src="/images/karoba-video.mp4" type="video/mp4" />
                      Tu navegador no soporta la reproducción de video.
                    </video>
                    
                    {/* Overlay decorativo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 via-transparent to-gold-400/10 rounded-xl pointer-events-none"></div>
                    
                    {/* Título del video */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-dark-900/80 backdrop-blur-sm rounded-lg px-3 py-2">
                        <h4 className="text-white text-sm font-semibold">🏝️ Paraíso Wellness Karoba</h4>
                        <p className="text-gold-300 text-xs">Descubre la experiencia completa</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative frame */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold-400/20 via-blue-400/20 to-gold-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group backdrop-blur-sm bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🧘‍♀️</span>
                </div>
                <h3 className="text-lg font-semibold text-gold-300 mb-2">Yoga Frente al Mar</h3>
                <p className="text-gray-300">Reconecta con el sonido de las olas</p>
              </div>
              <div className="text-center group backdrop-blur-sm bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🏝️</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Islas Privadas</h3>
                <p className="text-gray-300">Sanación en paraísos exclusivos</p>
              </div>
              <div className="text-center group backdrop-blur-sm bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🐚</span>
                </div>
                <h3 className="text-lg font-semibold text-gold-300 mb-2">Terapias Marinas</h3>
                <p className="text-gray-300">Tratamientos con elementos del mar</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ola decorativa en la parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-current text-blue-50/20">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>
    </>
  );
}