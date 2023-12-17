const { pool } = require('../config/db');

const getAllItineraries = async () => {
    const result = await pool.query('SELECT * FROM public.itinerary');
    return result.rows;
};

const getItineraryById = async (event_id) => {
    const result = await pool.query('SELECT * FROM public.itinerary WHERE event_id = $1', [event_id]);
    return result.rows[0];
};

const addItinerary = async (itineraryData) => {
    const {
        eventName,
        location,
        startDate,
        endDate,
        startTime,
        endTime,
        description,
        notification
    } = itineraryData;
    
    const result = await pool.query(
        'INSERT INTO public.itinerary (eventName, location, startDate, endDate, startTime, endTime, description, notification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [eventName, location, startDate, endDate, startTime, endTime, description, notification]
    );

    return result.rows[0];
};

const deleteItinerary = async (event_id) => {
    const result = await pool.query('DELETE FROM public.itinerary WHERE event_id = $1 RETURNING *', [event_id]);
    return result.rows[0];
};

module.exports = {
    getAllItineraries,
    getItineraryById,
    addItinerary,
    deleteItinerary
};
