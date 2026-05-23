import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.jlsatdbcffbxxbijqyya:h,8rBCJTWbDdAX_@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
});

async function run() {
  await client.connect();
  await client.query(`
    ALTER TABLE sessions ADD COLUMN IF NOT EXISTS duration_minutes INTEGER DEFAULT 60;
  `);
  console.log("Column duration_minutes added to sessions table.");
  await client.end();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
