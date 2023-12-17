const { pool } = require('../config/db');

const getAllItineraries = async () => {
    const result = await pool.query('SELECT * FROM itinerary');
    return result.rows;
};

const getItineraryById = async (event_id) => {
    const result = await pool.query('SELECT * FROM itinerary WHERE event_id = $1', [event_id]);
    return result.rows[0];
};

const addItinerary = async (itineraryData) => {
    const { eventName, location, startDate, endDate, startTime, endTime, description, notification } = itineraryData;
    const result = await pool.query(
        'INSERT INTO itinerary (event_name, location, start_date, end_date, start_time, end_time, description, notification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [eventName, location, startDate, endDate, startTime, endTime, description, notification]
    );
    return result.rows[0];
};

const deleteItinerary = async (event_id) => {
    const result = await pool.query('DELETE FROM itinerary WHERE event_id = $1 RETURNING *', [event_id]);
    return result.rows[0];
};

module.exports = {
    getAllItineraries,
    getItineraryById,
    addItinerary,
    deleteItinerary
};
