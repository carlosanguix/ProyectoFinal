// Imports
const express = require('express');
const path = require('path');

// Configuraciones
const app = express();
const port = process.env.port || 3003;

// Rutas
// TODO No hago nada en estas rutas
require('./routes/routes.js');


// Servicio al cliente /public
// TODO static??? Yo quiero dynamic
app.use(express.static(path.join(__dirname, 'public')));

// Arrancando el servidor
app.listen(port, () => {
    console.log(' * Servidor escuchando en el puerto ' + port);
});


//*********************** Pruebas!!
// TODO Conectamos la BBDD (aqui para que?)
const db = require('./database.js');
let a = new db();
a.connect();
