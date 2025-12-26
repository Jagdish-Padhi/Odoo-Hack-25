import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

if (!process.env.DB_URL) {
    console.error('DB_URL environment variable is not set!');
}

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;