import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  country: string;
  city: string;
  interests: string[];
  newsletter: boolean;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

const ensureDataDir = () => {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const getUsers = (): User[] => {
  ensureDataDir();
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

const saveUsers = (users: User[]) => {
  ensureDataDir();
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
    throw new Error('Error saving user data');
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        // Obtener todos los usuarios
        const users = getUsers();
        // Remover contraseñas de la respuesta
        const safeUsers = users.map(({ password, ...user }) => user);
        res.status(200).json(safeUsers);
        break;

      case 'DELETE':
        // Eliminar usuario por ID
        const { id } = req.query;
        if (!id || typeof id !== 'string') {
          return res.status(400).json({ message: 'ID de usuario requerido' });
        }

        const allUsers = getUsers();
        const userIndex = allUsers.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        allUsers.splice(userIndex, 1);
        saveUsers(allUsers);
        
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        break;

      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}