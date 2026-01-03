import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title?: string;
  description?: string;
}

export default function ImageModal({ 
  isOpen, 
  onClose, 
  imageSrc 
}: ImageModalProps) {

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
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

  if (!isOpen) return null;

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
      
      {/* Modal Content - Ventana emergente */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Image */}
        <img
          src={imageSrc}
          alt="Imagen"
          className="w-full h-auto"
          style={{
            maxHeight: '80vh',
            objectFit: 'contain'
          }}
        />
      </div>
    </div>
  );
}