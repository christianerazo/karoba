import { Router } from 'express';
import { UserModel, CreateUserData } from '../models/User';
import { authenticateToken } from './auth';
import bcrypt from 'bcrypt';
import WhatsAppService from '../services/whatsappService';

const router = Router();

// Middleware para verificar si es admin
const requireAdmin = async (req: any, res: any, next: any) => {
  try {
    console.log('🔐 Verificando permisos de admin para usuario:', req.user?.id);
    
    const user = await UserModel.findById(req.user.id);
    console.log('👤 Usuario encontrado:', user ? { id: user.id, email: user.email } : 'No encontrado');
    
    if (!user || user.email !== 'admin@karoba.com') {
      console.log('❌ Acceso denegado - No es admin:', user?.email);
      return res.status(403).json({
        success: false,
        error: 'Acceso denegado. Solo administradores.',
        userEmail: user?.email || 'Usuario no encontrado'
      });
    }
    
    console.log('✅ Permisos de admin verificados');
    next();
  } catch (error: any) {
    console.error('❌ Error verificando permisos:', error);
    res.status(500).json({
      success: false,
      error: 'Error verificando permisos',
      details: error.message
    });
  }
};

// GET /api/users - Obtener todos los usuarios (solo admin)
router.get('/', authenticateToken, requireAdmin, async (req: any, res) => {
  try {
    console.log('🔍 GET /api/users - Iniciando obtención de usuarios');
    console.log('👤 Usuario autenticado:', req.user?.id, req.user?.email);
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const includeInactive = req.query.includeInactive === 'true';
    
    console.log('📊 Parámetros de consulta:', { page, limit, offset, includeInactive });
    console.log('📊 Tipos de parámetros:', { 
      pageType: typeof page, 
      limitType: typeof limit, 
      offsetType: typeof offset 
    });
    
    const users = includeInactive 
      ? await UserModel.findAllIncludingInactive(limit, offset)
      : await UserModel.findAll(limit, offset);
      
    console.log('👥 Usuarios obtenidos:', users.length);
      
    const totalUsers = includeInactive 
      ? await UserModel.countAll()
      : await UserModel.count();
    
    console.log('📈 Total usuarios:', totalUsers);
    
    // Remover contraseñas de la respuesta
    const safeUsers = users.map(user => {
      const { password, ...safeUser } = user;
      return safeUser;
    });
    
    const responseData = {
      success: true,
      data: {
        users: safeUsers,
        pagination: {
          page,
          limit,
          total: totalUsers,
          totalPages: Math.ceil(totalUsers / limit)
        }
      }
    };
    
    console.log('✅ Respuesta preparada:', {
      success: responseData.success,
      usersCount: responseData.data.users.length,
      pagination: responseData.data.pagination
    });
    
    res.json(responseData);
  } catch (error: any) {
    console.error('❌ Error obteniendo usuarios:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener usuarios',
      details: error.message
    });
  }
});

// POST /api/users - Crear nuevo usuario (solo admin)
router.post('/', authenticateToken, requireAdmin, async (req: any, res) => {
  try {
    const { email, password, firstName, lastName, phone, birthDate, interests } = req.body;

    // Validaciones
    if (!email || !password || !firstName || !lastName || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Todos los campos obligatorios deben ser completados'
      });
    }

    // Verificar si el email ya existe
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un usuario con este email'
      });
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear usuario
    const userData: CreateUserData = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      birthDate: birthDate || undefined,
      interests: interests || []
    };

    const newUser = await UserModel.create(userData);

    // 🎉 ENVIAR NOTIFICACIÓN DE WHATSAPP (creado por admin)
    try {
      console.log('📱 Enviando notificación de WhatsApp para usuario creado por admin...');
      
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
      
      // Mensaje especial para usuarios creados por admin
      const adminMessage = `👑 *USUARIO CREADO POR ADMIN - KAROBA WELLNESS*

👤 *Nuevo Usuario (Creado por Administrador)*
━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 *Nombre:* ${newUser.firstName} ${newUser.lastName}
📧 *Email:* ${newUser.email}
📱 *Teléfono:* ${newUser.phone}
📅 *Fecha:* ${whatsappNotification.registrationDate}
👑 *Creado por:* Administrador

━━━━━━━━━━━━━━━━━━━━━━━━━━
🏝️ *Karoba Wellness Travel Colombia*
✨ _Experiencias auténticas en el Caribe_`;

      // Enviar mensaje personalizado para admin
      console.log('💬 Mensaje de WhatsApp (creado por admin):', adminMessage);
      
    } catch (whatsappError) {
      console.error('❌ Error enviando notificación de WhatsApp:', whatsappError);
      // No fallar la creación si WhatsApp falla
    }

    const { password: _, ...safeUser } = newUser;

    res.status(201).json({
      success: true,
      data: safeUser,
      message: 'Usuario creado exitosamente'
    });

  } catch (error) {
    console.error('Error creando usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear usuario'
    });
  }
});

// GET /api/users/:id - Obtener usuario por ID (solo admin)
router.get('/:id', authenticateToken, requireAdmin, async (req: any, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    const { password, ...safeUser } = user;
    
    res.json({
      success: true,
      data: safeUser
    });
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener usuario'
    });
  }
});

// PUT /api/users/:id - Actualizar usuario (solo admin)
router.put('/:id', authenticateToken, requireAdmin, async (req: any, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, birthDate, interests, email, password } = req.body;
    
    const updateData: any = {};
    
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (birthDate) updateData.birthDate = birthDate;
    if (interests) updateData.interests = interests;
    
    // Si se proporciona nueva contraseña, encriptarla
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await UserModel.updatePassword(id, hashedPassword);
    }
    
    const updatedUser = await UserModel.update(id, updateData);
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    const { password: _, ...safeUser } = updatedUser;
    
    res.json({
      success: true,
      data: safeUser,
      message: 'Usuario actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar usuario'
    });
  }
});

// DELETE /api/users/:id - Eliminar usuario (solo admin)
router.delete('/:id', authenticateToken, requireAdmin, async (req: any, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que no se elimine a sí mismo
    if (id === req.user.id) {
      return res.status(400).json({
        success: false,
        error: 'No puedes eliminar tu propia cuenta'
      });
    }
    
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }
    
    await UserModel.deactivate(id);
    
    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar usuario'
    });
  }
});

// POST /api/users/register - Registro alternativo (mantener compatibilidad)
router.post('/register', async (req, res) => {
  // Redirigir a la ruta de auth
  res.redirect(307, '/api/auth/register');
});

// GET /api/users/profile - Obtener perfil del usuario autenticado
router.get('/profile', authenticateToken, async (req: any, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }
    
    const { password, ...safeUser } = user;
    
    res.json({
      success: true,
      data: safeUser
    });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener perfil'
    });
  }
});

// PUT /api/users/profile - Actualizar perfil del usuario
router.put('/profile', authenticateToken, async (req: any, res) => {
  try {
    const { firstName, lastName, phone, birthDate, interests } = req.body;
    
    const updatedUser = await UserModel.update(req.user.id, {
      firstName,
      lastName,
      phone,
      birthDate,
      interests
    });
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }
    
    const { password, ...safeUser } = updatedUser;
    
    res.json({
      success: true,
      data: safeUser,
      message: 'Perfil actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar perfil'
    });
  }
});

export default router;