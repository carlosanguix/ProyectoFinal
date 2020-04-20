const controller = require('../controllers/beers.controller');

module.exports = (app) => {

    app.get('/birras/:name', controller.findBeerByName);
}