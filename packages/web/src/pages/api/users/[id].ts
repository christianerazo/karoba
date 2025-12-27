import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
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
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'ID de usuario requerido' });
  }

  try {
    const users = getUsers();
    const userIndex = users.findIndex(user => user.id === id);

    switch (req.method) {
      case 'GET':
        // Obtener usuario por ID
        if (userIndex === -1) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const { password, ...safeUser } = users[userIndex];
        res.status(200).json(safeUser);
        break;

      case 'PUT':
        // Actualizar usuario
        if (userIndex === -1) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const {
          firstName,
          lastName,
          email,
          phone,
          birthDate,
          country,
          city,
          interests,
          newsletter,
          password: newPassword
        } = req.body;

        // Validar email único (excepto el usuario actual)
        if (email && email !== users[userIndex].email) {
          const emailExists = users.some(user => user.id !== id && user.email.toLowerCase() === email.toLowerCase());
          if (emailExists) {
            return res.status(400).json({ message: 'Ya existe una cuenta con este email' });
          }
        }

        // Actualizar campos
        const updatedUser = { ...users[userIndex] };
        
        if (firstName) updatedUser.firstName = firstName.trim();
        if (lastName) updatedUser.lastName = lastName.trim();
        if (email) updatedUser.email = email.toLowerCase().trim();
        if (phone) updatedUser.phone = phone.trim();
        if (birthDate) updatedUser.birthDate = birthDate;
        if (country) updatedUser.country = country.trim();
        if (city) updatedUser.city = city.trim();
        if (interests) updatedUser.interests = interests;
        if (typeof newsletter === 'boolean') updatedUser.newsletter = newsletter;
        
        // Actualizar contraseña si se proporciona
        if (newPassword && newPassword.length >= 6) {
          const saltRounds = 10;
          updatedUser.password = await bcrypt.hash(newPassword, saltRounds);
        }

        updatedUser.updatedAt = new Date().toISOString();

        users[userIndex] = updatedUser;
        saveUsers(users);

        const { password: _, ...updatedUserResponse } = updatedUser;
        res.status(200).json({
          message: 'Usuario actualizado exitosamente',
          user: updatedUserResponse
        });
        break;

      case 'DELETE':
        // Eliminar usuario
        if (userIndex === -1) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        users.splice(userIndex, 1);
        saveUsers(users);
        
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