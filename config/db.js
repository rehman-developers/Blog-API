const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});

pool.on('error', (err) => {
  console.error('MySQL Pool Error:', err);
});

console.log('MySQL Pool Created!');

module.exports = pool;