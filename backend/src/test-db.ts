import pool from './config/database';

async function testConnection() {
  try {
    const result = await pool.query('SELECT 1 as test');
    console.log('✅ Conexión exitosa:', result.rows);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    process.exit(1);
  }
}

testConnection();
