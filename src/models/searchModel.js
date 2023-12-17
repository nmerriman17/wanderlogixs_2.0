const { pool } = require('../config/db');

const searchAllTables = async (searchTerm) => {
    try {
        const query = `
            SELECT * FROM trips WHERE name LIKE $1
            UNION
            SELECT * FROM expenses WHERE description LIKE $1
            UNION
            SELECT * FROM itinerary 
            WHERE eventName LIKE $1 OR 
                  location LIKE $1 OR
                  description LIKE $1 OR
                  notification LIKE $1
            UNION
            SELECT * FROM media WHERE title LIKE $1
        `;
        const values = [`%${searchTerm}%`];

        const result = await pool.query(query, values);
        return result.rows;
    } catch (err) {
        console.error('Error executing search query:', err);
        throw err;
    }
};

module.exports = {
    searchAllTables
};
