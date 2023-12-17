const searchModel = require('../models/searchModel');

const searchAllData = async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const results = await searchModel.searchAllTables(searchTerm);
        res.json(results);
    } catch (error) {
        console.error('Error in searchAllData:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { searchAllData };
