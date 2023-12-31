const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

// Get all itineraries
router.get('/', itineraryController.getItineraries);

// Get a single itinerary by event_id
router.get('/:event_id', itineraryController.getItineraryById);

// Create a new itinerary
router.post('/', itineraryController.createItinerary);

// Update an existing itinerary by event_id
router.put('/:event_id', itineraryController.updateItinerary);

// Delete an itinerary by event_id
router.delete('/:event_id', itineraryController.deleteItinerary);

module.exports = router;
