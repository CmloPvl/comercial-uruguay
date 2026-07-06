const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres.xpyzoarbcjcxjntlybde:Diosserie42026@aws-1-us-east-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    const result = await pool.query('SELECT 1 as test');
    console.log('✅ Conexión exitosa:', result.rows);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

test();