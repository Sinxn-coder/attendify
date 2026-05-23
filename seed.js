import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.jlsatdbcffbxxbijqyya:h,8rBCJTWbDdAX_@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
});

async function seed() {
  await client.connect();
  
  await client.query(`
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone_number TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
  
  const insertQuery = `
    INSERT INTO students (name, phone_number, password) VALUES 
    ('jasim', '7025060582', 'jasim@12'),
    ('jifri', '9946052347', 'jifri@12'),
    ('sinan', '9846170136', 'sinan@12')
    ON CONFLICT (phone_number) DO UPDATE SET password = EXCLUDED.password, name = EXCLUDED.name;
  `;
  
  await client.query(insertQuery);
  console.log("Database seeded successfully!");
  
  await client.end();
}

seed().catch(err => {
  console.error("Error seeding DB:", err);
  process.exit(1);
});
