# 📱 CONFIGURACIÓN WHATSAPP REAL - KAROBA WELLNESS

## 🎯 OBJETIVO
Configurar el envío REAL de mensajes de WhatsApp cuando los usuarios se registren en la plataforma.

## 🚀 MÉTODOS DISPONIBLES

### 1. 🌐 WhatsApp Web (SIEMPRE DISPONIBLE)
**Estado:** ✅ YA CONFIGURADO
- Se abre automáticamente en el navegador
- El mensaje está pre-cargado
- Solo necesitas hacer clic en "Enviar"

### 2. 📡 CallMeBot API (GRATUITO - RECOMENDADO)
**Estado:** ⚠️ REQUIERE CONFIGURACIÓN

#### Pasos para configurar CallMeBot:

1. **Envía mensaje de autorización:**
   - Abre WhatsApp en tu teléfono
   - Envía este mensaje exacto: `I allow callmebot to send me messages`
   - Al número: `+34 644 59 71 67`

2. **Espera la respuesta:**
   - Recibirás un mensaje con tu API key
   - Ejemplo: "API Activated for your phone number. Your APIKEY is 123456"

3. **Configura el API key:**
   - Abre el archivo `.env` en la raíz del proyecto
   - Busca la línea: `CALLMEBOT_API_KEY=`
   - Agrega tu API key: `CALLMEBOT_API_KEY=123456`

4. **Reinicia el servidor:**
   ```bash
   cd packages/api
   npm run dev
   ```

### 3. 💰 Twilio WhatsApp API (DE PAGO)
**Estado:** ⚠️ OPCIONAL

Si quieres usar Twilio (más confiable pero de pago):
1. Crea cuenta en [Twilio](https://www.twilio.com/whatsapp)
2. Configura WhatsApp Sandbox
3. Agrega las credenciales en `.env`:
   ```
   TWILIO_ACCOUNT_SID=tu_account_sid
   TWILIO_AUTH_TOKEN=tu_auth_token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```

## 🧪 PRUEBAS

### Prueba Rápida (Línea de comandos)
```bash
node test-whatsapp-real.js
```

### Prueba desde Admin Panel
1. Ve a: http://localhost:3002/admin/dashboard
2. Login: admin@karoba.com / admin123
3. Haz clic en "Probar WhatsApp"

### Prueba con Registro Real
1. Ve a: http://localhost:3002/register
2. Registra un usuario de prueba
3. El mensaje se enviará automáticamente

## 📋 VERIFICACIÓN

### ✅ Funcionando Correctamente:
- [ ] CallMeBot configurado (mensajes automáticos)
- [x] WhatsApp Web funciona (manual pero inmediato)
- [ ] Twilio configurado (opcional)

### 🔍 Logs del Servidor:
Busca estos mensajes en la consola del servidor:
- `✅ Mensaje enviado por CallMeBot API` (automático)
- `🌐 WhatsApp Web abierto en el navegador` (manual)
- `📱 Enviando notificación REAL de WhatsApp`

## 🎉 RESULTADO ESPERADO

Cuando un usuario se registre:

1. **Con CallMeBot configurado:**
   - Mensaje automático a tu WhatsApp (+57 314 621 8506)
   - Sin intervención manual

2. **Sin CallMeBot:**
   - Se abre WhatsApp Web automáticamente
   - Mensaje pre-cargado
   - Solo hacer clic en "Enviar"

## 📱 FORMATO DEL MENSAJE

```
🎉 NUEVO REGISTRO - KAROBA WELLNESS

👤 Nuevo Usuario Registrado
━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Nombre: Juan Pérez
📧 Email: juan@example.com
📱 Teléfono: +57 300 123 4567
📅 Fecha: 3 de enero de 2026, 10:30

━━━━━━━━━━━━━━━━━━━━━━━━━━
🏝️ Karoba Wellness Travel Colombia
✨ Experiencias auténticas en el Caribe

💡 Responde a este mensaje para contactar al nuevo usuario
```

## 🔧 SOLUCIÓN DE PROBLEMAS

### Problema: "No se envió el mensaje"
**Solución:**
1. Verifica que CallMeBot esté configurado
2. Si no, usa WhatsApp Web (siempre funciona)
3. Revisa los logs del servidor

### Problema: "WhatsApp Web no se abre"
**Solución:**
1. Copia la URL que aparece en los logs
2. Pégala en tu navegador
3. El mensaje estará pre-cargado

### Problema: "CallMeBot no responde"
**Solución:**
1. Verifica que enviaste el mensaje exacto
2. Espera hasta 5 minutos por la respuesta
3. Usa WhatsApp Web mientras tanto

## 🎯 ESTADO ACTUAL

- ✅ WhatsApp Web: FUNCIONANDO
- ⚠️ CallMeBot: PENDIENTE CONFIGURACIÓN
- ⚠️ Twilio: NO CONFIGURADO
- ✅ Integración con registro: FUNCIONANDO
- ✅ Admin panel test: FUNCIONANDO

## 📞 NÚMERO DE DESTINO
**+57 314 621 8506** (configurado en WHATSAPP_ADMIN_PHONE)

---

**💡 RECOMENDACIÓN:** Configura CallMeBot API para mensajes completamente automáticos. Es gratuito y muy fácil de configurar.