const { Pool } = require('pg');
require('dotenv').config();

let poolConfig;

if (process.env.NODE_ENV === 'production') {
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    };
} else {
    // Local database configuration
    poolConfig = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    };
}

const pool = new Pool(poolConfig);

module.exports = { pool };
