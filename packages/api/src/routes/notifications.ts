import { Router } from 'express';
import { authenticateToken } from './auth';
import WhatsAppService from '../services/whatsappService';

const router = Router();

// Middleware para verificar si es admin
const requireAdmin = async (req: any, res: any, next: any) => {
  try {
    console.log('🔐 Verificando permisos de admin para notificaciones:', req.user?.email);
    
    if (!req.user || req.user.email !== 'admin@karoba.com') {
      console.log('❌ Acceso denegado - No es admin:', req.user?.email);
      return res.status(403).json({
        success: false,
        error: 'Acceso denegado. Solo administradores.'
      });
    }
    
    console.log('✅ Permisos de admin verificados para notificaciones');
    next();
  } catch (error: any) {
    console.error('❌ Error verificando permisos:', error);
    res.status(500).json({
      success: false,
      error: 'Error verificando permisos'
    });
  }
};

// POST /api/notifications/test-whatsapp - Probar servicio de WhatsApp (solo admin)
router.post('/test-whatsapp', authenticateToken, requireAdmin, async (req: any, res) => {
  try {
    console.log('🧪 Probando servicio de WhatsApp REAL...');
    
    // Datos de prueba
    const testData = {
      firstName: 'Usuario',
      lastName: 'Prueba',
      email: 'test@karoba.com',
      phone: '+57 300 123 4567',
      registrationDate: new Date().toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    // Intentar enviar mensaje real
    const whatsappResult = await WhatsAppService.sendNewUserNotification(testData);
    
    if (whatsappResult) {
      res.json({
        success: true,
        message: 'Mensaje de prueba enviado. Revisa tu WhatsApp o el navegador que se abrió automáticamente.',
        data: {
          method: 'WhatsApp Real',
          realMessage: true,
          testData,
          timestamp: new Date().toISOString(),
          adminPhone: '573146218506',
          note: 'Si se configuró CallMeBot API, el mensaje se envió automáticamente. Si no, se abrió WhatsApp Web.'
        }
      });
    } else {
      res.json({
        success: false,
        message: 'No se pudo enviar el mensaje. Revisa la configuración de WhatsApp.',
        data: {
          method: 'Error',
          realMessage: false,
          testData,
          timestamp: new Date().toISOString(),
          note: 'Verifica la configuración de CallMeBot API o que WhatsApp Web esté disponible'
        }
      });
    }
    
  } catch (error) {
    console.error('Error probando WhatsApp:', error);
    res.status(500).json({
      success: false,
      error: 'Error al probar el servicio de WhatsApp'
    });
  }
});

// POST /api/notifications/contact - Enviar notificación de contacto
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message, source } = req.body;
    
    // Validaciones
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Nombre, email y mensaje son requeridos'
      });
    }
    
    console.log('📞 Enviando notificación de contacto...');
    
    const contactData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || '',
      message: message.trim(),
      source: source || 'website'
    };
    
    const result = await WhatsAppService.sendContactNotification(contactData);
    
    if (result) {
      res.json({
        success: true,
        message: 'Notificación de contacto enviada exitosamente'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'No se pudo enviar la notificación de contacto'
      });
    }
    
  } catch (error) {
    console.error('Error enviando notificación de contacto:', error);
    res.status(500).json({
      success: false,
      error: 'Error al enviar notificación de contacto'
    });
  }
});

// GET /api/notifications/whatsapp-config - Verificar configuración de WhatsApp (solo admin)
router.get('/whatsapp-config', authenticateToken, requireAdmin, async (req: any, res) => {
  try {
    const config = WhatsAppService.validateConfiguration();
    const whatsappWebInfo = await WhatsAppService.getWhatsAppWebInfo();
    
    res.json({
      success: true,
      data: {
        isConfigured: config.isValid,
        missingConfig: config.missingConfig,
        adminPhone: process.env.WHATSAPP_ADMIN_PHONE || '573146218506',
        hasBusinessAPI: !!(process.env.WHATSAPP_BUSINESS_API_URL && process.env.WHATSAPP_ACCESS_TOKEN),
        hasWebhook: !!(process.env.WHATSAPP_WEBHOOK_URL && process.env.WHATSAPP_API_KEY),
        whatsappWeb: {
          ready: WhatsAppService.isWhatsAppWebReady(),
          info: whatsappWebInfo,
          note: whatsappWebInfo.ready ? 'WhatsApp Web conectado - Mensajes REALES' : 'WhatsApp Web no conectado - Solo logs'
        }
      }
    });
    
  } catch (error) {
    console.error('Error verificando configuración de WhatsApp:', error);
    res.status(500).json({
      success: false,
      error: 'Error al verificar configuración'
    });
  }
});

// POST /api/notifications/manual-whatsapp - Generar enlace manual de WhatsApp
router.post('/manual-whatsapp', async (req, res) => {
  try {
    const { userData } = req.body;
    
    if (!userData || !userData.firstName || !userData.email) {
      return res.status(400).json({
        success: false,
        error: 'Datos de usuario requeridos'
      });
    }
    
    const message = `🎉 *NUEVO REGISTRO - KAROBA WELLNESS*

👤 *Nuevo Usuario Registrado*
━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 *Nombre:* ${userData.firstName} ${userData.lastName || ''}
📧 *Email:* ${userData.email}
📱 *Teléfono:* ${userData.phone || 'No proporcionado'}
📅 *Fecha:* ${new Date().toLocaleString('es-CO')}

━━━━━━━━━━━━━━━━━━━━━━━━━━
🏝️ *Karoba Wellness Travel Colombia*
✨ _Experiencias auténticas en el Caribe_`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/573146218506?text=${encodedMessage}`;
    
    res.json({
      success: true,
      data: {
        whatsappLink,
        message,
        adminPhone: '573146218506'
      }
    });
    
  } catch (error) {
    console.error('Error generando enlace de WhatsApp:', error);
    res.status(500).json({
      success: false,
      error: 'Error al generar enlace de WhatsApp'
    });
  }
});

export default router;