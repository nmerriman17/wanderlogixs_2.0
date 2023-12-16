const express = require('express');
const multer = require('multer');
const { body } = require('express-validator');
const MediaController = require('../controllers/mediaController.js');


const router = express.Router();

// Setup multer for file upload with a limit of 100MB
const upload = multer({ dest: 'uploads/', limits: { fileSize: 100000000 } });

// Routes definition
router.get('/', MediaController.getAllMedia);
router.get('/:id', MediaController.getMediaById);

router.post(
  '/',
  upload.single('media'),
  [body('tripname').notEmpty(), body('tags').optional().isArray()],
  MediaController.uploadMedia
);

router.delete('/:id', MediaController.deleteMedia);

module.exports = router;
