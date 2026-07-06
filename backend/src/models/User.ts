import pool from '../config/database';

export interface User {
  id: number;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  address?: string;
  role: 'CLIENTE' | 'ADMIN';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const UserModel = {
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  },

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'role' | 'isActive'>): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (email, password, "fullName", phone, address)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userData.email, userData.password, userData.fullName, userData.phone || null, userData.address || null]
    );
    return result.rows[0];
  }
};
