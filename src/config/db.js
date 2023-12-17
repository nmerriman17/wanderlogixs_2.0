const { Pool } = require('pg');
require('dotenv').config();

const poolConfig = process.env.NODE_ENV === 'production' ? {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
} : {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
};

const pool = new Pool(poolConfig);

module.exports = { pool };
