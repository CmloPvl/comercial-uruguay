import request from 'supertest';
import app from '../server';

describe('Productos', () => {
  let token: string;
  let productId: number;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: '12345678'
      });
    token = res.body.data.token;
  });

  describe('POST /api/products', () => {
    it('debería crear un nuevo producto', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Producto Test',
          description: 'Descripción del producto de prueba',
          price: 9990,
          sku: 'TEST-001',
          stock: 10
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id');
      productId = res.body.data.id;
    });

    it('debería fallar sin autenticación', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          name: 'Producto Sin Token',
          description: 'Este producto no debería crearse',
          price: 1000,
          sku: 'TEST-002',
          stock: 5
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/products', () => {
    it('debería listar todos los productos', async () => {
      const res = await request(app)
        .get('/api/products');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/products/:id', () => {
    it('debería obtener un producto por ID', async () => {
      const res = await request(app)
        .get(`/api/products/${productId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id', productId);
    });

    it('debería devolver 404 si el producto no existe', async () => {
      const res = await request(app)
        .get('/api/products/9999');

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
