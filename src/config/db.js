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

// Function for full-text search in the database
const searchDatabase = async (term) => {
    try {
        const query = `
            SELECT 'trips' as source, destination, startDate, endDate, purpose, notes
            FROM trips
            WHERE textsearchable_index_col @@ plainto_tsquery('english', $1)
            UNION ALL
            SELECT 'expenses', category, date, amount, description
            FROM expenses
            WHERE textsearchable_index_col @@ plainto_tsquery('english', $1)
            UNION ALL
            SELECT 'itinerary', eventName, location, startDate, endDate, description, startTime, endTime
            FROM itinerary
            WHERE textsearchable_index_col @@ plainto_tsquery('english', $1)
            UNION ALL
            SELECT 'media', media, tags, notes, tripName
            FROM media
            WHERE textsearchable_index_col @@ plainto_tsquery('english', $1);
        `;

        const result = await pool.query(query, [term]);
        return result.rows;
    } catch (err) {
        console.error('Error executing full-text search query:', err);
        throw err;
    }
};

module.exports = { pool, searchDatabase };
