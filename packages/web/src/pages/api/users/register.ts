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

interface RegisterRequest {
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
}

// Simulamos una base de datos con un archivo JSON
const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

// Función para asegurar que el directorio existe
const ensureDataDir = () => {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Función para leer usuarios
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

// Función para guardar usuarios
const saveUsers = (users: User[]) => {
  ensureDataDir();
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
    throw new Error('Error saving user data');
  }
};

// Función para generar ID único
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Función para validar email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      birthDate,
      country,
      city,
      interests,
      newsletter
    }: RegisterRequest = req.body;

    // Validaciones
    if (!firstName || !lastName || !email || !phone || !password || !birthDate || !country || !city) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'El email no es válido' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Verificar si el usuario ya existe
    const users = getUsers();
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe una cuenta con este email' });
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear nuevo usuario
    const newUser: User = {
      id: generateId(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password: hashedPassword,
      birthDate,
      country: country.trim(),
      city: city.trim(),
      interests: interests || [],
      newsletter: newsletter || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    };

    // Guardar usuario
    users.push(newUser);
    saveUsers(users);

    // Respuesta exitosa (sin incluir la contraseña)
    const { password: _, ...userResponse } = newUser;
    
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}