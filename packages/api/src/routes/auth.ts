import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel, CreateUserData, UpdateUserData } from '../models/User';
import WhatsAppService from '../services/whatsappService';

const router = Router();

// Configuración
const JWT_SECRET = process.env.JWT_SECRET || 'karoba-wellness-secret-key-2024';

// Middleware para validar JWT
export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acceso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, birthDate, interests } = req.body;

    // Validaciones
    if (!email || !password || !firstName || !lastName || !phone) {
      return res.status(400).json({ 
        message: 'Todos los campos obligatorios deben ser completados' 
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Formato de email inválido' });
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'La contraseña debe tener al menos 6 caracteres' 
      });
    }

    // Verificar si el email ya existe
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe una cuenta con este email' });
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear datos del usuario
    const userData: CreateUserData = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      birthDate: birthDate || undefined,
      interests: interests || []
    };

    // Crear usuario en la base de datos
    const newUser = await UserModel.create(userData);

    // 🎉 ENVIAR NOTIFICACIÓN DE WHATSAPP
    try {
      console.log('📱 Enviando notificación de WhatsApp para nuevo registro...');
      
      const whatsappNotification = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        registrationDate: new Date().toLocaleString('es-CO', {
          timeZone: 'America/Bogota',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      
      const whatsappSent = await WhatsAppService.sendNewUserNotification(whatsappNotification);
      
      if (whatsappSent) {
        console.log('✅ Notificación de WhatsApp enviada exitosamente');
      } else {
        console.log('⚠️ No se pudo enviar la notificación de WhatsApp');
      }
      
    } catch (whatsappError) {
      console.error('❌ Error enviando notificación de WhatsApp:', whatsappError);
      // No fallar el registro si WhatsApp falla
    }

    // Generar JWT token
    const token = jwt.sign(
      { 
        id: newUser.id, 
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Respuesta sin contraseña
    const { password: _, ...userResponse } = newUser;

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email y contraseña son requeridos' 
      });
    }

    // Buscar usuario por email
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar si la cuenta está activa
    if (!user.isActive) {
      return res.status(401).json({ message: 'Cuenta desactivada' });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Actualizar último login
    await UserModel.updateLastLogin(user.id);

    // Generar JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Respuesta sin contraseña
    const { password: _, ...userResponse } = user;

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener perfil del usuario autenticado
router.get('/profile', authenticateToken, async (req: any, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { password: _, ...userResponse } = user;
    res.json({ user: userResponse });

  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Actualizar perfil del usuario
router.put('/profile', authenticateToken, async (req: any, res) => {
  try {
    const { firstName, lastName, phone, birthDate, interests } = req.body;
    
    const updateData: UpdateUserData = {};
    
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (birthDate) updateData.birthDate = birthDate;
    if (interests) updateData.interests = interests;

    const updatedUser = await UserModel.update(req.user.id, updateData);
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { password: _, ...userResponse } = updatedUser;
    res.json({ 
      message: 'Perfil actualizado exitosamente',
      user: userResponse 
    });

  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Cambiar contraseña
router.put('/change-password', authenticateToken, async (req: any, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        message: 'Contraseña actual y nueva contraseña son requeridas' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        message: 'La nueva contraseña debe tener al menos 6 caracteres' 
      });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar contraseña actual
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    // Encriptar nueva contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    await UserModel.updatePassword(user.id, hashedPassword);

    res.json({ message: 'Contraseña actualizada exitosamente' });

  } catch (error) {
    console.error('Error cambiando contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Logout
router.post('/logout', authenticateToken, (req: any, res) => {
  res.json({ message: 'Sesión cerrada exitosamente' });
});

// Obtener estadísticas de usuarios (solo para admin)
router.get('/stats', authenticateToken, async (req: any, res) => {
  try {
    // Aquí podrías agregar verificación de rol de admin
    const totalUsers = await UserModel.count();
    
    res.json({
      totalUsers,
      message: 'Estadísticas obtenidas exitosamente'
    });

  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;