const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el paquete cors
const proposalRoute = require('./routes/proposal');
const activityRoute = require('./routes/activity');
const http = require('http');

require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Usa el middleware cors para permitir todas las solicitudes
app.use(express.json());
app.use('/api/', proposalRoute);
app.use('/api/', activityRoute);

// Crear servidor HTTP
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin: '*'}
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

mongoose.connect(
  process.env.MONGODB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log('Conectado A Mongo');
}).catch((error) => console.error(error));

httpServer.listen(3000, () => {
  console.log(`Servidor HTTP iniciado en el puerto 3000`);
});
