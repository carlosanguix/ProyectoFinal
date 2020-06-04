// Routes for beers requests

//////////////
// REQUIRES //
//////////////
// Usability
const controller = require('../controllers/beersController');
// Models


module.exports = (app) => {

    app.post('/beers', controller.findBeerByRequest);
 
    app.post('/beers/favorite', controller.setUserFavoriteBeer);

    app.post('/beers/mostFavorite', controller.getMostFavorite);

    app.post('/beers/bestRated', controller.getBestRatedBeer);

    app.post('/beers/voteBeer', controller.voteBeer);

    app.post('/beers/commentBeer', controller.commentBeer);

    app.post('/myProfile/liked', controller.getMyLikedBeers);

    app.post('/myProfile/voted', controller.getMyVotedBeers);
}