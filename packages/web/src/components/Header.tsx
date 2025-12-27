import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gold-200/50' 
          : 'bg-gradient-to-r from-dark-900/90 via-dark-800/90 to-dark-900/90 backdrop-blur-md border-b border-gold-400/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="flex items-center space-x-3">
              <div className={`relative rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                isScrolled ? 'w-10 h-10' : 'w-12 h-12'
              }`}>
                {/* Logo image */}
                <img 
                  src="/images/karoba-logo.jpeg?v=2" 
                  alt="Karoba Wellness Travel Colombia Logo"
                  className={`transition-all duration-500 rounded-xl object-cover shadow-lg ${
                    isScrolled ? 'w-10 h-10' : 'w-12 h-12'
                  }`}
                />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse rounded-xl"></div>
              </div>
              <div className="flex flex-col">
                <span className={`karoba-logo-elegant transition-all duration-500 ${
                  isScrolled ? 'text-2xl' : 'text-3xl'
                }`}>
                  Karoba
                </span>
                <span className={`karoba-subtitle transition-all duration-500 ${
                  isScrolled ? 'text-[10px]' : 'text-xs'
                }`}>
                  WELLNESS TRAVEL COLOMBIA
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-10">
            <Link href="/pasadia" className={`font-medium relative group transition-all duration-300 ${
              isScrolled ? 'text-dark-700 hover:text-blue-600' : 'text-white hover:text-gold-300'
            }`}>
              Pasadía
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/tours" className={`font-medium relative group transition-all duration-300 ${
              isScrolled ? 'text-dark-700 hover:text-blue-600' : 'text-white hover:text-gold-300'
            }`}>
              Tours
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/bookings" className={`font-medium relative group transition-all duration-300 ${
              isScrolled ? 'text-dark-700 hover:text-blue-600' : 'text-white hover:text-gold-300'
            }`}>
              Mis Experiencias
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className={`font-medium relative group transition-all duration-300 ${
              isScrolled ? 'text-dark-700 hover:text-blue-600' : 'text-white hover:text-gold-300'
            }`}>
              Nosotros
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Auth buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/login" className={`font-medium transition-all duration-300 ${
              isScrolled ? 'text-dark-700 hover:text-blue-600' : 'text-white hover:text-gold-300'
            }`}>
              Iniciar Sesión
            </Link>
            <Link href="/register" className={`btn-gold transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
              isScrolled ? 'px-6 py-2.5 text-sm' : 'px-8 py-3'
            }`}>
              <span className="flex items-center space-x-2">
                <span>Únete a Karoba</span>
                <span className="text-lg">✨</span>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden transition-colors duration-300 p-2 rounded-lg ${
              isScrolled 
                ? 'text-dark-700 hover:text-blue-600 hover:bg-blue-50' 
                : 'text-white hover:text-gold-300 hover:bg-white/10'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden rounded-xl mt-2 mb-4 border shadow-2xl transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/95 backdrop-blur-xl border-gold-200/50' 
              : 'bg-dark-800/95 backdrop-blur-xl border-gold-400/20'
          }`}>
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link 
                href="/pasadia" 
                className={`block px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                  isScrolled 
                    ? 'text-dark-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:text-gold-300 hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pasadía
              </Link>
              <Link 
                href="/tours" 
                className={`block px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                  isScrolled 
                    ? 'text-dark-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:text-gold-300 hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tours
              </Link>
              <Link 
                href="/bookings" 
                className={`block px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                  isScrolled 
                    ? 'text-dark-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:text-gold-300 hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Mis Experiencias
              </Link>
              <Link 
                href="/about" 
                className={`block px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                  isScrolled 
                    ? 'text-dark-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:text-gold-300 hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <div className="border-t border-gold-200/30 my-2"></div>
              <Link 
                href="/login" 
                className={`block px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                  isScrolled 
                    ? 'text-dark-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:text-gold-300 hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="/register" 
                className="block px-4 py-3 btn-gold text-center transition-all duration-300 mx-2 mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Únete a Karoba</span>
                  <span className="text-lg">✨</span>
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}