import axios from 'axios';

class WhatsAppDirectService {
  private readonly adminPhone = '573146218506';

  /**
   * Envía mensaje usando CallMeBot API (gratuito y simple)
   * Requiere configuración previa en WhatsApp
   */
  async sendMessageViaCallMeBot(message: string): Promise<boolean> {
    try {
      // CallMeBot API - requiere configuración previa
      const apiKey = process.env.CALLMEBOT_API_KEY;
      
      if (!apiKey) {
        console.log('⚠️ CallMeBot API Key no configurado');
        return false;
      }

      const encodedMessage = encodeURIComponent(message);
      const url = `https://api.callmebot.com/whatsapp.php?phone=${this.adminPhone}&text=${encodedMessage}&apikey=${apiKey}`;

      const response = await axios.get(url);
      
      if (response.status === 200) {
        console.log('✅ Mensaje enviado por CallMeBot API');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Error con CallMeBot API:', error);
      return false;
    }
  }

  /**
   * Envía mensaje usando Twilio API (de pago pero confiable)
   */
  async sendMessageViaTwilio(message: string): Promise<boolean> {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER; // ej: whatsapp:+14155238886

      if (!accountSid || !authToken || !fromNumber) {
        console.log('⚠️ Twilio no configurado');
        return false;
      }

      const client = require('twilio')(accountSid, authToken);

      await client.messages.create({
        body: message,
        from: fromNumber,
        to: `whatsapp:+${this.adminPhone}`
      });

      console.log('✅ Mensaje enviado por Twilio WhatsApp API');
      return true;
    } catch (error) {
      console.error('❌ Error con Twilio API:', error);
      return false;
    }
  }

  /**
   * Abre WhatsApp Web directamente en el navegador del servidor (si hay GUI)
   */
  async openWhatsAppWeb(message: string): Promise<boolean> {
    try {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://web.whatsapp.com/send?phone=${this.adminPhone}&text=${encodedMessage}`;
      
      console.log('🌐 URL de WhatsApp Web generada:');
      console.log(whatsappUrl);
      console.log('📱 Copia esta URL en tu navegador para enviar el mensaje');
      
      // En Windows, intentar abrir el navegador
      if (process.platform === 'win32') {
        const { exec } = require('child_process');
        exec(`start ${whatsappUrl}`, (error: any) => {
          if (error) {
            console.log('⚠️ No se pudo abrir el navegador automáticamente');
          } else {
            console.log('🌐 WhatsApp Web abierto en el navegador');
          }
        });
      }
      
      return true;
    } catch (error) {
      console.error('❌ Error generando URL de WhatsApp:', error);
      return false;
    }
  }

  /**
   * Método principal que intenta todos los métodos disponibles
   */
  async sendMessage(message: string): Promise<boolean> {
    console.log('📱 Intentando enviar mensaje real por WhatsApp...');

    // Método 1: CallMeBot (gratuito)
    const callmebotResult = await this.sendMessageViaCallMeBot(message);
    if (callmebotResult) return true;

    // Método 2: Twilio (de pago)
    const twilioResult = await this.sendMessageViaTwilio(message);
    if (twilioResult) return true;

    // Método 3: Abrir WhatsApp Web
    const webResult = await this.openWhatsAppWeb(message);
    if (webResult) {
      console.log('✅ URL de WhatsApp generada - Revisa tu navegador');
      return true;
    }

    console.log('⚠️ No se pudo enviar mensaje real - Mostrando en logs');
    console.log('💬 Mensaje:', message);
    return false;
  }

  /**
   * Envía notificación de nuevo usuario
   */
  async sendNewUserNotification(userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    registrationDate: string;
  }): Promise<boolean> {
    const message = `🎉 *NUEVO REGISTRO - KAROBA WELLNESS*

👤 *Nuevo Usuario Registrado*
━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 *Nombre:* ${userData.firstName} ${userData.lastName}
📧 *Email:* ${userData.email}
📱 *Teléfono:* ${userData.phone}
📅 *Fecha:* ${userData.registrationDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━
🏝️ *Karoba Wellness Travel Colombia*
✨ _Experiencias auténticas en el Caribe_

💡 *Responde a este mensaje para contactar al nuevo usuario*`;

    return await this.sendMessage(message);
  }

  /**
   * Envía mensaje de prueba
   */
  async sendTestMessage(): Promise<boolean> {
    const message = `🧪 *MENSAJE DE PRUEBA - KAROBA WELLNESS*

✅ *Sistema de notificaciones funcionando*

📅 *Fecha:* ${new Date().toLocaleString('es-CO', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}

🏝️ *Karoba Wellness Travel Colombia*
✨ _Notificaciones automáticas activas_`;

    return await this.sendMessage(message);
  }

  /**
   * Obtiene información de configuración
   */
  getConfigInfo(): any {
    return {
      adminPhone: this.adminPhone,
      callmebotConfigured: !!process.env.CALLMEBOT_API_KEY,
      twilioConfigured: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
      methods: [
        {
          name: 'CallMeBot API',
          configured: !!process.env.CALLMEBOT_API_KEY,
          description: 'API gratuita - requiere configuración previa',
          setupUrl: 'https://www.callmebot.com/blog/free-api-whatsapp-messages/'
        },
        {
          name: 'Twilio WhatsApp API',
          configured: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
          description: 'API de pago - muy confiable',
          setupUrl: 'https://www.twilio.com/whatsapp'
        },
        {
          name: 'WhatsApp Web URL',
          configured: true,
          description: 'Abre WhatsApp Web en el navegador',
          note: 'Siempre disponible como fallback'
        }
      ]
    };
  }
}

// Instancia singleton
const whatsappDirectService = new WhatsAppDirectService();

export default whatsappDirectService;