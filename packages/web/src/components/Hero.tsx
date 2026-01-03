import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative bg-gradient-to-br from-dark-900 via-blue-900 to-dark-800 text-white overflow-hidden min-h-screen flex items-center" style={{ marginTop: '-80px', paddingTop: '80px' }}>
        {/* Imagen de fondo estática - SIN parallax */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/hero-bg.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay estático */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/80 via-blue-900/70 to-dark-800/80" />
        </div>
        
        {/* Elementos decorativos estáticos - SIN animaciones */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gold-400/5 to-transparent" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10 w-full">
          <div className="text-center">
            {/* Contenido sin ScrollReveal - animaciones CSS simples */}
            <div className="mb-8 animate-fade-in">
              <span className="inline-block px-6 py-2 bg-gold-500/20 text-gold-200 rounded-full text-sm font-semibold tracking-wide border border-gold-400/30 backdrop-blur-sm">
                🏝️ {t('home.hero.subtitle').toUpperCase()}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('home.hero.title')}
              <span className="block text-gradient-hero">{t('home.hero.subtitle')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed backdrop-blur-sm bg-dark-900/20 rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {t('home.hero.description')}
            </p>
            
            {/* Widget del Pasadía - Centrado */}
            <div className="flex justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link href="/pasadia" className="relative group">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gold-300/30 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-md">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img 
                      src="/images/pasadia-widget.jpeg"
                      alt="Islas del Rosario - Coral Sand"
                      className="w-full h-48 object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Badge de consulta */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
                        <span>💬</span>
                        <span>{t('pasadia.price.whatsapp.cta')}</span>
                      </span>
                    </div>
                    
                    {/* Badge de duración */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        ⏱️ Todo el día
                      </span>
                    </div>
                    
                    {/* Overlay con icono de enlace */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-200 transition-colors duration-300">
                      🏝️ {t('home.hero.widget.title')}
                    </h3>
                    <p className="text-blue-100 text-sm mb-3 group-hover:text-white transition-colors duration-300">
                      {t('home.hero.widget.subtitle')}
                    </p>
                    
                    {/* Características destacadas */}
                    <div className="flex justify-center space-x-6 text-xs text-gold-300 mb-3">
                      <span className="flex items-center">
                        🍽️ {t('home.hero.widget.lunch')}
                      </span>
                      <span className="flex items-center">
                        🚤 {t('home.hero.widget.transport')}
                      </span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gold-500/20 to-blue-500/20 rounded-lg p-3 border border-gold-400/30">
                      <p className="text-white text-sm font-medium">
                        ✨ {t('home.hero.widget.cta')}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Cards simplificadas - SIN staggered animations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
              {[
                { icon: '🧘‍♀️', title: t('hero.wellness.natural'), desc: t('hero.wellness.natural.desc'), color: 'from-gold-400 to-blue-500' },
                { icon: '🏝️', title: t('hero.wellness.retreats'), desc: t('hero.wellness.retreats.desc'), color: 'from-blue-400 to-gold-500' },
                { icon: '🐚', title: t('hero.wellness.therapies'), desc: t('hero.wellness.therapies.desc'), color: 'from-gold-400 to-blue-500' }
              ].map((item, index) => (
                <div key={index} className="text-center group backdrop-blur-sm bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200 hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gold-300 mb-2 group-hover:text-gold-200 transition-colors duration-200">{item.title}</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-200">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Ola decorativa estática */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="w-full h-16 fill-current text-blue-50/20"
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>

        {/* Indicador de scroll simplificado */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors duration-200">
            <span className="text-xs mb-2 font-medium">Descubre más</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}