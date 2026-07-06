import request from 'supertest';
import app from '../server';

describe('Autenticación', () => {
  describe('POST /api/auth/register', () => {
    it('debería registrar un nuevo usuario', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@test.com',
          password: '12345678',
          fullName: 'Usuario Test'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
    });

    it('debería fallar si el email ya existe', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@test.com',
          password: '12345678',
          fullName: 'Usuario Test'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('El correo ya está registrado');
    });
  });

  describe('POST /api/auth/login', () => {
    it('debería iniciar sesión correctamente', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: '12345678'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
    });

    it('debería fallar con credenciales incorrectas', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'wrongpassword'
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Credenciales incorrectas');
    });
  });
});
