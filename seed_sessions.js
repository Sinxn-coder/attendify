import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.jlsatdbcffbxxbijqyya:h,8rBCJTWbDdAX_@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
});

async function seed() {
  await client.connect();
  
  await client.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      youtube_url TEXT NOT NULL,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT now()
    );
  `);
  
  console.log("Sessions table created successfully!");
  
  await client.end();
}

seed().catch(err => {
  console.error("Error seeding DB:", err);
  process.exit(1);
});
