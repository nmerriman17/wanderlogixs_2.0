const searchModel = require('../models/searchModel');

const search = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        const results = await searchModel.searchAllTables(searchTerm);
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    search
};
