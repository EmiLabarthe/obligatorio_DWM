const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const proposalRoute = require('./routes/proposal');
const activityRoute = require('./routes/activity');
const sessionRoute = require('./routes/session')
const adminRoute = require('./routes/admin');
const http = require('http');
const authUtils = require('./middleware/jwtAuth');
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware para manejar las solicitudes CORS
app.use(cors({ origin: 'http://localhost:4200' }));

// Middleware para parsear JSON y otras solicitudes entrantes
app.use(express.json());

// Rutas de la API
app.use('/api/', proposalRoute);
app.use('/api/', activityRoute);
app.use('/api/', sessionRoute);

// Crear servidor HTTP
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

let counter = 0;

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.post('/session/start',(req,res)=>{
  jugarJuego(0)
  res.send('ok')
});

function jugarJuego(posicion){
  const activities = [{title:'Actividad 1', imgPath:''}, {title:'Actividad 2', imgPath:''}, {title:'Actividad 3', imgPath:''}]
  if(posicion < activities.length)
  {
    setTimeout(() => {
      io.emit('sendNewActivity', activities[posicion]);
      jugarJuego(posicion+1)
    }, 3000);
  }
  else
  {
    io.emit('sendNewActivity',{title:'Terminó el juego', imgPath:''});
  }
}

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });

  socket.on('error', (error) => {
    console.log('WebSocket Error:', error);
  });
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado A Mongo');
}).catch((error) => console.error(error));

httpServer.listen(PORT, () => {
  console.log(`Servidor HTTP iniciado en el puerto ${PORT}`);
});

// Rutas de la API
app.use('/api/',adminRoute);
app.use('/api/', proposalRoute); // Aplica el middleware verifyToken a las rutas de proposals
app.use('/api/', activityRoute); // Aplica el middleware verifyToken a las rutas de activities