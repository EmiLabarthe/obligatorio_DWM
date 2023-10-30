const express = require('express');
const mongoose = require('mongoose');
const proposalRoute = require('./routes/proposal');
const activityRoute = require('./routes/activity');
require("dotenv").config();

const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use('/api/', proposalRoute);
app.use('/api/', activityRoute);



app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

mongoose.connect(
  //clave del mongodb
  process.env.MONGODB_URI
).then(()=>{
  console.log('Conectado A Mongo')
}).catch((error)=> console.error(error));

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
