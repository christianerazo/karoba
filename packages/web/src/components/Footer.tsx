import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import InfoModal from './InfoModal';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  HeartIcon,
  SparklesIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const { t } = useLanguage();
  const [modalInfo, setModalInfo] = useState<{
    isOpen: boolean;
    title: string;
    content: string | React.ReactNode;
    icon?: React.ReactNode;
  }>({
    isOpen: false,
    title: '',
    content: '',
    icon: null
  });

  const openModal = (title: string, content: string | React.ReactNode, icon?: React.ReactNode) => {
    setModalInfo({
      isOpen: true,
      title,
      content,
      icon
    });
  };

  const closeModal = () => {
    setModalInfo({
      isOpen: false,
      title: '',
      content: '',
      icon: null
    });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(15, 23, 42, 0.98) 0%, 
              rgba(30, 58, 138, 0.95) 25%, 
              rgba(15, 23, 42, 0.98) 50%,
              rgba(30, 58, 138, 0.95) 75%,
              rgba(15, 23, 42, 0.98) 100%
            )
          `
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gold-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gold-300 rounded-full blur-2xl"></div>
      </div>

      {/* Animated wave pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-60">
        <div className="h-full bg-gradient-to-r from-gold-400 via-blue-500 to-gold-400 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Logo y descripción mejorada */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400/30 to-blue-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Logo container */}
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                    <img 
                      src="/images/logo.jpeg" 
                      alt="Karoba Wellness Travel Colombia Logo"
                      className="w-12 h-12 rounded-xl object-cover shadow-xl"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="karoba-logo-elegant text-3xl bg-gradient-to-r from-white to-gold-200 bg-clip-text text-transparent font-bold tracking-wide">
                    Karoba
                  </span>
                  <span className="karoba-subtitle text-sm text-gold-200/90 font-medium tracking-[0.2em] uppercase">
                    WELLNESS TRAVEL COLOMBIA
                  </span>
                </div>
              </div>
            </Link>
            
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                {t('footer.tagline')}
              </p>
              
              {/* Stats section */}
              <div className="grid grid-cols-3 gap-6 max-w-md">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold-400">500+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">Huéspedes Felices</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">5★</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">Calificación</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold-400">3+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">Años Experiencia</div>
                </div>
              </div>
            </div>
            
            {/* Redes Sociales Premium */}
            <div className="space-y-4">
              <h4 className="text-gold-300 font-semibold text-lg flex items-center space-x-2">
                <HeartIcon className="w-5 h-5" />
                <span>{t('footer.social')}</span>
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="https://www.instagram.com/karoba.wellness?igsh=N3ZvMDkwOHhnc2Nw" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 p-4 rounded-2xl transition-all duration-300 border border-pink-400/30 hover:border-pink-400/50 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">Instagram</span>
                      <span className="text-gray-300 text-sm">@karoba.wellness</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </a>
                
                <a 
                  href="https://www.tiktok.com/@karoba.wellness.t?_r=1&_t=ZS-92a59v389YN" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 p-4 rounded-2xl transition-all duration-300 border border-red-400/30 hover:border-red-400/50 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">TikTok</span>
                      <span className="text-gray-300 text-sm">@karoba.wellness.t</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </a>
                
                <a 
                  href="https://wa.me/573236882227?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20las%20experiencias%20de%20Karoba%20Wellness%20Travel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 p-4 rounded-2xl transition-all duration-300 border border-green-400/30 hover:border-green-400/50 backdrop-blur-sm sm:col-span-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">WhatsApp Business</span>
                      <span className="text-gray-300 text-sm">+57 323 688 2227</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links mejorado */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gold-300 flex items-center space-x-2">
              <GlobeAltIcon className="w-6 h-6" />
              <span>{t('footer.quick.links')}</span>
            </h3>
            
            <div className="space-y-3">
              <Link href="/pasadia" className="group flex items-center space-x-3 text-gray-300 hover:text-gold-300 transition-all duration-300 p-2 rounded-lg hover:bg-white/5">
                <SparklesIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{t('nav.pasadia')}</span>
              </Link>
              
              <button 
                onClick={() => openModal(
                  t('footer.more.experiences.title'),
                  <div className="space-y-4">
                    <p className="text-gray-600">{t('footer.more.experiences.content')}</p>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm">🧘</span>
                        </div>
                        <span className="font-medium text-gray-700">Retiros de yoga y meditación</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm">🌿</span>
                        </div>
                        <span className="font-medium text-gray-700">Terapias ancestrales colombianas</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gold-50 rounded-lg">
                        <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm">🍽️</span>
                        </div>
                        <span className="font-medium text-gray-700">Experiencias gastronómicas saludables</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm">🏝️</span>
                        </div>
                        <span className="font-medium text-gray-700">Tours de bienestar por la costa caribeña</span>
                      </div>
                    </div>
                    <p className="text-center text-gold-600 font-medium">¡Contáctanos para ser el primero en conocer nuestras nuevas ofertas!</p>
                  </div>,
                  '🌟'
                )}
                className="group flex items-center space-x-3 text-gray-300 hover:text-gold-300 transition-all duration-300 p-2 rounded-lg hover:bg-white/5 text-left w-full"
              >
                <StarIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{t('footer.more.experiences')}</span>
              </button>
              
              <Link href="/nosotros" className="group flex items-center space-x-3 text-gray-300 hover:text-gold-300 transition-all duration-300 p-2 rounded-lg hover:bg-white/5">
                <HeartIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{t('nav.about')}</span>
              </Link>
              
              <Link href="/register" className="group flex items-center space-x-3 text-gray-300 hover:text-gold-300 transition-all duration-300 p-2 rounded-lg hover:bg-white/5">
                <SparklesIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{t('nav.register')}</span>
              </Link>
            </div>
          </div>

          {/* Contact Info mejorado */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-300 flex items-center space-x-2">
              <PhoneIcon className="w-6 h-6" />
              <span>{t('footer.contact.info')}</span>
            </h3>
            
            <div className="space-y-4">
              <div className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <PhoneIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm font-medium">{t('footer.contact.phone')}</span>
                  <span className="text-white font-semibold">+57 323 688 2227</span>
                </div>
              </div>
              
              <div className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <EnvelopeIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm font-medium">{t('footer.contact.email')}</span>
                  <span className="text-white font-semibold">karoba.wellness@gmail.com</span>
                </div>
              </div>
              
              <div className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPinIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm font-medium">{t('footer.contact.address')}</span>
                  <span className="text-white font-semibold">{t('footer.contact.address.text')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificaciones y Legal mejorado */}
        <div className="border-t border-white/10 mt-16 pt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
            
            {/* Certificaciones */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <span className="text-sm text-gray-400 font-medium flex items-center space-x-2">
                <ShieldCheckIcon className="w-4 h-4" />
                <span>Certificado por:</span>
              </span>
              
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openModal(
                    'Certificación de Turismo Sostenible',
                    <div className="space-y-4">
                      <p className="text-gray-600"><strong>Karoba Wellness Travel</strong> está comprometido con el turismo sostenible y responsable.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Prácticas sostenibles:</span>
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2">
                              <span className="text-green-500">✓</span>
                              <span>Trabajamos con comunidades locales</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <span className="text-green-500">✓</span>
                              <span>Promovemos la conservación marina</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <span className="text-green-500">✓</span>
                              <span>Utilizamos proveedores locales y orgánicos</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <span className="text-green-500">✓</span>
                              <span>Educamos sobre el cuidado del medio ambiente</span>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Impacto positivo:</span>
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2">
                              <span className="text-blue-500">✓</span>
                              <span>Generamos empleo local en las islas</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <span className="text-blue-500">✓</span>
                              <span>Apoyamos la pesca artesanal sostenible</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <span className="text-blue-500">✓</span>
                              <span>Contribuimos a la conservación de arrecifes</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">Cada experiencia con nosotros contribuye al desarrollo sostenible del Caribe colombiano.</p>
                      </div>
                    </div>,
                    '🌿'
                  )}
                  className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 border border-green-400/30 hover:border-green-400/50 backdrop-blur-sm"
                >
                  🌿 Turismo Sostenible
                </button>
                
                <button
                  onClick={() => openModal(
                    'Certificación Wellness',
                    <div className="space-y-4">
                      <p className="text-gray-600"><strong>Karoba Wellness Travel</strong> está certificado en experiencias de bienestar y wellness.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
                            <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
                            <span>Estándares wellness:</span>
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2">
                              <span className="text-gold-500">✓</span>
                              <span>Guías certificados en técnicas de relajación</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <span className="text-gold-500">✓</span>
                              <span>Espacios diseñados para el bienestar mental</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <span className="text-gold-500">✓</span>
                              <span>Alimentación consciente y saludable</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <span className="text-gold-500">✓</span>
                              <span>Actividades que conectan cuerpo, mente y espíritu</span>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Beneficios comprobados:</span>
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2">
                              <span className="text-blue-500">✓</span>
                              <span>Reducción del estrés y la ansiedad</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <span className="text-blue-500">✓</span>
                              <span>Mejora de la calidad del sueño</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <span className="text-blue-500">✓</span>
                              <span>Aumento de la energía vital</span>
                            </li>
                            <li className="flex items-center space-x-2">
                              <span className="text-blue-500">✓</span>
                              <span>Conexión profunda con la naturaleza</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-gold-50 p-4 rounded-lg">
                        <p className="text-sm text-gold-700 font-medium">Nuestras experiencias están diseñadas por expertos en wellness y bienestar holístico.</p>
                      </div>
                    </div>,
                    '✨'
                  )}
                  className="px-4 py-2 bg-gradient-to-r from-gold-500/20 to-yellow-500/20 hover:from-gold-500/30 hover:to-yellow-500/30 text-gold-300 rounded-full text-sm font-medium transition-all duration-300 border border-gold-400/30 hover:border-gold-400/50 backdrop-blur-sm"
                >
                  ✨ Wellness Certified
                </button>
              </div>
            </div>
            
            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end space-x-6 text-sm text-gray-400">
              <button 
                onClick={() => openModal(
                  t('footer.privacy.policy.title'),
                  <div className="space-y-4">
                    <p className="text-gray-600"><strong>{t('footer.privacy.policy.content')}</strong></p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700">Información que recopilamos:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Datos de contacto (nombre, email, teléfono)</li>
                          <li>• {t('footer.privacy.wellness.preferences')}</li>
                          <li>• Información de reservas y pagos</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700">Uso de la información:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Procesar reservas y pagos</li>
                          <li>• Enviar confirmaciones y actualizaciones</li>
                          <li>• Mejorar nuestros servicios</li>
                          <li>• Comunicar ofertas especiales (con tu consentimiento)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700">No compartimos tu información con terceros sin tu consentimiento. Para más detalles, contáctanos.</p>
                    </div>
                  </div>,
                  '🔒'
                )}
                className="hover:text-gold-400 transition-colors duration-300 font-medium"
              >
                Privacidad
              </button>
              
              <button 
                onClick={() => openModal(
                  t('footer.terms.conditions.title'),
                  <div className="space-y-4">
                    <p className="text-gray-600"><strong>{t('footer.terms.conditions.content')}</strong></p>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-700 mb-2">Reservas y Pagos:</h4>
                        <ul className="space-y-1 text-sm text-blue-600">
                          <li>• Las reservas se confirman con el pago del 50% del valor total</li>
                          <li>• El saldo restante se paga el día de la experiencia</li>
                          <li>• Aceptamos efectivo, transferencias y tarjetas</li>
                        </ul>
                      </div>
                      <div className="bg-gold-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gold-700 mb-2">Cancelaciones:</h4>
                        <ul className="space-y-1 text-sm text-gold-600">
                          <li>• Cancelación gratuita hasta 48 horas antes</li>
                          <li>• Cancelaciones tardías: 50% del valor pagado</li>
                          <li>• No show: no hay reembolso</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-700 mb-2">Responsabilidades:</h4>
                        <ul className="space-y-1 text-sm text-green-600">
                          <li>• Los participantes deben seguir las instrucciones de seguridad</li>
                          <li>• Karoba no se hace responsable por objetos perdidos</li>
                          <li>• Se requiere seguro de viaje para actividades acuáticas</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Para términos completos y condiciones específicas, contáctanos directamente.</p>
                  </div>,
                  '📋'
                )}
                className="hover:text-gold-400 transition-colors duration-300 font-medium"
              >
                Términos
              </button>
              
              <span className="font-medium">© 2024 Karoba Wellness Travel Colombia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de información */}
      <InfoModal
        isOpen={modalInfo.isOpen}
        onClose={closeModal}
        title={modalInfo.title}
        content={modalInfo.content}
        icon={modalInfo.icon}
      />
    </footer>
  );
}