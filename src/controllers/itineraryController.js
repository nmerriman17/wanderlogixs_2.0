const itineraryModel = require('../models/itineraryModel.js');

const getItineraries = async (req, res) => {
    try {
        const itineraries = await itineraryModel.getAllItineraries();
        res.json(itineraries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getItineraryById = async (req, res) => {
    try {
        const itinerary = await itineraryModel.getItineraryById(req.params.id);
        if (!itinerary) {
            return res.status(404).send('Itinerary not found');
        }
        res.json(itinerary);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createItinerary = async (req, res) => {
    try {
        const newItinerary = await itineraryModel.addItinerary(req.body);
        res.status(201).json(newItinerary);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateItinerary = async (req, res) => {
    try {
        const updatedItinerary = await itineraryModel.updateItinerary(req.params.id, req.body);
        if (!updatedItinerary) {
            return res.status(404).send('Itinerary not found');
        }
        res.json(updatedItinerary);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteItinerary = async (req, res) => {
    try {
        const deletedItinerary = await itineraryModel.deleteItinerary(req.params.id);
        if (!deletedItinerary) {
            return res.status(404).send('Itinerary not found');
        }
        res.json(deletedItinerary);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getItineraries,
    getItineraryById,
    createItinerary,
    updateItinerary,
    deleteItinerary
};

