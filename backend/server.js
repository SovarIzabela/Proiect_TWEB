const express = require('express');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const playlistRoutes = require('./src/routes/playlistRoutes');
const videoRoutes = require('./src/routes/videoRoutes');

const app = express();


app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log('Hello from the middleware! ');
  next();
});

//adaugam reqTime pe toate request-urile

app.use((req, res, next) => {
  req.requestTime=new Date().toISOString();
  next();
});


const PORT = process.env.PORT || 3000;


app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/videos', videoRoutes);


app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Test OK Backend is running!',
    app: 'ManagerVideoYT',
    time: new Date().toISOString(),
    version: '1.0.0',
  });
});




app.post('/test-body', (req, res) => {
  console.log('Body primit în /test-body:', req.body);
  res.json({
    received: req.body,
  });
});



app.listen(PORT, () => {
  console.log('Server is up on port ' + PORT);
});
