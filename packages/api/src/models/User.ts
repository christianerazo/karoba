import { pool } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

// Helper function para parsear interests de manera segura
const parseInterests = (interests: any): string[] => {
  try {
    if (!interests) return [];
    if (typeof interests === 'string') {
      return JSON.parse(interests);
    }
    if (Array.isArray(interests)) {
      return interests;
    }
    return [];
  } catch (error) {
    console.warn('Error parsing interests, using empty array:', error);
    return [];
  }
};

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate?: string;
  interests: string[];
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate?: string;
  interests?: string[];
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: string;
  interests?: string[];
  emailVerified?: boolean;
  isActive?: boolean;
}

export class UserModel {
  
  // Crear nuevo usuario
  static async create(userData: CreateUserData): Promise<User> {
    const id = uuidv4();
    const interests = JSON.stringify(userData.interests || []);
    
    const query = `
      INSERT INTO users (
        id, email, password, first_name, last_name, phone, 
        birth_date, interests, is_active, email_verified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, TRUE, FALSE)
    `;
    
    const values = [
      id,
      userData.email.toLowerCase().trim(),
      userData.password,
      userData.firstName.trim(),
      userData.lastName.trim(),
      userData.phone.trim(),
      userData.birthDate || null,
      interests
    ];
    
    await pool.execute<ResultSetHeader>(query, values);
    
    const user = await this.findById(id);
    if (!user) {
      throw new Error('Error creando usuario');
    }
    
    return user;
  }
  
  // Buscar usuario por ID
  static async findById(id: string): Promise<User | null> {
    const query = `
      SELECT 
        id, email, password, first_name as firstName, last_name as lastName,
        phone, birth_date as birthDate, interests, is_active as isActive,
        email_verified as emailVerified, created_at as createdAt,
        updated_at as updatedAt, last_login as lastLogin
      FROM users 
      WHERE id = ? AND is_active = TRUE
    `;
    
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    
    if (rows.length === 0) {
      return null;
    }
    
    const user = rows[0] as any;
    user.interests = parseInterests(user.interests);
    
    return user;
  }
  
  // Buscar usuario por email
  static async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT 
        id, email, password, first_name as firstName, last_name as lastName,
        phone, birth_date as birthDate, interests, is_active as isActive,
        email_verified as emailVerified, created_at as createdAt,
        updated_at as updatedAt, last_login as lastLogin
      FROM users 
      WHERE email = ? AND is_active = TRUE
    `;
    
    const [rows] = await pool.execute<RowDataPacket[]>(query, [email.toLowerCase()]);
    
    if (rows.length === 0) {
      return null;
    }
    
    const user = rows[0] as any;
    user.interests = parseInterests(user.interests);
    
    return user;
  }
  
  // Actualizar usuario
  static async update(id: string, userData: UpdateUserData): Promise<User | null> {
    const updates: string[] = [];
    const values: any[] = [];
    
    if (userData.firstName !== undefined) {
      updates.push('first_name = ?');
      values.push(userData.firstName.trim());
    }
    
    if (userData.lastName !== undefined) {
      updates.push('last_name = ?');
      values.push(userData.lastName.trim());
    }
    
    if (userData.phone !== undefined) {
      updates.push('phone = ?');
      values.push(userData.phone.trim());
    }
    
    if (userData.birthDate !== undefined) {
      updates.push('birth_date = ?');
      values.push(userData.birthDate || null);
    }
    
    if (userData.interests !== undefined) {
      updates.push('interests = ?');
      values.push(JSON.stringify(userData.interests));
    }
    
    if (userData.emailVerified !== undefined) {
      updates.push('email_verified = ?');
      values.push(userData.emailVerified);
    }
    
    if (userData.isActive !== undefined) {
      updates.push('is_active = ?');
      values.push(userData.isActive);
    }
    
    if (updates.length === 0) {
      return this.findById(id);
    }
    
    values.push(id);
    
    const query = `
      UPDATE users 
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    await pool.execute<ResultSetHeader>(query, values);
    
    return this.findById(id);
  }
  
  // Actualizar último login
  static async updateLastLogin(id: string): Promise<void> {
    const query = `
      UPDATE users 
      SET last_login = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;
    
    await pool.execute<ResultSetHeader>(query, [id]);
  }
  
  // Cambiar contraseña
  static async updatePassword(id: string, hashedPassword: string): Promise<void> {
    const query = `
      UPDATE users 
      SET password = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    await pool.execute<ResultSetHeader>(query, [hashedPassword, id]);
  }
  
  // Desactivar usuario (soft delete)
  static async deactivate(id: string): Promise<void> {
    const query = `
      UPDATE users 
      SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    await pool.execute<ResultSetHeader>(query, [id]);
  }
  
  // Obtener todos los usuarios (para admin)
  static async findAll(limit: number = 50, offset: number = 0): Promise<User[]> {
    const query = `
      SELECT 
        id, email, first_name as firstName, last_name as lastName,
        phone, birth_date as birthDate, interests, is_active as isActive,
        email_verified as emailVerified, created_at as createdAt,
        updated_at as updatedAt, last_login as lastLogin
      FROM users 
      WHERE is_active = TRUE
      ORDER BY created_at DESC
    `;
    
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    
    // Apply pagination in JavaScript for now
    const startIndex = Number(offset);
    const endIndex = startIndex + Number(limit);
    const paginatedRows = rows.slice(startIndex, endIndex);
    
    return paginatedRows.map((row: any) => ({
      ...row,
      interests: parseInterests(row.interests)
    }));
  }
  
  // Contar usuarios activos
  static async count(): Promise<number> {
    const query = 'SELECT COUNT(*) as total FROM users WHERE is_active = TRUE';
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows[0].total;
  }
  
  // Obtener todos los usuarios incluyendo inactivos (para admin)
  static async findAllIncludingInactive(limit: number = 50, offset: number = 0): Promise<User[]> {
    const query = `
      SELECT 
        id, email, first_name as firstName, last_name as lastName,
        phone, birth_date as birthDate, interests, is_active as isActive,
        email_verified as emailVerified, created_at as createdAt,
        updated_at as updatedAt, last_login as lastLogin
      FROM users 
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const [rows] = await pool.execute<RowDataPacket[]>(query, [Number(limit), Number(offset)]);
    
    return rows.map((row: any) => ({
      ...row,
      interests: parseInterests(row.interests)
    }));
  }
  
  // Contar todos los usuarios incluyendo inactivos
  static async countAll(): Promise<number> {
    const query = 'SELECT COUNT(*) as total FROM users';
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows[0].total;
  }
}