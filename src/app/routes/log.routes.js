


const controller = require('../controllers/log.controller');

module.exports = (app) => {

    // Buscar un usuario
    // app.get('/signIn', controller.signIn);
    app.post('/signIn', controller.signIn);

    // Buscar una cerveza por ID???? Nombre???
    app.get('/signUp', controller.signUp);
}