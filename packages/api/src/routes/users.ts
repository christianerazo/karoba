import { Router } from 'express';
import { ApiResponse, User } from '@tourism-app/shared';

const router = Router();

// GET /api/users/profile
router.get('/profile', async (req, res) => {
  try {
    // TODO: Obtener perfil del usuario autenticado
    
    const mockUser: User = {
      id: 'user-1',
      email: 'usuario@example.com',
      name: 'Usuario Demo',
      avatar: 'https://example.com/avatar.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const response: ApiResponse<User> = {
      success: true,
      data: mockUser
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener perfil'
    });
  }
});

// PUT /api/users/profile
router.put('/profile', async (req, res) => {
  try {
    const { name, avatar } = req.body;
    
    // TODO: Actualizar perfil del usuario
    
    const updatedUser: User = {
      id: 'user-1',
      email: 'usuario@example.com',
      name,
      avatar,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const response: ApiResponse<User> = {
      success: true,
      data: updatedUser,
      message: 'Perfil actualizado exitosamente'
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar perfil'
    });
  }
});

export default router;