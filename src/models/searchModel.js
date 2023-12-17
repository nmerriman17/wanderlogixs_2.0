const { pool } = require('../config/db');

const searchItinerary = async (term) => {
    const query = `
        SELECT * FROM itinerary
        WHERE 
            eventName ILIKE $1 OR 
            location ILIKE $1 OR 
            description ILIKE $1 OR 
            notification ILIKE $1;
    `;
    const values = [`%${term}%`];
    const result = await pool.query(query, values);
    return result.rows;
};

module.exports = {
    searchItinerary
};
