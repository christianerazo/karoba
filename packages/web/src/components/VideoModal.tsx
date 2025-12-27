import { Fragment, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-dark-900 p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6 text-white mb-2"
                    >
                      🏝️ Descubre el Paraíso Wellness de Karoba
                    </Dialog.Title>
                    <p className="text-gold-300 text-sm">
                      Experiencias auténticas en el Caribe colombiano
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-200 hover:scale-110"
                    onClick={onClose}
                  >
                    <span className="sr-only">Cerrar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Video */}
                <div className="relative aspect-video bg-gradient-to-br from-dark-800 to-blue-900 rounded-xl overflow-hidden shadow-2xl">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    poster="/images/hero-bg.jpeg"
                  >
                    <source src="/images/karoba-video.mp4" type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                  </video>
                  
                  {/* Video overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Description */}
                <div className="mt-8 text-center">
                  <div className="bg-gradient-to-r from-blue-900/50 to-gold-900/50 rounded-xl p-6 backdrop-blur-sm border border-gold-400/20">
                    <p className="text-gray-200 mb-6 text-lg leading-relaxed">
                      Sumérgete en la experiencia completa de wellness que Karoba tiene para ofrecerte 
                      en los destinos más exclusivos del Caribe colombiano. Descubre cómo transformamos 
                      vidas a través del bienestar auténtico.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        className="btn-gold text-lg px-8 py-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                        onClick={onClose}
                      >
                        <span className="flex items-center space-x-2">
                          <span>🌊</span>
                          <span>Reservar Mi Experiencia</span>
                        </span>
                      </button>
                      <button 
                        className="btn-secondary bg-white/10 hover:bg-white/20 text-white border-gold-300/50 text-lg px-8 py-3 backdrop-blur-sm"
                        onClick={onClose}
                      >
                        <span className="flex items-center space-x-2">
                          <span>📞</span>
                          <span>Contactar Asesor VIP</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}