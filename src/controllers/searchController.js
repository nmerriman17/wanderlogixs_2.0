const searchModel = require('../models/searchModel');

const search = async (req, res) => {
    try {
        const term = req.query.term;
        const results = await searchModel.searchAllTables(term);
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    search
};
