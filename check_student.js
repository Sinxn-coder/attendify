import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.jlsatdbcffbxxbijqyya:h,8rBCJTWbDdAX_@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
});

async function run() {
  await client.connect();
  const res = await client.query(`SELECT id, name, phone_number FROM students LIMIT 5;`);
  console.log("Students:", res.rows);
  await client.end();
}

run().catch(console.error);
