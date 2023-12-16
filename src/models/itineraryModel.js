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

const updateItinerary = async (event_id, itineraryData) => {
    const { eventName, location, startDate, endDate, startTime, endTime, description, notification } = itineraryData;
    const result = await pool.query(
        'UPDATE itinerary SET event_name = $1, location = $2, start_date = $3, end_date = $4, start_time = $5, end_time = $6, description = $7, notification = $8 WHERE event_id = $9 RETURNING *',
        [eventName, location, startDate, endDate, startTime, endTime, description, notification, event_id]
    );
    return result.rows[0];
};

const deleteItinerary = async (event_id) => {
    const itinerary = await pool.query('SELECT * FROM itinerary WHERE event_id = $1', [event_id]);
    await pool.query('DELETE FROM itinerary WHERE event_id = $1', [event_id]);
    return itinerary.rows[0]; 
};

module.exports = {
    getAllItineraries,
    getItineraryById,
    addItinerary,
    updateItinerary,
    deleteItinerary
};
