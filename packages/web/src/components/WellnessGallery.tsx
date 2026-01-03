import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

export default function WellnessGallery() {
  const { t } = useLanguage();
  
  const wellnessExperiences = [
    {
      id: 1,
      title: t('wellness.experience.relaxation.title'),
      description: t('wellness.experience.relaxation.description'),
      image: '/images/wellness-1.jpeg',
      category: t('wellness.category.spa')
    },
    {
      id: 2,
      title: t('wellness.experience.natural.title'),
      description: t('wellness.experience.natural.description'),
      image: '/images/wellness-2.jpeg',
      category: t('wellness.category.mindfulness')
    },
    {
      id: 3,
      title: t('wellness.experience.beach.title'),
      description: t('wellness.experience.beach.description'),
      image: '/images/destination-1.jpeg',
      category: t('wellness.category.meditation')
    },
    {
      id: 4,
      title: t('wellness.experience.treatments.title'),
      description: t('wellness.experience.treatments.description'),
      image: '/images/destination-2.jpeg',
      category: t('wellness.category.natural')
    },
    {
      id: 5,
      title: t('wellness.experience.hydrotherapy.title'),
      description: t('wellness.experience.hydrotherapy.description'),
      image: '/images/destination-3.jpeg',
      category: t('wellness.category.therapy')
    },
    {
      id: 6,
      title: t('wellness.experience.retreats.title'),
      description: t('wellness.experience.retreats.description'),
      image: '/images/destination-4.jpeg',
      category: t('wellness.category.spiritual')
    }
  ];
  return (
    <section className="py-20 bg-gradient-to-br from-gold-50/30 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header simplificado */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide mb-6">
            {t('wellness.gallery.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-dark-800 mb-6">
            {t('wellness.gallery.title')}
            <span className="block text-gradient-luxury">{t('wellness.gallery.subtitle')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('wellness.gallery.description')}
          </p>
        </div>

        {/* Grid simplificado - SIN staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {wellnessExperiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                index === 0 || index === 3 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="card-luxury hover:shadow-2xl transition-all duration-300 p-0 overflow-hidden">
                <div className={`relative overflow-hidden ${
                  index === 0 || index === 3 ? 'h-80' : 'h-64'
                }`}>
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent"></div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
                    <span className="bg-gradient-to-r from-gold-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-lg">
                      {experience.category}
                    </span>
                  </div>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-gold-300 transition-colors duration-300">
                      {experience.title}
                    </h3>
                    <p className="text-gray-200 text-sm md:text-base group-hover:text-gray-100 transition-colors duration-300">
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

        {/* Call to action simplificado */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="bg-gradient-to-r from-blue-600 to-gold-500 rounded-2xl p-8 text-white hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('wellness.gallery.cta.title')}
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              {t('wellness.gallery.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105">
                {t('wellness.gallery.cta.consultation')}
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105">
                {t('wellness.gallery.cta.packages')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}