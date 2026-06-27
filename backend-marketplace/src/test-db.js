const mysql = require('mysql2/promise');

async function test() {
  const url = process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL;
  console.log('URL:', url ? url.replace(/:([^:@]+)@/, ':***@') : 'NO URL');
  console.log('HOST:', process.env.MYSQLHOST || process.env.DB_HOST);
  console.log('PORT:', process.env.MYSQLPORT || process.env.DB_PORT);
  console.log('USER:', process.env.MYSQLUSER || process.env.DB_USER);
  console.log('DB:  ', process.env.MYSQLDATABASE || process.env.DB_NAME);

  try {
    if (url) {
      const conn = await mysql.createConnection(url);
      const [rows] = await conn.execute('SELECT 1 as ok');
      console.log('OK via URL:', rows);
      await conn.end();
    } else {
      const conn = await mysql.createConnection({
        host: process.env.MYSQLHOST || process.env.DB_HOST,
        port: process.env.MYSQLPORT || process.env.DB_PORT,
        user: process.env.MYSQLUSER || process.env.DB_USER,
        password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
        database: process.env.MYSQLDATABASE || process.env.DB_NAME,
      });
      const [rows] = await conn.execute('SELECT 1 as ok');
      console.log('OK via params:', rows);
      await conn.end();
    }
  } catch (e) {
    console.error('ERROR:', e.message, e.code);
  }
}

test();
