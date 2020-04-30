const controller = require('../controllers/beersController');

module.exports = (app) => {

    app.get('/birras', controller.findBeerByName);

    app.get('/birras/collect', controller.collectInputFields);
}