const prisma = require('../db/prisma');

// GET /api/videos/:playlistId
async function getVideosByPlaylist(req, res) {//returneaza toate vid din playlist
  try{
  const playlistId = parseInt(req.params.playlistId, 10);

  if (Number.isNaN(playlistId)) {
    return res.status(400).json({ error: 'Invalid playlistId' });
  }

  const video = await prisma.video.findMany({

    where:{playlistId:playlistId},
    orderBy:{id:'asc'}

  })
  return res.status(200).json(video);
}

catch(err){

  console.error('Error getVideoByPlaylist', err);
   res.status(500).json({ error: 'Server error' });

}}

// POST /api/videos/:playlistId
async function addVideoToPlaylist(req, res) {

  try{
    const playlistId = parseInt(req.params.playlistId, 10);
    const { title, url } = req.body || {};

    if (Number.isNaN(playlistId)) {
    return res.status(400).json({ error: 'Invalid playlistId' });
    }

   if (!title || !url) {
    return res
      .status(400)
      .json({ error: 'Both title and url are required' });
   }

   const playlist = await prisma.playlist.findUnique({
    where: {id:playlistId},
   });

   if(!playlist){
     return res
      .status(404)
      .json({ error: 'Playlist not found!!' });
   }

   if(playlist.userId!==req.user.id){
      return res
      .status(404)
      .json({ error: 'You do not have permission to modify the playlist' });
   }

    const vidNou = await prisma.video.create({
    data:{
      title:title.trim(),
      url:url.trim(),
      playlistId:playlistId,
      addedAt:new Date(),

    }

    })
    return res.status(201).json(vidNou);
  }catch(err){
     console.error('Error getVideoByPlaylist', err);
   res.status(500).json({ error: 'Server error' });

  }
}

// PATCH /api/videos/:id
async function updateVideo(req, res) {

  try{
  const id = parseInt(req.params.id, 10);
  const { title, url } = req.body || {};

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid video id' });
  }

  const dataToUpdate ={}
  
    if (title && title.trim() !== '') {
    dataToUpdate.title = title.trim();
   }

    if (url && url.trim() !== '') {
    dataToUpdate.url = url.trim();
   }

    const vidUpdated = await prisma.video.update({
      where: {id},
      data: dataToUpdate,
      include:{
      playlist:true
     }

    });
 
    return res.status(200).json({
    message: 'Video updated successfully',
    video:vidUpdated,
   });

  }catch(err){
   console.error('Error getVideoByPlaylist', err);
   res.status(500).json({ error: 'Server error' });
    
  }
}

// DELETE /api/videos/:id
async function deleteVideo(req, res) {

  try{
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid video id' });
  }

    await prisma.video.delete({
      where: { id },
    });

   
  return res.json({ message: 'Video deleted successfully' });
  }catch(err){
     console.error('Error getVideoByPlaylist', err);
      res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  getVideosByPlaylist,
  addVideoToPlaylist,
  updateVideo,
  deleteVideo,
};
