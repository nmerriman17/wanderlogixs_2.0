const { pool } = require('../config/db');

const searchAllTables = async (searchTerm) => {
    try {
        const query = `
            SELECT * FROM trips WHERE LOWER(destination) LIKE LOWER($1)
            UNION ALL
            SELECT * FROM expenses WHERE LOWER(description) LIKE LOWER($1)
            UNION ALL
            SELECT * FROM itinerary WHERE LOWER(eventName) LIKE LOWER($1) OR LOWER(location) LIKE LOWER($1)
            UNION ALL
            SELECT * FROM media WHERE LOWER(tags) LIKE LOWER($1) OR LOWER(notes) LIKE LOWER($1);
        `;
        const values = [`%${searchTerm}%`];
        const result = await pool.query(query, values);
        return result.rows;
    } catch (err) {
        console.error('Error in searchAllTables:', err);
        throw err;
    }
};

module.exports = { searchAllTables };
