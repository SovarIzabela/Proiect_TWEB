

const prisma = require('../db/prisma');

// GET /api/playlists
async function getPlaylists(req, res) {
  try { //luam din BD toate playlisturile
    const playlists = await prisma.playlist.findMany({
      where : {userId: req.user.id},
      include: {//includem si videoclipurile in fiecare playlist
        videos: true, //afiseaza video++
      },
    });

    const result = playlists.map((playlist) => {//parcurgem fiecare playlist din array
      
        return{//returnam un obiect nou in care adaugam si nr de Vid
          id:playlist.id,
          name:playlist.name,
          descriere:playlist.descriere,
          createdAt:playlist.createdAt,
          userId:playlist.userId,
          videos:playlist.videos,
          videoCount:playlist.videos.length,
        };


    });

    res.status(200).json(result);//trimitem raspuns catre front
  } catch (err) {
    console.error('Error getPlaylists:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

// POST /api/playlists
async function createPlaylist(req, res) {
  try {
    const body = req.body || {}; //daca req nu are body vom returna {}
    const name = body.name;
    const descriere=body.descriere;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Please provide the playlist name!' });
    }

    if (!descriere || descriere.trim() === '') {
      return res.status(400).json({ error: 'Please provide the description!' });
    }

    const playlist = await prisma.playlist.create({//se adauga obiectul in Bd
      data: {
        name: name.trim(),
        descriere: descriere.trim(),
        userId: req.user?.id 
      },
    });

    res.status(201).json({//returnam obiectul catre frontend
      id: playlist.id,
      name: playlist.name,
      descriere: playlist.descriere,
      createdAt: playlist.createdAt,
      userId: playlist.userId,
      videos: [],
      videoCount: 0, // la început nu are videoclipuri
    });
  } catch (err) {
    console.error('Error createPlaylist:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

// PATCH /api/playlists/:id
async function updatePlaylist(req, res) {
  try {
    const id = parseInt(req.params.id, 10);//convertim in int , /:id este string, (baza 10)
    const { name, descriere } = req.body || {};

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid playlist id' });
    }

    const playlist = await prisma.playlist.findUnique({
      where :{id},
    });

    if(!playlist){
      return res.status(404).json({
        error:'Playlist not found!'
      })
    }

     console.log(
      'playlist.userId =', playlist.userId,
      'req.user.id =', req.user?.id
    );

    if(playlist.userId!==req.userId){
      return res.status(403).json({
        error:'You do not have permision to modify this playlist!'
      })

    }

    const dataToUpdate = {};//un obiect in care punem doar ce se modifica

    if (name && name.trim() !== '') {
      dataToUpdate.name = name.trim();
    }

    if (descriere && descriere.trim() !== '') {
      dataToUpdate.descriere = descriere.trim();
    }

    const updated = await prisma.playlist.update({
      where: { id },
      data: dataToUpdate,
      include:{
        videos: true,
      }
    });

    

    res.status(200).json({
      message: 'Playlist updated with success!!',
      playlist: {
        id: updated.id,
        name: updated.name,
        descriere: updated.descriere,
        createdAt: updated.createdAt,
        userId: updated.userId,
        videos: updated.videos,
        videoCount: updated.videos.length,
       
      },
    });
  } catch (err) {
    console.error('Error updatePlaylist:', err);
    if (err.code === 'P2025') {//An operation failed because it depends on one or more records that were required but not found.
           return res.status(404).json({ error: 'Playlist not found!' });
    }
    res.status(500).json({ error: 'Server error' });
  }
}

// DELETE /api/playlists/:id
async function deletePlaylist(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid playlist id' });
    }

    

    const playlist = await prisma.playlist.findUnique({
      where:{id}
    });

    if(!playlist){
      return res.status(404).json({ error: 'Playlist not found!' });
    }

    if(playlist.userId!==req.user.id){
      return res.status(403).json({ error: 'You do not have persission to delete this playlist' });
    }

    await prisma.playlist.delete({
      where: { id },
    });

    res.json({ message: 'Playlist deleted with succes' });
  } catch (err) {
    console.error('Error deletePlaylist:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Playlist not found!' });
    }
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  getPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};
