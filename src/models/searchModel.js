const pool = require('../config/db'); 

const performSearch = async (searchTerm) => {
    try {
        const query = `
            SELECT * FROM trips WHERE destination ILIKE $1 OR notes ILIKE $1
            UNION ALL
            SELECT * FROM itinerary WHERE event_name ILIKE $1 OR location ILIKE $1
            UNION ALL
            SELECT * FROM media WHERE tripname ILIKE $1 OR tags ILIKE $1 OR notes ILIKE $1;
        `;

        const result = await pool.query(query, [`%${searchTerm}%`]);
        return result.rows;
    } catch (error) {
        console.error('Error in performSearch:', error);
        throw error;
    }
};

module.exports = { performSearch };
