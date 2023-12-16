const ItineraryModel = require('../models/itineraryModel.js');

const getItineraries = async (req, res) => {
    try {
        const itineraries = await ItineraryModel.getAllItineraries();
        res.json(itineraries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getItineraryById = async (req, res) => {
    try {
        const itinerary = await ItineraryModel.getItineraryById(req.params.id);
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
        const newItinerary = await ItineraryModel.addItinerary(req.body);
        res.status(201).json(newItinerary);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateItinerary = async (req, res) => {
    try {
        const updatedItinerary = await ItineraryModel.updateItinerary(req.params.id, req.body);
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
        const deletedItinerary = await ItineraryModel.deleteItinerary(req.params.id);
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
