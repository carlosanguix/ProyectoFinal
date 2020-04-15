


const controller = require('../controllers/log.controller');

module.exports = (app) => {

    // Buscar un usuario en la base de datos
    app.get('/checkUser/:name/:email', controller.checkUser);

    // Iniciar sesion como usuario
    app.post('/signIn', controller.signIn);

    // Crear un usuario
    app.post('/signUp', controller.signUp);
}