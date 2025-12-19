const express = require('express');
const {
  getVideosByPlaylist,
  addVideoToPlaylist,
  updateVideo,
  deleteVideo,
} = require('../controllers/videoController');

const protect = require('../middleware/protect')

const router = express.Router();

// Listeaza vid dintr-un playlist
router.get('/:playlistId', protect, getVideosByPlaylist);

// Adauga video in playlist
router.post('/:playlistId', protect, addVideoToPlaylist);

// Update video dupa id
router.patch('/:id', protect, updateVideo);  

// Sterge video după id
router.delete('/:id', protect, deleteVideo);

module.exports = router;