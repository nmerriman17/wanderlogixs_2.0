const pool = require('../config/db'); 

const getAllItineraries = async () => {
    const result = await pool.query('SELECT * FROM itinerary');
    return result.rows;
};

const getItineraryById = async (itineraryId) => {
    const result = await pool.query('SELECT * FROM itinerary WHERE id = $1', [itineraryId]);
    return result.rows[0];
};

const addItinerary = async (itineraryData) => {
    const { eventName, location, startDate, startTime, endDate, endTime, description, notification } = itineraryData;
    const startDateTime = `${startDate} ${startTime}`;
    const endDateTime = `${endDate} ${endTime}`;
    const result = await pool.query(
        'INSERT INTO itinerary (event_name, location, start_datetime, end_datetime, description, notification) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [eventName, location, startDateTime, endDateTime, description, notification]
    );
    return result.rows[0];
};

const updateItinerary = async (itineraryId, itineraryData) => {
    const { eventName, location, startDate, startTime, endDate, endTime, description, notification } = itineraryData;
    const startDateTime = `${startDate} ${startTime}`;
    const endDateTime = `${endDate} ${endTime}`;
    const result = await pool.query(
        'UPDATE itinerary SET event_name = $1, location = $2, start_datetime = $3, end_datetime = $4, description = $5, notification = $6 WHERE id = $7 RETURNING *',
        [eventName, location, startDateTime, endDateTime, description, notification, itineraryId]
    );
    return result.rows[0];
};

const deleteItinerary = async (itineraryId) => {
    const result = await pool.query('DELETE FROM itinerary WHERE id = $1 RETURNING *', [itineraryId]);
    return result.rows[0];
};

module.exports = {
    getAllItineraries,
    getItineraryById,
    addItinerary,
    updateItinerary,
    deleteItinerary
};
