// Routes for beers requests

//////////////
// REQUIRES //
//////////////
// Usability
const controller = require('../controllers/beersController');
// Models


module.exports = (app) => {

    app.post('/beers', controller.findBeerByRequest);
 
}