const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const proposalRoute = require('./routes/proposal');
const activityRoute = require('./routes/activity');
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
  const activities = [{title:'Actividad 1', imgPath:'https://inesdi-cdn.s3.eu-west-3.amazonaws.com/inesdi-prod/2022-05/Cronograma%20de%20actividades%20que%CC%81%20es%20y%20co%CC%81mo%20hacerlo-1.jpg'}, 
  {title:'Actividad 2', imgPath:'https://image.api.playstation.com/vulcan/img/cfn/11307uYG0CXzRuA9aryByTHYrQLFz-HVQ3VVl7aAysxK15HMpqjkAIcC_R5vdfZt52hAXQNHoYhSuoSq_46_MT_tDBcLu49I.png'},
   {title:'Actividad 3', imgPath:'https://image.api.playstation.com/vulcan/img/cfn/11307CjjUZ9rA_whmJUghJsG9Hl1-rmnOUTk3-nccj01ZpYMCHrJ8k8kzBrVyp-p-iCPej73TEJAs88ZBeiZ1uirtj0fsa16.png'}]
  if(posicion < activities.length)
  {
    setTimeout(() => {
      io.emit('sendNewActivity', activities[posicion]);
      jugarJuego(posicion+1)
    }, 3000);
  }
  else
  {
    setTimeout(() => {
      io.emit('sendNewActivity',{title:'Terminó el juego', imgPath:''});
    }, 3000);

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