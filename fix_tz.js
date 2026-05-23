import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.jlsatdbcffbxxbijqyya:h,8rBCJTWbDdAX_@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
});

async function run() {
  await client.connect();
  
  await client.query(`
    ALTER TABLE sessions ALTER COLUMN created_at TYPE timestamptz USING created_at AT TIME ZONE 'UTC';
  `);
  console.log("Altered created_at to timestamptz");
  
  await client.end();
}

run().catch(console.error);
