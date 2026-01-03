import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutExperience() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/30 via-white to-gold-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide mb-6">
            🏝️ {t('experience.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-dark-800 mb-6">
            {t('experience.title')}
            <span className="block text-gradient-luxury">{t('experience.subtitle')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('experience.description')}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left Content */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-8">
              
              {/* Feature 1 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-gold-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🌊</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-dark-800 mb-2">{t('experience.feature1.title')}</h3>
                  <p className="text-gray-600 leading-relaxed">{t('experience.feature1.description')}</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gold-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🍽️</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-dark-800 mb-2">{t('experience.feature2.title')}</h3>
                  <p className="text-gray-600 leading-relaxed">{t('experience.feature2.description')}</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-gold-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🧘‍♀️</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-dark-800 mb-2">{t('experience.feature3.title')}</h3>
                  <p className="text-gray-600 leading-relaxed">{t('experience.feature3.description')}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Content - Image Collage */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="/images/hero-bg.jpeg"
                  alt="Islas del Rosario - Vista panorámica"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-lg font-semibold drop-shadow-lg">{t('experience.image.caption')}</p>
                  <p className="text-sm opacity-90 drop-shadow-lg">{t('experience.image.subtitle')}</p>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gold-200/50">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-600 mb-1">45</div>
                  <div className="text-sm text-gray-600">{t('experience.stat.minutes')}</div>
                </div>
              </div>

              <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-blue-200/50">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">8</div>
                  <div className="text-sm text-gray-600">{t('experience.stat.hours')}</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-dark-800 mb-4">{t('experience.values.title')}</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('experience.values.description')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Value 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🌿</span>
              </div>
              <h4 className="text-xl font-semibold text-dark-800 mb-2">{t('experience.value1.title')}</h4>
              <p className="text-gray-600">{t('experience.value1.description')}</p>
            </div>

            {/* Value 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">❤️</span>
              </div>
              <h4 className="text-xl font-semibold text-dark-800 mb-2">{t('experience.value2.title')}</h4>
              <p className="text-gray-600">{t('experience.value2.description')}</p>
            </div>

            {/* Value 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h4 className="text-xl font-semibold text-dark-800 mb-2">{t('experience.value3.title')}</h4>
              <p className="text-gray-600">{t('experience.value3.description')}</p>
            </div>

          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-dark-900 via-blue-900 to-dark-800 rounded-3xl p-12 text-white relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-gold-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{t('experience.cta.title')}</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{t('experience.cta.description')}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/pasadia" 
                  className="btn-gold text-lg px-8 py-4 transition-transform duration-200 hover:scale-105"
                >
                  🏝️ {t('experience.cta.button')}
                </Link>
                <a 
                  href="https://wa.me/573236882227?text=Hola! Me interesa conocer más sobre las experiencias de wellness de Karoba en el Caribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-lg px-8 py-4 transition-transform duration-200 hover:scale-105 bg-white/10 hover:bg-white/20 text-white border-white/30"
                >
                  💬 {t('experience.cta.contact')}
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}