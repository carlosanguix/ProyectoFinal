// Imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const md5 = require('crypto-md5');

// Configuraciones
const app = express();
const port = process.env.port || 3003;
app.use(bodyParser());
app.use(cookieParser());

// Rutas
require('./app/routes/beers.routes')(app);
require('./app/routes/log.routes')(app);

// Servicio al cliente /public
app.use(express.static(path.join(__dirname, 'public')));

// Arrancando el servidor
app.listen(port, () => {
    console.log(' * Servidor escuchando en el puerto ' + port);
});
