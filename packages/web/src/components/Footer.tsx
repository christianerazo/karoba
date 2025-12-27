import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 relative rounded-lg flex items-center justify-center shadow-lg">
                  {/* Logo image */}
                  <img 
                    src="/images/karoba-logo.jpeg?v=2" 
                    alt="Karoba Wellness Travel Colombia Logo"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="karoba-logo-elegant text-2xl">
                    Karoba
                  </span>
                  <span className="karoba-subtitle text-xs">
                    WELLNESS TRAVEL COLOMBIA
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Transformamos vidas a través de experiencias auténticas de bienestar en los destinos más exclusivos de Colombia. 
              Tu viaje hacia el equilibrio perfecto comienza aquí.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-300">
                <span className="sr-only">YouTube</span>
                📺
              </a>
            </div>
          </div>

          {/* Experiencias Wellness */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gold-300">Experiencias Wellness</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/retiros-espirituales" className="text-gray-300 hover:text-wellness-400 transition-colors duration-300">
                  Retiros Espirituales
                </Link>
              </li>
              <li>
                <Link href="/spas-termales" className="text-gray-300 hover:text-wellness-400 transition-colors duration-300">
                  Spas & Aguas Termales
                </Link>
              </li>
              <li>
                <Link href="/eco-lodges" className="text-gray-300 hover:text-wellness-400 transition-colors duration-300">
                  Eco Lodges
                </Link>
              </li>
              <li>
                <Link href="/medicina-ancestral" className="text-gray-300 hover:text-wellness-400 transition-colors duration-300">
                  Medicina Ancestral
                </Link>
              </li>
              <li>
                <Link href="/yoga-meditacion" className="text-gray-300 hover:text-wellness-400 transition-colors duration-300">
                  Yoga & Meditación
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary-300">Soporte Exclusivo</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/concierge" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Concierge Personal
                </Link>
              </li>
              <li>
                <Link href="/mis-experiencias" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Mis Experiencias
                </Link>
              </li>
              <li>
                <Link href="/programa-lealtad" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Programa de Lealtad
                </Link>
              </li>
              <li>
                <Link href="/centro-ayuda" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Contacto VIP
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Certificaciones y Legal */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-sm text-gray-400">Certificado por:</span>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-wellness-900/50 text-wellness-300 rounded-full text-xs font-medium">
                  🌿 Turismo Sostenible
                </span>
                <span className="px-3 py-1 bg-gold-900/50 text-gold-300 rounded-full text-xs font-medium">
                  ✨ Wellness Certified
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacidad" className="hover:text-gold-400 transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-gold-400 transition-colors">
                Términos
              </Link>
              <span>© 2024 Karoba Wellness Travel Colombia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}