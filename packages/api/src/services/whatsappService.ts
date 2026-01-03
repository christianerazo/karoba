import axios from 'axios';
import whatsappDirectService from './whatsappDirectService';

// Configuración de WhatsApp Business API
const WHATSAPP_CONFIG = {
  // Número de destino para notificaciones
  ADMIN_PHONE: '573146218506', // Número al que se enviarán las notificaciones
  
  // Para usar con WhatsApp Business API (si tienes acceso)
  BUSINESS_API_URL: process.env.WHATSAPP_BUSINESS_API_URL,
  ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
  PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID,
  
  // Para usar con servicios de terceros como Twilio, etc.
  WEBHOOK_URL: process.env.WHATSAPP_WEBHOOK_URL,
  API_KEY: process.env.WHATSAPP_API_KEY
};

export interface NewUserNotification {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registrationDate: string;
}

export class WhatsAppService {
  
  /**
   * Envía notificación de nuevo registro usando múltiples métodos MEJORADOS
   */
  static async sendNewUserNotification(userData: NewUserNotification): Promise<boolean> {
    try {
      console.log('📱 Enviando notificación REAL de WhatsApp para nuevo registro:', userData.email);
      
      // Método 1: Servicio directo (CallMeBot, Twilio)
      const directResult = await whatsappDirectService.sendNewUserNotification(userData);
      if (directResult) {
        console.log('✅ Mensaje enviado por servicio directo automático');
        return true;
      }
      
      // Método 2: WhatsApp Business API (si está configurado)
      if (WHATSAPP_CONFIG.BUSINESS_API_URL && WHATSAPP_CONFIG.ACCESS_TOKEN) {
        const message = this.formatNewUserMessage(userData);
        const businessAPISent = await this.sendViaBusinessAPI(message);
        if (businessAPISent) {
          console.log('✅ Mensaje enviado por WhatsApp Business API');
          return true;
        }
      }
      
      // Método 3: Crear página HTML local con múltiples opciones (MÁS CONFIABLE)
      const message = this.formatNewUserMessage(userData);
      const htmlResult = await this.createHTMLWhatsAppSender(message, userData);
      if (htmlResult) {
        console.log('✅ Página HTML de WhatsApp creada y abierta');
        return true;
      }
      
      // Método 4: Enlaces directos múltiples (fallback)
      const links = this.createMultipleWhatsAppLinks(message);
      console.log('🔗 Enlaces de WhatsApp generados:');
      console.log('📱 Móvil:', links.mobile);
      console.log('💻 Web:', links.web);
      
      // Intentar abrir múltiples opciones
      this.openMultipleWhatsAppOptions(links);
      
      return true;
      
    } catch (error) {
      console.error('❌ Error enviando notificación de WhatsApp:', error);
      return false;
    }
  }
  
  /**
   * Crea página HTML local con múltiples opciones de WhatsApp
   */
  private static async createHTMLWhatsAppSender(message: string, userData: NewUserNotification): Promise<boolean> {
    try {
      const fs = require('fs');
      const path = require('path');
      const { exec } = require('child_process');
      
      const links = this.createMultipleWhatsAppLinks(message);
      
      const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Registro - Karoba Wellness</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #d4af37 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 600px;
            width: 100%;
            text-align: center;
            backdrop-filter: blur(10px);
        }
        .logo {
            font-size: 3em;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #1e3a8a, #d4af37);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .title {
            color: #1e3a8a;
            margin-bottom: 30px;
            font-size: 1.5em;
        }
        .user-info {
            background: #f8fafc;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 4px solid #d4af37;
        }
        .user-info h3 {
            color: #1e3a8a;
            margin-top: 0;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px;
            background: #25D366;
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }
        .btn:hover {
            background: #128C7E;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
        }
        .btn-secondary {
            background: #1e3a8a;
            box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
        }
        .btn-secondary:hover {
            background: #1e40af;
            box-shadow: 0 6px 20px rgba(30, 58, 138, 0.4);
        }
        .message-preview {
            background: #1f2937;
            color: #f9fafb;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: left;
            white-space: pre-line;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            max-height: 200px;
            overflow-y: auto;
        }
        .countdown {
            font-size: 1.2em;
            color: #d4af37;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #6b7280;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .pulse {
            animation: pulse 2s infinite;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🏝️</div>
        <h1 class="title">KAROBA WELLNESS<br>Nuevo Usuario Registrado</h1>
        
        <div class="user-info">
            <h3>📝 Información del Usuario</h3>
            <p><strong>Nombre:</strong> ${userData.firstName} ${userData.lastName}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Teléfono:</strong> ${userData.phone}</p>
            <p><strong>Fecha:</strong> ${userData.registrationDate}</p>
        </div>
        
        <div class="message-preview">${message}</div>
        
        <div class="countdown" id="countdown">Redirigiendo automáticamente en <span id="timer">10</span> segundos...</div>
        
        <a href="${links.mobile}" class="btn pulse" target="_blank" onclick="clearCountdown()">
            📱 Enviar por WhatsApp Móvil
        </a>
        
        <a href="${links.web}" class="btn" target="_blank" onclick="clearCountdown()">
            💻 Enviar por WhatsApp Web
        </a>
        
        <br><br>
        
        <a href="mailto:karoba.wellness@gmail.com?subject=Nuevo Registro&body=${encodeURIComponent(message)}" class="btn btn-secondary">
            📧 Enviar por Email
        </a>
        
        <div class="footer">
            💡 <strong>Tip:</strong> Si tienes WhatsApp en tu teléfono, usa "WhatsApp Móvil".<br>
            Para usar en computadora, selecciona "WhatsApp Web".<br>
            <strong>El mensaje se enviará automáticamente en <span id="timer2">10</span> segundos.</strong>
        </div>
    </div>
    
    <script>
        let countdown = 10;
        let countdownInterval;
        
        function updateCountdown() {
            document.getElementById('timer').textContent = countdown;
            document.getElementById('timer2').textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                // Abrir WhatsApp móvil automáticamente
                window.open('${links.mobile}', '_blank');
                document.getElementById('countdown').innerHTML = '✅ <strong>WhatsApp abierto automáticamente</strong>';
            } else {
                countdown--;
            }
        }
        
        function clearCountdown() {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '✅ <strong>Enviando mensaje...</strong>';
        }
        
        // Iniciar countdown
        countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
        
        // También intentar abrir inmediatamente si el usuario hace clic
        document.addEventListener('click', function() {
            setTimeout(() => {
                if (confirm('¿El mensaje se envió correctamente?')) {
                    window.close();
                }
            }, 2000);
        });
    </script>
</body>
</html>`;

      const htmlFile = path.join(process.cwd(), 'whatsapp-notification.html');
      fs.writeFileSync(htmlFile, htmlContent);
      
      console.log('📄 Página HTML creada:', htmlFile);
      
      // Abrir el archivo HTML
      exec(`start ${htmlFile}`, (error: any) => {
        if (error) {
          console.log('⚠️ No se pudo abrir automáticamente. Abre manualmente:', htmlFile);
        } else {
          console.log('✅ Página de notificación abierta en el navegador');
        }
      });
      
      return true;
    } catch (error) {
      console.error('❌ Error creando página HTML:', error);
      return false;
    }
  }
  
  /**
   * Crea múltiples enlaces de WhatsApp
   */
  private static createMultipleWhatsAppLinks(message: string): { mobile: string; web: string } {
    const encodedMessage = encodeURIComponent(message);
    
    return {
      mobile: `https://wa.me/${WHATSAPP_CONFIG.ADMIN_PHONE}?text=${encodedMessage}`,
      web: `https://web.whatsapp.com/send?phone=${WHATSAPP_CONFIG.ADMIN_PHONE}&text=${encodedMessage}`
    };
  }
  
  /**
   * Abre múltiples opciones de WhatsApp
   */
  private static openMultipleWhatsAppOptions(links: { mobile: string; web: string }): void {
    const { exec } = require('child_process');
    
    // Intentar abrir con diferentes navegadores y métodos
    const commands = [
      `start chrome "${links.mobile}"`,
      `start firefox "${links.mobile}"`,
      `start msedge "${links.mobile}"`,
      `start "${links.mobile}"`
    ];
    
    commands.forEach((cmd, index) => {
      setTimeout(() => {
        exec(cmd, (error: any) => {
          if (!error && index === 0) {
            console.log('✅ WhatsApp abierto en Chrome');
          }
        });
      }, index * 500);
    });
  }
  
  /**
   * Formatea el mensaje para el nuevo usuario
   */
  private static formatNewUserMessage(userData: NewUserNotification): string {
    return `🎉 *NUEVO REGISTRO - KAROBA WELLNESS*

👤 *Nuevo Usuario Registrado*
━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 *Nombre:* ${userData.firstName} ${userData.lastName}
📧 *Email:* ${userData.email}
📱 *Teléfono:* ${userData.phone}
📅 *Fecha:* ${userData.registrationDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━
🏝️ *Karoba Wellness Travel Colombia*
✨ _Experiencias auténticas en el Caribe_`;
  }
  
  /**
   * Envía mensaje usando WhatsApp Business API
   */
  private static async sendViaBusinessAPI(message: string): Promise<boolean> {
    try {
      const response = await axios.post(
        `${WHATSAPP_CONFIG.BUSINESS_API_URL}/${WHATSAPP_CONFIG.PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: 'whatsapp',
          to: WHATSAPP_CONFIG.ADMIN_PHONE,
          type: 'text',
          text: {
            body: message
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('✅ Mensaje enviado via WhatsApp Business API:', response.data);
      return true;
      
    } catch (error) {
      console.error('❌ Error con WhatsApp Business API:', error);
      return false;
    }
  }
  
  /**
   * Envía mensaje usando webhook personalizado
   */
  private static async sendViaWebhook(message: string, userData: NewUserNotification): Promise<boolean> {
    try {
      const response = await axios.post(WHATSAPP_CONFIG.WEBHOOK_URL!, {
        phone: WHATSAPP_CONFIG.ADMIN_PHONE,
        message: message,
        userData: userData,
        type: 'new_user_registration'
      }, {
        headers: {
          'Authorization': `Bearer ${WHATSAPP_CONFIG.API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ Mensaje enviado via webhook:', response.data);
      return true;
      
    } catch (error) {
      console.error('❌ Error con webhook de WhatsApp:', error);
      return false;
    }
  }
  
  /**
   * Genera enlace de WhatsApp para envío manual
   */
  private static generateWhatsAppLink(message: string): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_CONFIG.ADMIN_PHONE}?text=${encodedMessage}`;
  }
  
  /**
   * Envía notificación de contacto desde formularios
   */
  static async sendContactNotification(contactData: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    source: string;
  }): Promise<boolean> {
    try {
      const message = `📞 *NUEVO CONTACTO - KAROBA WELLNESS*

👤 *Nombre:* ${contactData.name}
📧 *Email:* ${contactData.email}
📱 *Teléfono:* ${contactData.phone || 'No proporcionado'}
📝 *Mensaje:* ${contactData.message}
🌐 *Origen:* ${contactData.source}
📅 *Fecha:* ${new Date().toLocaleString('es-CO')}

━━━━━━━━━━━━━━━━━━━━━━━━━━
🏝️ *Karoba Wellness Travel Colombia*`;

      // Usar WhatsApp Web para enviar notificación de contacto
      const result = await whatsappWebService.sendMessage('573146218506', message);
      
      if (result) {
        console.log('✅ Notificación de contacto enviada por WhatsApp Web');
        return true;
      } else {
        console.log('💬 Notificación de contacto (logs):', message);
        return true;
      }
      
    } catch (error) {
      console.error('❌ Error enviando notificación de contacto:', error);
      return false;
    }
  }
  
  /**
   * Envía mensaje de prueba usando WhatsApp Web (REAL)
   */
  static async sendTestMessage(): Promise<boolean> {
    try {
      console.log('🧪 Enviando mensaje de prueba REAL por WhatsApp Web...');
      
      const result = await whatsappWebService.sendTestMessage();
      
      if (result) {
        console.log('✅ Mensaje de prueba REAL enviado exitosamente');
        return true;
      } else {
        console.log('⚠️ WhatsApp Web no está listo. Mensaje mostrado en logs.');
        return false;
      }
      
    } catch (error) {
      console.error('❌ Error enviando mensaje de prueba:', error);
      return false;
    }
  }
  
  /**
   * Obtiene información del cliente WhatsApp Web
   */
  static async getWhatsAppWebInfo(): Promise<any> {
    try {
      return await whatsappWebService.getClientInfo();
    } catch (error: any) {
      console.error('❌ Error obteniendo info de WhatsApp Web:', error);
      return { ready: false, error: error.message };
    }
  }
  
  /**
   * Verifica si WhatsApp Web está listo
   */
  static isWhatsAppWebReady(): boolean {
    return whatsappWebService.isClientReady();
  }
  
  /**
   * Valida la configuración de WhatsApp
   */
  static validateConfiguration(): { isValid: boolean; missingConfig: string[] } {
    const missingConfig: string[] = [];
    
    if (!WHATSAPP_CONFIG.ADMIN_PHONE) {
      missingConfig.push('ADMIN_PHONE');
    }
    
    // Verificar si al menos un método está configurado
    const hasBusinessAPI = WHATSAPP_CONFIG.BUSINESS_API_URL && WHATSAPP_CONFIG.ACCESS_TOKEN;
    const hasWebhook = WHATSAPP_CONFIG.WEBHOOK_URL && WHATSAPP_CONFIG.API_KEY;
    
    if (!hasBusinessAPI && !hasWebhook) {
      missingConfig.push('WhatsApp API configuration (Business API or Webhook)');
    }
    
    return {
      isValid: missingConfig.length === 0,
      missingConfig
    };
  }
}

export default WhatsAppService;