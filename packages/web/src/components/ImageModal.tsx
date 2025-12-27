import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  description?: string;
}

export default function ImageModal({ 
  isOpen, 
  onClose, 
  imageSrc, 
  title, 
  description 
}: ImageModalProps) {

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
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
              <Dialog.Panel className="w-full max-w-none transform overflow-hidden rounded-2xl bg-black shadow-2xl transition-all flex items-center justify-center">
                
                {/* Header con botón de cerrar - siempre visible */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    type="button"
                    className="rounded-full bg-black/70 backdrop-blur-sm p-3 text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-200 hover:scale-110"
                    onClick={onClose}
                  >
                    <span className="sr-only">Cerrar imagen</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Image Container - Adaptativo al tamaño de la imagen */}
                <div className="relative flex items-center justify-center min-h-[50vh] max-h-[90vh] p-4">
                  <img
                    src={imageSrc}
                    alt={title}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl shadow-2xl"
                    style={{
                      maxWidth: '90vw',
                      maxHeight: '80vh',
                    }}
                    onClick={(e) => e.stopPropagation()} // Evitar que el clic en la imagen cierre el modal
                  />
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}