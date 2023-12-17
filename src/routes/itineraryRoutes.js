const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

router.get('/', itineraryController.getItineraries);
router.get('/:event_id', itineraryController.getItineraryById);
router.post('/', itineraryController.createItinerary);
router.delete('/:event_id', itineraryController.deleteItinerary);

module.exports = router;
