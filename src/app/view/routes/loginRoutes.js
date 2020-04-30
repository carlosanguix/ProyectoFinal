const controller = require('../controllers/loginController');

module.exports = (app) => {

    // Create user in DB
    app.post('/signUp', controller.signUp);

    // Sign in as user
    app.post('/signIn', controller.signIn);
}