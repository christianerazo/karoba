const { exec } = require('child_process');
const axios = require('axios');

// Configuración
const ADMIN_PHONE = '573146218506';

/**
 * Método 1: Enlace directo de WhatsApp (más confiable)
 * Este método genera un enlace que funciona tanto en móvil como en escritorio
 */
function createDirectWhatsAppLink(message) {
  const encodedMessage = encodeURIComponent(message);
  
  // Enlace que funciona en móvil y escritorio
  const mobileLink = `https://wa.me/${ADMIN_PHONE}?text=${encodedMessage}`;
  
  // Enlace específico para WhatsApp Web
  const webLink = `https://web.whatsapp.com/send?phone=${ADMIN_PHONE}&text=${encodedMessage}`;
  
  return { mobileLink, webLink };
}

/**
 * Método 2: Abrir WhatsApp directamente en el teléfono (si está conectado)
 */
function openWhatsAppMobile(message) {
  const { mobileLink } = createDirectWhatsAppLink(message);
  
  console.log('📱 Abriendo WhatsApp en el teléfono...');
  console.log('🔗 Enlace móvil:', mobileLink);
  
  // Intentar abrir en diferentes navegadores
  const commands = [
    `start chrome "${mobileLink}"`,
    `start firefox "${mobileLink}"`,
    `start msedge "${mobileLink}"`,
    `start "${mobileLink}"`
  ];
  
  commands.forEach((cmd, index) => {
    setTimeout(() => {
      exec(cmd, (error) => {
        if (!error) {
          console.log(`✅ WhatsApp abierto con ${cmd.split(' ')[1] || 'navegador predeterminado'}`);
        }
      });
    }, index * 1000); // Esperar 1 segundo entre intentos
  });
  
  return mobileLink;
}

/**
 * Método 3: Crear archivo HTML local que se abre automáticamente
 */
function createLocalHTMLRedirect(message) {
  const { mobileLink, webLink } = createDirectWhatsAppLink(message);
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enviar mensaje de WhatsApp - Karoba Wellness</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #1e3a8a, #d4af37);
            color: white;
            text-align: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px;
            background: #25D366;
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            transition: all 0.3s;
        }
        .btn:hover {
            background: #128C7E;
            transform: scale(1.05);
        }
        .message-preview {
            background: rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: left;
            white-space: pre-line;
            font-family: monospace;
        }
        .logo {
            font-size: 2em;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🏝️ KAROBA WELLNESS</div>
        <h1>Nuevo Registro Recibido</h1>
        <p>Se ha registrado un nuevo usuario. Haz clic en uno de los botones para enviar la notificación por WhatsApp:</p>
        
        <div class="message-preview">${message}</div>
        
        <a href="${mobileLink}" class="btn" target="_blank">
            📱 Abrir en WhatsApp Móvil
        </a>
        
        <a href="${webLink}" class="btn" target="_blank">
            💻 Abrir en WhatsApp Web
        </a>
        
        <p style="margin-top: 30px; font-size: 0.9em; opacity: 0.8;">
            💡 Tip: Si tienes WhatsApp en tu teléfono, usa el botón "WhatsApp Móvil".<br>
            Si prefieres usar la versión web, usa "WhatsApp Web".
        </p>
        
        <script>
            // Auto-redirigir después de 3 segundos al enlace móvil
            setTimeout(() => {
                if (confirm('¿Quieres abrir WhatsApp automáticamente?')) {
                    window.open('${mobileLink}', '_blank');
                }
            }, 3000);
        </script>
    </div>
</body>
</html>`;

  const fs = require('fs');
  const path = require('path');
  
  const htmlFile = path.join(__dirname, 'whatsapp-message.html');
  fs.writeFileSync(htmlFile, htmlContent);
  
  console.log('📄 Archivo HTML creado:', htmlFile);
  
  // Abrir el archivo HTML
  exec(`start ${htmlFile}`, (error) => {
    if (error) {
      console.log('⚠️ No se pudo abrir automáticamente. Abre manualmente:', htmlFile);
    } else {
      console.log('✅ Página de WhatsApp abierta en el navegador');
    }
  });
  
  return htmlFile;
}

/**
 * Método 4: Usar Telegram como alternativa (si WhatsApp no funciona)
 */
function sendToTelegram(message) {
  // Si tienes un bot de Telegram configurado
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  
  if (telegramBotToken && telegramChatId) {
    const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    
    axios.post(telegramUrl, {
      chat_id: telegramChatId,
      text: message,
      parse_mode: 'Markdown'
    }).then(() => {
      console.log('✅ Mensaje enviado por Telegram');
    }).catch(error => {
      console.log('❌ Error enviando por Telegram:', error.message);
    });
  } else {
    console.log('⚠️ Telegram no configurado (opcional)');
  }
}

/**
 * Método 5: Enviar por email como respaldo
 */
async function sendByEmail(message, userData) {
  try {
    // Configuración de email (usando Gmail como ejemplo)
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'karoba.wellness@gmail.com',
        pass: process.env.EMAIL_PASS // Contraseña de aplicación de Gmail
      }
    });
    
    const mailOptions = {
      from: 'karoba.wellness@gmail.com',
      to: 'karoba.wellness@gmail.com', // Tu email
      subject: '🎉 Nuevo Registro - Karoba Wellness',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a8a, #d4af37); color: white; padding: 20px; text-align: center;">
            <h1>🏝️ KAROBA WELLNESS</h1>
            <h2>Nuevo Usuario Registrado</h2>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <pre style="background: white; padding: 15px; border-radius: 5px;">${message}</pre>
            <p><strong>Datos del usuario:</strong></p>
            <ul>
              <li><strong>Nombre:</strong> ${userData.firstName} ${userData.lastName}</li>
              <li><strong>Email:</strong> ${userData.email}</li>
              <li><strong>Teléfono:</strong> ${userData.phone}</li>
            </ul>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('✅ Notificación enviada por email');
    return true;
  } catch (error) {
    console.log('⚠️ Email no configurado o error:', error.message);
    return false;
  }
}

/**
 * Función principal que intenta todos los métodos
 */
async function sendWhatsAppNotification(userData) {
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

  console.log('📱 ENVIANDO NOTIFICACIÓN WHATSAPP - MÚLTIPLES MÉTODOS');
  console.log('═══════════════════════════════════════════════════');
  
  // Método 1: Crear página HTML local (MÁS CONFIABLE)
  console.log('🌐 Método 1: Creando página HTML local...');
  const htmlFile = createLocalHTMLRedirect(message);
  
  // Método 2: Enlace directo móvil
  console.log('📱 Método 2: Enlace directo móvil...');
  const mobileLink = openWhatsAppMobile(message);
  
  // Método 3: Telegram (alternativa)
  console.log('💬 Método 3: Telegram (alternativa)...');
  sendToTelegram(message);
  
  // Método 4: Email (respaldo)
  console.log('📧 Método 4: Email (respaldo)...');
  await sendByEmail(message, userData);
  
  console.log('');
  console.log('✅ NOTIFICACIÓN PROCESADA');
  console.log('📄 Archivo HTML:', htmlFile);
  console.log('📱 Enlace móvil:', mobileLink);
  console.log('📞 Número destino:', ADMIN_PHONE);
  
  return {
    success: true,
    methods: {
      html: htmlFile,
      mobile: mobileLink,
      telegram: !!process.env.TELEGRAM_BOT_TOKEN,
      email: true
    }
  };
}

// Función de prueba
async function testNotification() {
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
  
  return await sendWhatsAppNotification(testData);
}

// Exportar funciones
module.exports = {
  sendWhatsAppNotification,
  testNotification,
  createDirectWhatsAppLink,
  openWhatsAppMobile,
  createLocalHTMLRedirect
};

// Ejecutar prueba si se llama directamente
if (require.main === module) {
  testNotification().then(result => {
    console.log('🎯 Resultado:', result);
  }).catch(console.error);
}