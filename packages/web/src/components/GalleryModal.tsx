import { useEffect } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function GalleryModal({ 
  isOpen, 
  onClose, 
  items,
  currentIndex,
  onNavigate
}: GalleryModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
      if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Bloquear completamente el scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      
      // Ocultar la barra de navegación
      const header = document.querySelector('.header-fixed') as HTMLElement;
      if (header) {
        header.style.display = 'none';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restaurar scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      
      // Mostrar la barra de navegación
      const header = document.querySelector('.header-fixed') as HTMLElement;
      if (header) {
        header.style.display = '';
      }
    };
  }, [isOpen, onClose]);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    onNavigate(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  };

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ overflow: 'hidden' }}
    >
      {/* Backdrop semitransparente */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Counter */}
      {items.length > 1 && (
        <div className="absolute top-6 left-6 z-10 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm">
          {currentIndex + 1} / {items.length}
        </div>
      )}

      {/* Modal Content - Ventana emergente */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Content */}
        {currentItem.type === 'video' ? (
          <video
            key={currentItem.src}
            className="w-full h-auto"
            controls
            autoPlay
            playsInline
            poster={currentItem.thumbnail}
            style={{
              maxHeight: '80vh'
            }}
          >
            <source src={currentItem.src} type="video/mp4" />
            {t('gallery.video.unsupported')}
          </video>
        ) : (
          <img
            key={currentItem.src}
            src={currentItem.src}
            alt={t('gallery.image.alt')}
            className="w-full h-auto"
            style={{
              maxHeight: '80vh',
              objectFit: 'contain'
            }}
          />
        )}
      </div>
    </div>
  );
}