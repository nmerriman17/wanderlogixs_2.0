const searchModel = require('../models/searchModel.js');

const handleSearch = async (req, res) => {
    const searchTerm = req.query.term;
    try {
        const results = await searchModel.performSearch(searchTerm);
        res.json(results);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

module.exports = { handleSearch };
