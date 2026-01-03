import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: 'María Elena Rodríguez',
      location: 'Bogotá, Colombia',
      rating: 5,
      comment: t('testimonials.maria.comment'),
      experience: 'Pasadía Coral Sand'
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      location: 'Medellín, Colombia',
      rating: 5,
      comment: t('testimonials.carlos.comment'),
      experience: 'Pasadía Islas del Rosario'
    },
    {
      id: 3,
      name: 'Ana Sofía Herrera',
      location: 'Cali, Colombia',
      rating: 5,
      comment: t('testimonials.ana.comment'),
      experience: 'Experiencia Coral Sand'
    }
  ];

  const stats = [
    { number: '200+', label: t('stats.guests'), color: 'text-blue-600' },
    { number: '4.9', label: t('stats.rating'), color: 'text-gold-600' },
    { number: '1', label: t('stats.destination'), color: 'text-blue-600' },
    { number: '98%', label: t('stats.recommend'), color: 'text-gold-600' }
  ];
  return (
    <section className="py-20 bg-gradient-to-br from-dark-50 via-blue-50/50 to-gold-50/30 luxury-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header simplificado */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-6 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold tracking-wide mb-6">
            {t('testimonials.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-dark-800 mb-6">
            {t('testimonials.title')}
            <span className="block text-gradient-luxury">{t('testimonials.subtitle')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.description')}
          </p>
        </div>

        {/* Testimonials Grid simplificado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card-luxury hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-gold-500" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.comment}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-gold-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-dark-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <p className="text-xs text-blue-600 font-medium">{testimonial.experience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section simplificado */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                {stat.number}
              </div>
              <p className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA simplificado */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="bg-gradient-to-r from-blue-600 to-gold-500 rounded-2xl p-8 text-white hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('testimonials.cta.title')}
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
              {t('testimonials.cta.description')}
            </p>
            <Link href="/pasadia" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105">
              {t('testimonials.cta.button')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}