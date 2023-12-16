const pool = require('../config/db'); 

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
        'INSERT INTO itinerary (eventName, location, startDate, endDate, startTime, endTime, description, notification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [eventName, location, startDate, endDate, startTime, endTime, description, notification]
    );
    return result.rows[0];
};

const updateItinerary = async (event_id, itineraryData) => {
    const { eventName, location, startDate, endDate, startTime, endTime, description, notification } = itineraryData;
    const result = await pool.query(
        'UPDATE itinerary SET eventName = $1, location = $2, startDate = $3, endDate = $4, startTime = $5, endTime = $6, description = $7, notification = $8 WHERE id = $9 RETURNING *',
        [eventName, location, startDate, endDate, startTime, endTime, description, notification, event_id]
    );
    return result.rows[0];
};

const deleteItinerary = async (event_id) => {
    // Optionally fetch the itinerary before deleting
    const itinerary = await pool.query('SELECT * FROM itinerary WHERE id = $1', [event_id]);
    await pool.query('DELETE FROM itinerary WHERE id = $1', [event_id]);
    return itinerary.rows[0]; 
};

module.exports = {
    getAllItineraries,
    getItineraryById,
    addItinerary,
    updateItinerary,
    deleteItinerary
};
