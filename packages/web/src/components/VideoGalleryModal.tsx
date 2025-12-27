import { Fragment, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface VideoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
  description?: string;
  thumbnail?: string;
}

export default function VideoGalleryModal({ 
  isOpen, 
  onClose, 
  videoSrc, 
  title, 
  description,
  thumbnail 
}: VideoGalleryModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      setIsLoading(true);
      // Auto-play cuando se abre el modal
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    } else if (!isOpen && videoRef.current) {
      // Pausar y resetear cuando se cierra
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsLoading(true);
    }
  }, [isOpen]);

  // Cerrar modal con tecla Escape y manejar redimensionamiento
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleResize = () => {
      if (videoRef.current && isOpen) {
        const video = videoRef.current;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        
        if (videoWidth && videoHeight) {
          // Recalcular el tamaño cuando cambia la ventana
          const maxWidth = Math.min(window.innerWidth * 0.9, 1200);
          const maxHeight = Math.min(window.innerHeight * 0.8, 800);
          
          const widthRatio = maxWidth / videoWidth;
          const heightRatio = maxHeight / videoHeight;
          const scale = Math.min(widthRatio, heightRatio, 1);
          
          const displayWidth = videoWidth * scale;
          const displayHeight = videoHeight * scale;
          
          video.style.width = `${displayWidth}px`;
          video.style.height = `${displayHeight}px`;
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      window.addEventListener('resize', handleResize);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/95 video-modal-overlay" onClick={onClose} />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-none transform overflow-hidden rounded-2xl bg-black shadow-2xl transition-all video-modal-content flex items-center justify-center">
                
                {/* Header con botón de cerrar - siempre visible */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    type="button"
                    className="rounded-full bg-black/70 backdrop-blur-sm p-3 text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-200 hover:scale-110"
                    onClick={onClose}
                  >
                    <span className="sr-only">Cerrar video</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Loading indicator */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500"></div>
                    </div>
                  </div>
                )}

                {/* Video Container - Adaptativo dinámico al tamaño del video */}
                <div className="video-modal-container">
                  <video
                    ref={videoRef}
                    className="rounded-2xl shadow-2xl"
                    controls
                    playsInline
                    controlsList="nodownload"
                    disablePictureInPicture={false}
                    poster={thumbnail}
                    style={{
                      maxWidth: '90vw',
                      maxHeight: '80vh',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      backgroundColor: '#000000'
                    }}
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        const video = videoRef.current;
                        const videoWidth = video.videoWidth;
                        const videoHeight = video.videoHeight;
                        
                        // Calcular el tamaño óptimo manteniendo la proporción exacta
                        const maxWidth = Math.min(window.innerWidth * 0.9, 1200);
                        const maxHeight = Math.min(window.innerHeight * 0.8, 800);
                        
                        let displayWidth = videoWidth;
                        let displayHeight = videoHeight;
                        
                        // Escalar proporcionalmente si es necesario
                        const widthRatio = maxWidth / displayWidth;
                        const heightRatio = maxHeight / displayHeight;
                        const scale = Math.min(widthRatio, heightRatio, 1);
                        
                        displayWidth = displayWidth * scale;
                        displayHeight = displayHeight * scale;
                        
                        // Aplicar el tamaño calculado exacto
                        video.style.width = `${displayWidth}px`;
                        video.style.height = `${displayHeight}px`;
                        
                        setIsLoading(false);
                      }
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onLoadStart={() => setIsLoading(true)}
                    onCanPlay={() => setIsLoading(false)}
                    onClick={(e) => e.stopPropagation()} // Evitar que el clic en el video cierre el modal
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}