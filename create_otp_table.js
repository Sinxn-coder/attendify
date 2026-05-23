import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.jlsatdbcffbxxbijqyya:h,8rBCJTWbDdAX_@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
});

async function run() {
  await client.connect();
  
  // Create otp_requests_log table
  await client.query(`
    CREATE TABLE IF NOT EXISTS otp_requests_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      phone_number TEXT NOT NULL,
      requested_at TIMESTAMP DEFAULT now()
    );
  `);
  console.log("Table otp_requests_log created successfully.");
  
  // Also make sure students table exists with phone_number
  // The user said there is a students table with a phone number column. Let's just do a small check or create if not exists
  await client.query(`
    CREATE TABLE IF NOT EXISTS students (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      phone_number TEXT UNIQUE NOT NULL
    );
  `);
  console.log("Table students checked/created successfully.");

  // Insert a dummy student for testing
  await client.query(`
    INSERT INTO students (name, phone_number) 
    VALUES ('Test Student', '919876543210') 
    ON CONFLICT (phone_number) DO NOTHING;
  `);

  await client.end();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
