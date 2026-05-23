import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.jlsatdbcffbxxbijqyya:h,8rBCJTWbDdAX_@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
});

async function run() {
  await client.connect();
  
  // Check if attendance table exists
  try {
    const res = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name='attendance';`);
    if (res.rows.length === 0) {
      console.log("Attendance table DOES NOT exist. Creating it now...");
      await client.query(`
        CREATE TABLE attendance (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
          student_name TEXT NOT NULL,
          verified BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ DEFAULT now(),
          UNIQUE(session_id, student_name)
        );
      `);
      console.log("Attendance table created successfully!");
    } else {
      console.log("Attendance table already exists.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
  
  await client.end();
}

run().catch(console.error);
