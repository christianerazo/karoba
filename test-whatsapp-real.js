const axios = require('axios');
const { exec } = require('child_process');

// Configuración
const ADMIN_PHONE = '573146218506';
const API_BASE_URL = 'http://localhost:3001/api';

// Datos de prueba
const testUserData = {
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

// Función para generar mensaje de WhatsApp
function formatWhatsAppMessage(userData) {
  return `🎉 *NUEVO REGISTRO - KAROBA WELLNESS*

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
}

// Función para abrir WhatsApp Web
function openWhatsAppWeb(message) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://web.whatsapp.com/send?phone=${ADMIN_PHONE}&text=${encodedMessage}`;
  
  console.log('🌐 Abriendo WhatsApp Web...');
  console.log('📱 URL generada:', whatsappUrl);
  
  // Abrir en el navegador (Windows)
  exec(`start ${whatsappUrl}`, (error) => {
    if (error) {
      console.log('⚠️ No se pudo abrir automáticamente. Copia esta URL en tu navegador:');
      console.log(whatsappUrl);
    } else {
      console.log('✅ WhatsApp Web abierto en el navegador');
      console.log('📝 El mensaje está pre-cargado, solo haz clic en ENVIAR');
    }
  });
  
  return whatsappUrl;
}

// Función para probar CallMeBot API
async function testCallMeBot(message) {
  try {
    const apiKey = process.env.CALLMEBOT_API_KEY;
    
    if (!apiKey) {
      console.log('⚠️ CallMeBot API Key no configurado');
      console.log('📋 Para configurar CallMeBot:');
      console.log('1. Envía "I allow callmebot to send me messages" al número +34 644 59 71 67');
      console.log('2. Espera la respuesta con tu API key');
      console.log('3. Agrega CALLMEBOT_API_KEY=tu_api_key al archivo .env');
      return false;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${ADMIN_PHONE}&text=${encodedMessage}&apikey=${apiKey}`;

    console.log('📡 Enviando mensaje por CallMeBot API...');
    const response = await axios.get(url);
    
    if (response.status === 200) {
      console.log('✅ Mensaje enviado exitosamente por CallMeBot API');
      return true;
    }
    
    console.log('❌ Error en CallMeBot API:', response.data);
    return false;
  } catch (error) {
    console.error('❌ Error con CallMeBot API:', error.message);
    return false;
  }
}

// Función principal de prueba
async function testWhatsAppIntegration() {
  console.log('🧪 PRUEBA DE INTEGRACIÓN WHATSAPP - KAROBA WELLNESS');
  console.log('═══════════════════════════════════════════════════');
  
  const message = formatWhatsAppMessage(testUserData);
  
  console.log('💬 Mensaje a enviar:');
  console.log(message);
  console.log('');
  
  // Método 1: CallMeBot API (si está configurado)
  console.log('📡 Método 1: CallMeBot API');
  const callmebotResult = await testCallMeBot(message);
  
  if (callmebotResult) {
    console.log('🎉 ¡Mensaje enviado exitosamente por CallMeBot!');
    console.log('📱 Revisa tu WhatsApp para ver el mensaje');
    return;
  }
  
  // Método 2: WhatsApp Web (siempre disponible)
  console.log('');
  console.log('🌐 Método 2: WhatsApp Web');
  const whatsappUrl = openWhatsAppWeb(message);
  
  console.log('');
  console.log('✅ WhatsApp Web configurado');
  console.log('📝 El navegador debería abrirse automáticamente');
  console.log('💡 Si no se abre, copia la URL mostrada arriba');
  
  // Método 3: Probar API del servidor
  console.log('');
  console.log('🔧 Método 3: Probando API del servidor...');
  
  try {
    // Primero necesitamos hacer login como admin
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'admin@karoba.com',
      password: 'admin123'
    });
    
    if (loginResponse.data.token) {
      console.log('✅ Login como admin exitoso');
      
      // Probar endpoint de WhatsApp
      const testResponse = await axios.post(
        `${API_BASE_URL}/notifications/test-whatsapp`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${loginResponse.data.token}`
          }
        }
      );
      
      console.log('✅ API del servidor respondió:', testResponse.data.message);
    }
  } catch (apiError) {
    console.log('⚠️ Error probando API del servidor:', apiError.message);
    console.log('💡 Asegúrate de que el servidor esté ejecutándose en puerto 3001');
  }
  
  console.log('');
  console.log('🎯 RESUMEN:');
  console.log('- WhatsApp Web: ✅ Siempre disponible');
  console.log('- CallMeBot API:', callmebotResult ? '✅ Configurado y funcionando' : '⚠️ No configurado');
  console.log('- Número destino:', ADMIN_PHONE);
  console.log('');
  console.log('💡 Para mensajes automáticos reales, configura CallMeBot API siguiendo las instrucciones en .env');
}

// Ejecutar prueba
if (require.main === module) {
  testWhatsAppIntegration().catch(console.error);
}

module.exports = { testWhatsAppIntegration, openWhatsAppWeb, formatWhatsAppMessage };