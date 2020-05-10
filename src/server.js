// Imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

// Configuraciones
const app = express();
const port = process.env.port || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
/*
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
*/
// EJS config
app.set('views', path.join(__dirname, 'app/view/client/templates'));
// app.use(express.static(path.join(__dirname, 'app/view/client')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Rutas
// EJS routes
app.use('/', require('./app/view/routes/indexRoutes'));
// Funcionality routes
require('./app/view/routes/loginRoutes')(app);
require('./app/view/routes/beersRoutes')(app);

console.log(port);

// Arrancando el servidor
app.listen(port, () => {
    console.log(' * Servidor escuchando en el puerto ' + port);
});
