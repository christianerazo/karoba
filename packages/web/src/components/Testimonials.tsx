import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    id: 1,
    name: 'María Elena Rodríguez',
    location: 'Bogotá, Colombia',
    rating: 5,
    comment: 'Mi experiencia en las Islas del Rosario fue transformadora. El retiro de wellness me ayudó a reconectar conmigo misma de una manera que nunca pensé posible.',
    image: '/images/wellness-1.jpeg',
    experience: 'Retiro Wellness 7 días'
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    location: 'Medellín, Colombia',
    rating: 5,
    comment: 'Las terapias marinas en Providencia superaron todas mis expectativas. El equipo de Karoba realmente entiende lo que significa el bienestar auténtico.',
    image: '/images/wellness-2.jpeg',
    experience: 'Terapias Marinas Premium'
  },
  {
    id: 3,
    name: 'Ana Sofía Herrera',
    location: 'Cali, Colombia',
    rating: 5,
    comment: 'Cada detalle fue perfecto. Desde el yoga al amanecer hasta los tratamientos con medicina ancestral. Una experiencia que cambió mi perspectiva de vida.',
    image: '/images/destination-1.jpeg',
    experience: 'Medicina Ancestral & Yoga'
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-dark-50 via-blue-50/50 to-gold-50/30 luxury-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold tracking-wide mb-6">
            💫 TESTIMONIOS REALES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-dark-800 mb-6">
            Historias de
            <span className="block text-gradient-luxury">Transformación</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo nuestros huéspedes han encontrado su camino hacia el bienestar 
            auténtico en los paraísos del Caribe colombiano
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card-luxury hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={`Experiencia de ${testimonial.name}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {testimonial.experience}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-gold-400" />
                ))}
              </div>

              {/* Comment */}
              <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.comment}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-gold-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-dark-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Huéspedes Transformados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold-600 mb-2">4.9</div>
            <div className="text-gray-600">Calificación Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Destinos Exclusivos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold-600 mb-2">98%</div>
            <div className="text-gray-600">Recomendarían Karoba</div>
          </div>
        </div>
      </div>
    </section>
  );
}