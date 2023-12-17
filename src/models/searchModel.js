const { pool } = require('../config/db');

const searchAllTables = async (searchTerm) => {
    try {
        const query = `
            SELECT * FROM itinerary
            WHERE eventName LIKE $1 OR
                  location LIKE $1 OR
                  description LIKE $1 OR
                  notification LIKE $1
            -- Add more tables and columns as needed
        `;
        const values = [`%${searchTerm}%`];
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    searchAllTables
};
