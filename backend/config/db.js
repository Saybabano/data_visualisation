const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('Environment variable DATABASE_URL is not set.');
}

const connectionString = process.env.DATABASE_URL;

// Disable SSL when using a local database
const pool = new Pool({
  connectionString,
  ssl: process.env.DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false }
});

// Event listener for successful connection
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database', err.stack);
    throw err;
  }
  console.log('Connected to PostgreSQL database');
});

module.exports = pool;
