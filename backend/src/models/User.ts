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
  termsAccepted: boolean;        // ✅ NUEVO: Si aceptó términos
  termsAcceptedAt: Date | null;  // ✅ NUEVO: Cuándo aceptó
  termsVersion: string | null;   // ✅ NUEVO: Versión de términos
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

  async findById(id: number): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  async create(userData: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    address?: string;
  }): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (
        email, 
        password, 
        "fullName", 
        phone, 
        address, 
        "termsAccepted", 
        "termsAcceptedAt", 
        "termsVersion"
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        userData.email,
        userData.password,
        userData.fullName,
        userData.phone || null,
        userData.address || null,
        true,                    // termsAccepted: true por defecto
        new Date(),              // termsAcceptedAt: ahora
        '1.0.0'                  // termsVersion: versión inicial
      ]
    );
    return result.rows[0];
  },

  async update(id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User | null> {
    const fields = Object.keys(data)
      .map((key, i) => `"${key}" = $${i + 2}`)
      .join(', ');

    if (!fields) return null;

    const result = await pool.query(
      `UPDATE users SET ${fields}, "updatedAt" = NOW() WHERE id = $1 RETURNING *`,
      [id, ...Object.values(data)]
    );
    return result.rows[0] || null;
  },

  async updateTermsAcceptance(id: number, version: string = '1.0.0'): Promise<User | null> {
    const result = await pool.query(
      `UPDATE users 
       SET "termsAccepted" = true, 
           "termsAcceptedAt" = NOW(), 
           "termsVersion" = $2,
           "updatedAt" = NOW()
       WHERE id = $1 
       RETURNING *`,
      [id, version]
    );
    return result.rows[0] || null;
  }
};