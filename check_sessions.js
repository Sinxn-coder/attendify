import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.jlsatdbcffbxxbijqyya:h,8rBCJTWbDdAX_@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
});

async function run() {
  await client.connect();
  const res = await client.query(`SELECT id, created_at, duration_minutes, is_active FROM sessions ORDER BY created_at DESC LIMIT 2;`);
  console.log(res.rows);
  
  const now = new Date();
  console.log("Current time (local):", now.toString());
  console.log("Current time (UTC):", now.toISOString());
  console.log("Current time (epoch):", now.getTime());
  
  if (res.rows.length > 0) {
    const s = res.rows[0];
    let dateStr = s.created_at.toISOString();
    console.log("DB Date ISO string:", dateStr);
    
    // mimic logic
    const createdTime = new Date(dateStr).getTime();
    const durationMs = (s.duration_minutes || 60) * 60 * 1000;
    console.log("createdTime epoch:", createdTime);
    console.log("Duration Ms:", durationMs);
    console.log("Is expired?", now.getTime() > createdTime + durationMs);
  }
  
  await client.end();
}

run().catch(console.error);
