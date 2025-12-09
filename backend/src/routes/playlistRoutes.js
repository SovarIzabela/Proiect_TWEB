const express = require('express');
const protect = require('../middleware/protect')
const {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
  updatePlaylist,
} = require('../controllers/playlistController');

const router = express.Router();

// /api/playlists
router
  .route('/')
  .get(protect,getPlaylists)     // GET  /api/playlists
  .post(protect,createPlaylist); // POST /api/playlists

// /api/playlists/:id
router
  .route('/:id')
  .patch(protect,updatePlaylist) // PATCH  /api/playlists/1
  .delete(protect,deletePlaylist); // DELETE /api/playlists/1

module.exports = router;