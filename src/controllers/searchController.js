const searchModel = require('../models/searchModel');

const search = async (req, res) => {
    try {
        const term = req.query.term;
        if (!term) {
            return res.status(400).json({ message: "Search term is required" });
        }
        const results = await searchModel.searchItinerary(term);
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    search
};
