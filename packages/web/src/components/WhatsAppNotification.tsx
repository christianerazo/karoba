import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface WhatsAppNotificationProps {
  show: boolean;
  userData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onClose: () => void;
}

const WhatsAppNotification: React.FC<WhatsAppNotificationProps> = ({ 
  show, 
  userData, 
  onClose 
}) => {
  const { t } = useLanguage();
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  if (!show || !userData) return null;

  const handleGenerateWhatsAppLink = async () => {
    try {
      setIsGeneratingLink(true);
      
      const response = await fetch('/api/notifications/manual-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userData })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.whatsappLink) {
        // Abrir WhatsApp en nueva ventana
        window.open(data.data.whatsappLink, '_blank');
      } else {
        console.error('Error generando enlace de WhatsApp:', data.error);
      }
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGeneratingLink(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <span className="text-2xl">×</span>
        </button>

        {/* Contenido */}
        <div className="text-center">
          {/* Icono de WhatsApp */}
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </div>

          {/* Título */}
          <h3 className="text-xl font-bold text-dark-900 mb-2">
            🎉 ¡Registro Exitoso!
          </h3>

          {/* Mensaje */}
          <p className="text-gray-600 mb-6">
            Tu registro ha sido completado exitosamente. Se ha enviado una notificación 
            automática a nuestro equipo de Karoba Wellness.
          </p>

          {/* Información del usuario */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-semibold text-blue-800 mb-2">Datos registrados:</h4>
            <div className="space-y-1 text-sm text-blue-700">
              <p><span className="font-medium">Nombre:</span> {userData.firstName} {userData.lastName}</p>
              <p><span className="font-medium">Email:</span> {userData.email}</p>
              <p><span className="font-medium">Teléfono:</span> {userData.phone}</p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleGenerateWhatsAppLink}
              disabled={isGeneratingLink}
              className="btn-primary flex items-center justify-center space-x-2 w-full"
            >
              {isGeneratingLink ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generando enlace...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Contactar por WhatsApp</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="btn-secondary w-full"
            >
              Continuar navegando
            </button>
          </div>

          {/* Nota */}
          <p className="text-xs text-gray-500 mt-4">
            Nuestro equipo se pondrá en contacto contigo pronto para ofrecerte 
            las mejores experiencias de wellness en el Caribe colombiano.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppNotification;