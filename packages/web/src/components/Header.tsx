import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LanguageSwitch from './LanguageSwitch';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
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

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header 
      className="header-fixed"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        width: '100%',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: isScrolled ? '1px solid rgba(251, 191, 36, 0.2)' : '1px solid rgba(251, 191, 36, 0.1)',
        transition: 'all 0.3s ease'
      }}
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
                  src="/images/logo.jpeg" 
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
              {t('nav.pasadia')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/nosotros" className={`font-medium relative group transition-all duration-300 ${
              isScrolled ? 'text-dark-700 hover:text-blue-600' : 'text-white hover:text-gold-300'
            }`}>
              {t('nav.about')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Language Switch & Auth buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <LanguageSwitch isScrolled={isScrolled} />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-medium ${
                  isScrolled ? 'text-dark-700' : 'text-white'
                }`}>
                  Hola, {user?.firstName}
                </span>
                {user?.email === 'admin@karoba.com' && (
                  <Link 
                    href="/admin/dashboard" 
                    className={`font-medium transition-all duration-300 ${
                      isScrolled ? 'text-blue-600 hover:text-blue-700' : 'text-gold-300 hover:text-gold-200'
                    }`}
                  >
                    👑 Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className={`font-medium transition-all duration-300 ${
                    isScrolled ? 'text-dark-700 hover:text-blue-600' : 'text-white hover:text-gold-300'
                  }`}
                >
                  {t('auth.logout')}
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className={`font-medium transition-all duration-300 ${
                  isScrolled ? 'text-dark-700 hover:text-blue-600' : 'text-white hover:text-gold-300'
                }`}>
                  {t('nav.login')}
                </Link>
                <Link href="/register" className={`btn-gold transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isScrolled ? 'px-6 py-2.5 text-sm' : 'px-8 py-3'
                }`}>
                  <span className="flex items-center space-x-2">
                    <span>{t('nav.register')}</span>
                    <span className="text-lg">✨</span>
                  </span>
                </Link>
              </>
            )}
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
                {t('nav.pasadia')}
              </Link>
              <Link 
                href="/nosotros" 
                className={`block px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                  isScrolled 
                    ? 'text-dark-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:text-gold-300 hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              
              {/* Language Switch Mobile */}
              <div className="px-4 py-3">
                <LanguageSwitch isScrolled={isScrolled} />
              </div>
              
              <div className="border-t border-gold-200/30 my-2"></div>
              
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3">
                    <span className={`text-sm font-medium ${
                      isScrolled ? 'text-dark-700' : 'text-white'
                    }`}>
                      Hola, {user?.firstName}
                    </span>
                  </div>
                  {user?.email === 'admin@karoba.com' && (
                    <Link 
                      href="/admin/dashboard"
                      className={`block px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                        isScrolled 
                          ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50' 
                          : 'text-gold-300 hover:text-gold-200 hover:bg-white/10'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      👑 Panel de Administración
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                      isScrolled 
                        ? 'text-dark-700 hover:text-blue-600 hover:bg-blue-50' 
                        : 'text-white hover:text-gold-300 hover:bg-white/10'
                    }`}
                  >
                    {t('auth.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className={`block px-4 py-3 font-medium transition-all duration-300 rounded-lg ${
                      isScrolled 
                        ? 'text-dark-700 hover:text-blue-600 hover:bg-blue-50' 
                        : 'text-white hover:text-gold-300 hover:bg-white/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link 
                    href="/register" 
                    className="block px-4 py-3 btn-gold text-center transition-all duration-300 mx-2 mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>{t('nav.register')}</span>
                      <span className="text-lg">✨</span>
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}