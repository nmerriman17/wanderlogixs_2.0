const express = require('express');
const multer = require('multer');
const { body } = require('express-validator');
const mediaController = require('../controllers/mediaController');


const router = express.Router();

// Setup multer for file upload with a limit of 100MB
const upload = multer({ dest: 'uploads/', limits: { fileSize: 100000000 } });

// Routes definition
router.get('/', mediaController.getAllMedia);
router.get('/:id', mediaController.getMediaById);

router.post(
  '/',
  upload.single('media'),
  [body('tripname').notEmpty(), body('tags').optional().isArray()],
  mediaController.uploadMedia
);

router.delete('/:id', mediaController.deleteMedia);

module.exports = router;
