const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route for searching itineraries
router.get('/', searchController.search);

module.exports = router;
