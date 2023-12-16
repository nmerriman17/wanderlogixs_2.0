const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController.js');

// Get all itineraries
router.get('/', itineraryController.getItineraries);

// Get a single itinerary by ID
router.get('/:id', itineraryController.getItineraryById);

// Create a new itinerary
router.post('/', itineraryController.createItinerary);

// Update an itinerary
router.put('/:id', itineraryController.updateItinerary);

// Delete an itinerary
router.delete('/:id', itineraryController.deleteItinerary);

module.exports = router;
