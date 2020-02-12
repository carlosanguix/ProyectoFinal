// Imports
const express = require('express');
const path = require('path');

// Configuraciones
const app = express();
const port = process.env.port || 3003;

// Rutas
// TODO Funcionamiento??????
require('./app/routes/beers.routes')(app);

// Servicio al cliente /public
// TODO static??? Yo quiero dynamic
app.use(express.static(path.join(__dirname, 'public')));

// Arrancando el servidor
app.listen(port, () => {
    console.log(' * Servidor escuchando en el puerto ' + port);
});
