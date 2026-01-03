import { Router } from 'express';

interface Review {
  id: string;
  userId: string;
  destinationId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const router = Router();

// GET /api/reviews/destination/:destinationId
router.get('/destination/:destinationId', async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    // TODO: Obtener reseñas del destino
    
    const mockReviews: Review[] = [
      {
        id: '1',
        userId: 'user-1',
        destinationId,
        rating: 5,
        comment: 'Excelente lugar, muy recomendado!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    const response: ApiResponse<Review[]> = {
      success: true,
      data: mockReviews
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener reseñas'
    });
  }
});

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { destinationId, rating, comment, images } = req.body;
    
    // TODO: Crear nueva reseña
    // - Verificar que el usuario haya hecho una reserva
    // - Validar datos de entrada
    // - Crear reseña en base de datos
    
    const newReview: Review = {
      id: 'new-review-id',
      userId: 'current-user-id',
      destinationId,
      rating,
      comment,
      images,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const response: ApiResponse<Review> = {
      success: true,
      data: newReview,
      message: 'Reseña creada exitosamente'
    };
    
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear reseña'
    });
  }
});

export default router;