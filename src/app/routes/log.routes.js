


const controller = require('../controllers/log.controller');

module.exports = (app) => {

    // Buscar un usuario en la base de datos

    // Iniciar sesion como usuario
    app.post('/signIn', controller.signIn);

    // Crear un usuario
    app.post('/signUp', controller.signUp);
}