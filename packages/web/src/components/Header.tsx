import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
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
        background: isScrolled 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)' 
          : 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: isScrolled 
          ? '1px solid rgba(251, 191, 36, 0.3)' 
          : '1px solid rgba(251, 191, 36, 0.2)',
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 16px rgba(251, 191, 36, 0.1)' 
          : '0 4px 24px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Decorative gradient line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-60"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #f59e0b 20%, #d97706 50%, #f59e0b 80%, transparent 100%)'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo Enhanced */}
          <Link href="/" className="flex items-center group relative">
            <div className="flex items-center space-x-4">
              <div className={`relative rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                isScrolled ? 'w-11 h-11' : 'w-14 h-14'
              }`}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400/30 to-blue-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Logo container */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-1 border border-white/20">
                  <img 
                    src="/images/logo.jpeg" 
                    alt="Karoba Wellness Travel Colombia Logo"
                    className={`transition-all duration-500 rounded-xl object-cover shadow-xl ${
                      isScrolled ? 'w-9 h-9' : 'w-12 h-12'
                    }`}
                  />
                </div>
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-2xl"></div>
              </div>
              
              <div className="flex flex-col">
                <span className={`karoba-logo-elegant transition-all duration-500 bg-gradient-to-r ${
                  isScrolled 
                    ? 'from-blue-600 to-gold-600 text-2xl' 
                    : 'from-white to-gold-200 text-3xl'
                } bg-clip-text text-transparent font-bold tracking-wide`}>
                  Karoba
                </span>
                <span className={`karoba-subtitle transition-all duration-500 ${
                  isScrolled 
                    ? 'text-[10px] text-gray-600' 
                    : 'text-xs text-gold-200/90'
                } font-medium tracking-[0.2em] uppercase`}>
                  WELLNESS TRAVEL COLOMBIA
                </span>
              </div>
            </div>
            
            {/* Floating particles effect */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <SparklesIcon className="w-4 h-4 text-gold-400 animate-pulse" />
            </div>
          </Link>

          {/* Navigation - Desktop Enhanced */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/pasadia" className={`relative font-semibold transition-all duration-300 group ${
              isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-gold-300'
            }`}>
              <span className="relative z-10">{t('nav.pasadia')}</span>
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-blue-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-gold-400/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></span>
            </Link>
            <Link href="/nosotros" className={`relative font-semibold transition-all duration-300 group ${
              isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-gold-300'
            }`}>
              <span className="relative z-10">{t('nav.about')}</span>
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-blue-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-gold-400/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></span>
            </Link>
          </nav>

          {/* Language Switch & Auth buttons - Desktop Enhanced */}
          <div className="hidden md:flex items-center space-x-6">
            <LanguageSwitch isScrolled={isScrolled} />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'bg-white/10 text-white border border-white/20'
                } backdrop-blur-sm`}>
                  <span className="text-sm font-medium">
                    Hola, {user?.firstName}
                  </span>
                </div>
                
                {user?.email === 'admin@karoba.com' && (
                  <Link 
                    href="/admin/dashboard" 
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                      isScrolled 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl' 
                        : 'bg-gradient-to-r from-gold-400 to-gold-500 text-dark-900 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <span className="flex items-center space-x-1">
                      <span>👑</span>
                      <span>Admin</span>
                    </span>
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 border ${
                    isScrolled 
                      ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400' 
                      : 'border-white/30 text-white hover:bg-white/10 hover:border-white/50'
                  }`}
                >
                  {t('auth.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className={`px-4 py-2 rounded-full font-medium transition-all duration-300 border ${
                  isScrolled 
                    ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400' 
                    : 'border-white/30 text-white hover:bg-white/10 hover:border-white/50'
                }`}>
                  {t('nav.login')}
                </Link>
                
                <Link href="/register" className={`relative overflow-hidden px-6 py-2.5 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 ${
                  isScrolled ? 'text-sm' : ''
                }`}
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%)',
                  boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                }}>
                  <span className="relative z-10 flex items-center space-x-2 text-white">
                    <span>{t('nav.register')}</span>
                    <SparklesIcon className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-300/20 to-gold-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button Enhanced */}
          <button
            className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-gray-200' 
                : 'text-white hover:text-gold-300 hover:bg-white/10 border border-white/20'
            } backdrop-blur-sm`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu Enhanced */}
        {isMenuOpen && (
          <div className={`md:hidden rounded-2xl mt-3 mb-4 border shadow-2xl transition-all duration-300 backdrop-blur-xl ${
            isScrolled 
              ? 'bg-white/98 border-gold-200/50' 
              : 'bg-dark-800/98 border-gold-400/30'
          }`}
          style={{
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
          }}>
            <div className="px-6 pt-4 pb-6 space-y-2">
              <Link 
                href="/pasadia" 
                className={`block px-4 py-3 font-semibold transition-all duration-300 rounded-xl ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:text-gold-300 hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.pasadia')}
              </Link>
              <Link 
                href="/nosotros" 
                className={`block px-4 py-3 font-semibold transition-all duration-300 rounded-xl ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
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
              
              <div className={`border-t my-3 ${isScrolled ? 'border-gray-200' : 'border-white/20'}`}></div>
              
              {isAuthenticated ? (
                <>
                  <div className={`px-4 py-3 rounded-xl ${
                    isScrolled ? 'bg-blue-50' : 'bg-white/10'
                  }`}>
                    <span className={`text-sm font-medium ${
                      isScrolled ? 'text-blue-700' : 'text-white'
                    }`}>
                      Hola, {user?.firstName}
                    </span>
                  </div>
                  {user?.email === 'admin@karoba.com' && (
                    <Link 
                      href="/admin/dashboard"
                      className={`block px-4 py-3 font-semibold transition-all duration-300 rounded-xl ${
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
                    className={`block w-full text-left px-4 py-3 font-semibold transition-all duration-300 rounded-xl ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
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
                    className={`block px-4 py-3 font-semibold transition-all duration-300 rounded-xl ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                        : 'text-white hover:text-gold-300 hover:bg-white/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link 
                    href="/register" 
                    className="block px-4 py-3 mx-2 mb-2 rounded-xl text-center font-semibold text-white transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%)',
                      boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)'
                    }}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>{t('nav.register')}</span>
                      <SparklesIcon className="w-4 h-4" />
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