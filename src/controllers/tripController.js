const TripModel = require('../models/tripModel.js');
const { uploadFileToS3, deleteFileFromS3 } = require('../config/s3Upload.js');

exports.getTrips = async (req, res) => {
    try {
        const trips = await TripModel.getAllTrips();
        res.json(trips);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.getTrip = async (req, res) => {
    try {
        const trip = await TripModel.getTripById(req.params.id);
        trip ? res.json(trip) : res.status(404).send('Trip not found');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.createTrip = async (req, res) => {
    try {
        let fileKey;
        if (req.file) {
            const uploadResult = await uploadFileToS3(req.file);
            fileKey = uploadResult.fileKey;
        }
        const newTrip = await TripModel.createTrip({ ...req.body, file_key: fileKey });
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.updateTrip = async (req, res) => {
    try {
        let fileKey;
        if (req.file) {
            const uploadResult = await uploadFileToS3(req.file);
            fileKey = uploadResult.fileKey;

            const oldTrip = await TripModel.getTripById(req.params.id);
            if (oldTrip && oldTrip.file_key) {
                await deleteFileFromS3(oldTrip.file_key);
            }
        }

        const updatedTrip = await TripModel.updateTrip(req.params.id, { ...req.body, file_key: fileKey });
        updatedTrip ? res.json(updatedTrip) : res.status(404).send('Trip not found');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteTrip = async (req, res) => {
    try {
        const deletedTrip = await TripModel.deleteTrip(req.params.id);
        deletedTrip ? res.json(deletedTrip) : res.status(404).send('Trip not found');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};
