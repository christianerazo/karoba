import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import InfoModal from './InfoModal';

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
                    src="/images/logo.jpeg" 
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
              {t('footer.tagline')}
            </p>
            
            {/* Redes Sociales Mejoradas */}
            <div className="mb-6">
              <h4 className="text-gold-300 font-semibold mb-4">{t('footer.social')}</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/karoba.wellness?igsh=N3ZvMDkwOHhnc2Nw" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 px-4 py-2 rounded-lg transition-all duration-300 border border-pink-400/30 hover:border-pink-400/50"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">Instagram</span>
                    <span className="text-gray-300 text-xs">@karoba.wellness</span>
                  </div>
                </a>
                
                <a 
                  href="https://www.tiktok.com/@karoba.wellness.t?_r=1&_t=ZS-92a59v389YN" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 px-4 py-2 rounded-lg transition-all duration-300 border border-red-400/30 hover:border-red-400/50"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">TikTok</span>
                    <span className="text-gray-300 text-xs">@karoba.wellness.t</span>
                  </div>
                </a>
                
                <a 
                  href="https://wa.me/573236882227?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20las%20experiencias%20de%20Karoba%20Wellness%20Travel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 px-4 py-2 rounded-lg transition-all duration-300 border border-green-400/30 hover:border-green-400/50"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">WhatsApp</span>
                    <span className="text-gray-300 text-xs">323 688 2227</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gold-300">{t('footer.quick.links')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/pasadia" className="text-gray-300 hover:text-wellness-400 transition-colors duration-300">
                  {t('nav.pasadia')}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => openModal(
                    t('footer.more.experiences.title'),
                    <div>
                      <p className="mb-3">{t('footer.more.experiences.content')}</p>
                      <ul className="list-disc list-inside space-y-2 mb-4">
                        <li>Retiros de yoga y meditación</li>
                        <li>Terapias ancestrales colombianas</li>
                        <li>Experiencias gastronómicas saludables</li>
                        <li>Tours de bienestar por la costa caribeña</li>
                      </ul>
                      <p>¡Contáctanos para ser el primero en conocer nuestras nuevas ofertas!</p>
                    </div>,
                    '🌟'
                  )}
                  className="text-gray-300 hover:text-wellness-400 transition-colors duration-300 text-left"
                >
                  {t('footer.more.experiences')}
                </button>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-300 hover:text-wellness-400 transition-colors duration-300">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-300 hover:text-wellness-400 transition-colors duration-300">
                  {t('nav.register')}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => openModal(
                    'Newsletter - Mantente Informado',
                    <div>
                      <p className="mb-3">¡Suscríbete a nuestro newsletter y recibe:</p>
                      <ul className="list-disc list-inside space-y-2 mb-4">
                        <li>Ofertas exclusivas para suscriptores</li>
                        <li>Consejos de bienestar y wellness</li>
                        <li>Noticias sobre nuevas experiencias</li>
                        <li>Descuentos especiales en fechas importantes</li>
                      </ul>
                      <p>Contáctanos para suscribirte y no perderte ninguna novedad.</p>
                    </div>,
                    '📧'
                  )}
                  className="text-gray-300 hover:text-wellness-400 transition-colors duration-300 text-left"
                >
                  Newsletter
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary-300">{t('footer.contact.info')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <span className="text-gold-400">📞</span>
                <span className="text-gray-300">{t('footer.contact.phone')}: +57 323 688 2227</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gold-400">✉️</span>
                <span className="text-gray-300">{t('footer.contact.email')}: karoba.wellness@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gold-400">📍</span>
                <span className="text-gray-300">{t('footer.contact.address')}: {t('footer.contact.address.text')}</span>
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
                <button
                  onClick={() => openModal(
                    'Certificación de Turismo Sostenible',
                    <div>
                      <p className="mb-3"><strong>Karoba Wellness Travel</strong> está comprometido con el turismo sostenible y responsable.</p>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">Nuestras prácticas sostenibles:</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Trabajamos con comunidades locales</li>
                            <li>Promovemos la conservación marina</li>
                            <li>Utilizamos proveedores locales y orgánicos</li>
                            <li>Educamos sobre el cuidado del medio ambiente</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">Impacto positivo:</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Generamos empleo local en las islas</li>
                            <li>Apoyamos la pesca artesanal sostenible</li>
                            <li>Contribuimos a la conservación de arrecifes</li>
                          </ul>
                        </div>
                        <p className="text-sm">Cada experiencia con nosotros contribuye al desarrollo sostenible del Caribe colombiano.</p>
                      </div>
                    </div>,
                    '🌿'
                  )}
                  className="px-3 py-1 bg-wellness-900/50 text-wellness-300 rounded-full text-xs font-medium hover:bg-wellness-900/70 transition-colors duration-200"
                >
                  🌿 Turismo Sostenible
                </button>
                <button
                  onClick={() => openModal(
                    'Certificación Wellness',
                    <div>
                      <p className="mb-3"><strong>Karoba Wellness Travel</strong> está certificado en experiencias de bienestar y wellness.</p>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">Nuestros estándares wellness:</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Guías certificados en técnicas de relajación</li>
                            <li>Espacios diseñados para el bienestar mental</li>
                            <li>Alimentación consciente y saludable</li>
                            <li>Actividades que conectan cuerpo, mente y espíritu</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1">Beneficios comprobados:</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Reducción del estrés y la ansiedad</li>
                            <li>Mejora de la calidad del sueño</li>
                            <li>Aumento de la energía vital</li>
                            <li>Conexión profunda con la naturaleza</li>
                          </ul>
                        </div>
                        <p className="text-sm">Nuestras experiencias están diseñadas por expertos en wellness y bienestar holístico.</p>
                      </div>
                    </div>,
                    '✨'
                  )}
                  className="px-3 py-1 bg-gold-900/50 text-gold-300 rounded-full text-xs font-medium hover:bg-gold-900/70 transition-colors duration-200"
                >
                  ✨ Wellness Certified
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <button 
                onClick={() => openModal(
                  t('footer.privacy.policy.title'),
                  <div>
                    <p className="mb-3"><strong>{t('footer.privacy.policy.content')}</strong></p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Información que recopilamos:</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Datos de contacto (nombre, email, teléfono)</li>
                          <li>{t('footer.privacy.wellness.preferences')}</li>
                          <li>Información de reservas y pagos</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Uso de la información:</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Procesar reservas y pagos</li>
                          <li>Enviar confirmaciones y actualizaciones</li>
                          <li>Mejorar nuestros servicios</li>
                          <li>Comunicar ofertas especiales (con tu consentimiento)</li>
                        </ul>
                      </div>
                      <p className="text-sm">No compartimos tu información con terceros sin tu consentimiento. Para más detalles, contáctanos.</p>
                    </div>
                  </div>,
                  '🔒'
                )}
                className="hover:text-gold-400 transition-colors"
              >
                Privacidad
              </button>
              <button 
                onClick={() => openModal(
                  t('footer.terms.conditions.title'),
                  <div>
                    <p className="mb-3"><strong>{t('footer.terms.conditions.content')}</strong></p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Reservas y Pagos:</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Las reservas se confirman con el pago del 50% del valor total</li>
                          <li>El saldo restante se paga el día de la experiencia</li>
                          <li>Aceptamos efectivo, transferencias y tarjetas</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Cancelaciones:</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Cancelación gratuita hasta 48 horas antes</li>
                          <li>Cancelaciones tardías: 50% del valor pagado</li>
                          <li>No show: no hay reembolso</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Responsabilidades:</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Los participantes deben seguir las instrucciones de seguridad</li>
                          <li>Karoba no se hace responsable por objetos perdidos</li>
                          <li>Se requiere seguro de viaje para actividades acuáticas</li>
                        </ul>
                      </div>
                      <p className="text-sm">Para términos completos y condiciones específicas, contáctanos directamente.</p>
                    </div>
                  </div>,
                  '📋'
                )}
                className="hover:text-gold-400 transition-colors"
              >
                Términos
              </button>
              <span>© 2024 Karoba Wellness Travel Colombia</span>
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