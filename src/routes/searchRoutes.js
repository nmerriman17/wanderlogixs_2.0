const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Correctly reference handleSearch from searchController
router.get('/search', searchController.handleSearch);

module.exports = router;
