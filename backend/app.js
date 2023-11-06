const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const proposalRoute = require('./routes/proposal');
const activityRoute = require('./routes/activity');
const adminRoute = require('./routes/admin');
const http = require('http');
const authUtils = require('./models/jwtAuth');
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

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });

  setInterval(() => {
    io.emit('message', Math.random());
    counter++;
  }, 5000);
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
app.use('/api/', authUtils.verifyToken, proposalRoute); // Aplica el middleware verifyToken a las rutas de proposals
app.use('/api/',  authUtils.verifyToken,activityRoute); // Aplica el middleware verifyToken a las rutas de activities