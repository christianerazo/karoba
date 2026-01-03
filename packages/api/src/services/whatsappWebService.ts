import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import path from 'path';

class WhatsAppWebService {
  private client: Client | null = null;
  private isReady = false;
  private isInitializing = false;

  constructor() {
    this.initializeClient();
  }

  private async initializeClient() {
    if (this.isInitializing) return;
    this.isInitializing = true;

    try {
      console.log('🔄 Inicializando cliente de WhatsApp Web...');
      
      this.client = new Client({
        authStrategy: new LocalAuth({
          clientId: 'karoba-session'
        }),
        puppeteer: {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
          ]
        }
      });

      // Evento cuando se genera el código QR
      this.client.on('qr', (qr) => {
        console.log('\n📱 ESCANEA ESTE CÓDIGO QR CON WHATSAPP:');
        console.log('1. Abre WhatsApp en tu teléfono');
        console.log('2. Ve a Configuración > Dispositivos vinculados');
        console.log('3. Toca "Vincular un dispositivo"');
        console.log('4. Escanea este código QR:\n');
        
        qrcode.generate(qr, { small: true });
        
        console.log('\n⏰ El código QR expira en 20 segundos. Si no funciona, reinicia el servidor.\n');
      });

      // Evento cuando está listo
      this.client.on('ready', () => {
        console.log('✅ WhatsApp Web conectado y listo!');
        this.isReady = true;
      });

      // Evento de autenticación exitosa
      this.client.on('authenticated', () => {
        console.log('🔐 WhatsApp Web autenticado correctamente');
      });

      // Evento de fallo de autenticación
      this.client.on('auth_failure', (msg) => {
        console.error('❌ Fallo de autenticación WhatsApp:', msg);
        this.isReady = false;
      });

      // Evento de desconexión
      this.client.on('disconnected', (reason) => {
        console.log('🔌 WhatsApp Web desconectado:', reason);
        this.isReady = false;
      });

      // Inicializar cliente
      await this.client.initialize();
      
    } catch (error) {
      console.error('❌ Error inicializando WhatsApp Web:', error);
      this.isReady = false;
      this.isInitializing = false;
    }
  }

  async sendMessage(phoneNumber: string, message: string): Promise<boolean> {
    try {
      if (!this.client || !this.isReady) {
        console.log('⚠️ WhatsApp Web no está listo. Mensaje guardado en logs.');
        console.log('📱 Para enviar mensajes reales, escanea el código QR al iniciar el servidor.');
        console.log('💬 Mensaje que se enviaría:', message);
        console.log('📞 Número destino:', phoneNumber);
        return false;
      }

      // Formatear número de teléfono
      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      const chatId = `${formattedNumber}@c.us`;

      console.log(`📱 Enviando mensaje real a WhatsApp: ${formattedNumber}`);
      
      // Enviar mensaje
      await this.client.sendMessage(chatId, message);
      
      console.log('✅ Mensaje de WhatsApp enviado exitosamente!');
      return true;

    } catch (error) {
      console.error('❌ Error enviando mensaje de WhatsApp:', error);
      console.log('💬 Mensaje que se intentó enviar:', message);
      console.log('📞 Número destino:', phoneNumber);
      return false;
    }
  }

  private formatPhoneNumber(phoneNumber: string): string {
    // Remover caracteres no numéricos
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    // Si empieza con 57 (Colombia), mantenerlo
    if (cleaned.startsWith('57')) {
      return cleaned;
    }
    
    // Si empieza con 3 (número colombiano sin código de país), agregar 57
    if (cleaned.startsWith('3')) {
      return '57' + cleaned;
    }
    
    // Si no tiene código de país, asumir Colombia
    if (cleaned.length === 10) {
      return '57' + cleaned;
    }
    
    return cleaned;
  }

  async sendNewUserNotification(userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    registrationDate: string;
  }): Promise<boolean> {
    const adminPhone = '573146218506'; // Tu número de WhatsApp
    
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

    return await this.sendMessage(adminPhone, message);
  }

  async sendTestMessage(): Promise<boolean> {
    const adminPhone = '573146218506';
    
    const message = `🧪 *MENSAJE DE PRUEBA - KAROBA WELLNESS*

✅ *WhatsApp Web funcionando correctamente*

📅 *Fecha:* ${new Date().toLocaleString('es-CO', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}

🏝️ *Karoba Wellness Travel Colombia*
✨ _Sistema de notificaciones activo_`;

    return await this.sendMessage(adminPhone, message);
  }

  isClientReady(): boolean {
    return this.isReady;
  }

  async getClientInfo(): Promise<any> {
    if (!this.client || !this.isReady) {
      return {
        ready: false,
        message: 'Cliente no inicializado o no listo'
      };
    }

    try {
      const info = this.client.info;
      return {
        ready: true,
        phone: info?.wid?.user,
        name: info?.pushname,
        platform: info?.platform
      };
    } catch (error: any) {
      return {
        ready: false,
        error: error.message
      };
    }
  }

  async destroy() {
    if (this.client) {
      await this.client.destroy();
      this.client = null;
      this.isReady = false;
    }
  }
}

// Instancia singleton
const whatsappWebService = new WhatsAppWebService();

export default whatsappWebService;