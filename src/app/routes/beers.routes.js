// Aquí indicaremos todas las rutas a las instrucciones según las peticiones del cliente.

// Exportamos el módulo para que lo pueda recibir app.use(require('./routes/routes.js'))

const controller = require('../controllers/database.controller');

module.exports = (app) => {

    // Buscar todas las cervezas
    app.get('/birras', controller.findAllBeers)

    // Buscar una cerveza por ID???? Nombre???
    app.get('/birras', controller.findOneBeer);
}