import Head from 'next/head';
import Layout from '../components/Layout';
import { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  HeartIcon, 
  GlobeAltIcon, 
  UserGroupIcon,
  SparklesIcon,
  MapPinIcon,
  SunIcon
} from '@heroicons/react/24/outline';

export default function Nosotros() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observar todas las secciones
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Parallax effect para el hero
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      <Head>
        <title>Nosotros - Karoba Wellness Travel Colombia</title>
        <meta name="description" content="Conoce la historia de Karoba, operador turístico especializado en experiencias de wellness y bienestar en Cartagena y las Islas del Rosario." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/karoba-logo.jpeg" />
      </Head>
      
      <Layout>
        {/* Hero Section con Parallax */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            ref={heroRef}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/hero-bg.jpeg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/70 via-blue-900/60 to-gold-900/70"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in-up">
              <div className="mb-8">
                <span className="inline-block px-6 py-3 bg-gold-500/20 text-gold-200 rounded-full text-lg font-semibold tracking-wide border border-gold-400/30 backdrop-blur-sm">
                  ✨ Nuestra Historia
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
                {t('about.hero.title')}
                <span className="block text-gradient-hero karoba-logo-elegant">Karoba</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200 leading-relaxed">
                {t('about.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="flex items-center space-x-3 text-gold-300">
                  <MapPinIcon className="h-6 w-6" />
                  <span className="text-lg">Cartagena, Colombia</span>
                </div>
                <div className="flex items-center space-x-3 text-blue-300">
                  <HeartIcon className="h-6 w-6" />
                  <span className="text-lg">Wellness & Bienestar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Nuestra Misión */}
        <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-gold-50/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div ref={addToRefs} className="text-center mb-16 opacity-0 transform translate-y-12">
              <h2 className="text-4xl md:text-5xl font-bold text-dark-900 mb-6">
                {t('about.mission.title')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-gold-500 to-blue-500 mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div ref={addToRefs} className="opacity-0 transform translate-y-12">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gold-200/50">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mr-4">
                      <SparklesIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-900">{t('about.authentic.title')}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t('about.authentic.description')}
                  </p>
                </div>
              </div>

              <div ref={addToRefs} className="opacity-0 transform translate-y-12">
                <div className="relative">
                  <img 
                    src="/images/wellness-1.jpeg" 
                    alt="Experiencias Karoba"
                    className="rounded-3xl shadow-2xl w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/30 to-transparent rounded-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wellness & Bienestar */}
        <section className="py-20 bg-gradient-to-br from-blue-50/50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div ref={addToRefs} className="opacity-0 transform translate-y-12 order-2 lg:order-1">
                <div className="relative">
                  <img 
                    src="/images/wellness-2.jpeg" 
                    alt="Wellness Karoba"
                    className="rounded-3xl shadow-2xl w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-3xl"></div>
                </div>
              </div>

              <div ref={addToRefs} className="opacity-0 transform translate-y-12 order-1 lg:order-2">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-200/50">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <SunIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-900">{t('about.wellness.title')}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t('about.wellness.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestro Compromiso */}
        <section className="py-20 bg-gradient-to-br from-gold-50/30 via-white to-blue-50/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div ref={addToRefs} className="text-center mb-16 opacity-0 transform translate-y-12">
              <h2 className="text-4xl md:text-5xl font-bold text-dark-900 mb-6">
                {t('about.commitment.title')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-gold-500 mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              <div ref={addToRefs} className="opacity-0 transform translate-y-12">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gold-200/50 h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mr-4">
                      <UserGroupIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-900">{t('about.forall.title')}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t('about.forall.description')}
                  </p>
                </div>
              </div>

              <div ref={addToRefs} className="opacity-0 transform translate-y-12">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-200/50 h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <GlobeAltIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-900">{t('about.experience.title')}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t('about.experience.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-dark-900 via-blue-900 to-dark-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <div ref={addToRefs} className="opacity-0 transform translate-y-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                {t('about.cta.title')}
                <span className="block text-gradient-hero karoba-logo-elegant mt-2">Karoba</span>
              </h2>
              
              <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed">
                {t('about.cta.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="/pasadia"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="text-xl">🏝️</span>
                  <span>{t('about.cta.pasadia')}</span>
                </a>
                
                <a 
                  href="https://wa.me/573236882227?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20las%20experiencias%20de%20Karoba%20Wellness%20Travel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 backdrop-blur-sm border border-white/20"
                >
                  <span className="text-xl">📱</span>
                  <span>{t('about.cta.contact')}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}