const mediaModel = require('../models/mediaModel'); 
const { uploadFileToS3, deleteFileFromS3 } = require('../config/s3Upload');

const getAllMedia = async (req, res) => {
    try {
        const mediaItems = await mediaModel.getAllMedia();
        res.json(mediaItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getMediaById = async (req, res) => {
    try {
        const mediaId = req.params.media_id;
        const mediaItem = await mediaModel.getMediaById(mediaId);
        if (!mediaItem) {
            return res.status(404).send('Media not found');
        }
        res.json(mediaItem);
    } catch (error) {
        res.status(500).send('Error retrieving media');
    }
};

const uploadMedia = async (req, res) => {
    try {
        let mediaUrl = '', fileKey = '';
        if (req.file) {
            const uploadResult = await uploadFileToS3(req.file);
            mediaUrl = uploadResult.url;
            fileKey = uploadResult.fileKey;
        }

        const { tripname, tags, notes } = req.body;
        const mediaData = { tripname, tags, notes, url: mediaUrl, fileKey };
        const newMedia = await mediaModel.addMedia(mediaData);
        res.status(201).json(newMedia);
    } catch (error) {
        res.status(500).send('Error uploading media');
    }
};

const deleteMedia = async (req, res) => {
    try {
        const mediaId = req.params.media_id;
        const mediaItem = await mediaModel.getMediaById(mediaId);
        if (mediaItem) {
            await deleteFileFromS3(mediaItem.fileKey);
            await mediaModel.deleteMedia(mediaId);
            res.send('Media deleted successfully');
        } else {
            res.status(404).send('Media not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting media');
    }
};

module.exports = {
    getAllMedia,
    getMediaById,
    uploadMedia,
    deleteMedia
};
