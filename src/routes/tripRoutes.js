const express = require('express');
const multer = require('multer'); // Add this import
const router = express.Router();
const tripController = require('../controllers/tripController');

const upload = multer({ storage: multer.memoryStorage() }); // Setup multer for in-memory file storage

router.get('/', tripController.getTrips);
router.get('/:id', tripController.getTrip);
router.post('/', upload.single('file'), tripController.createTrip);
router.put('/:id', upload.single('file'), tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);

module.exports = router;
