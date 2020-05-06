// Controller for beers request

//////////////
// REQUIRES //
//////////////
// Usability
const beerService = require('../../domain/services/beerService');
// Models
const {beerRequestViewModel} = require('../models/beerRequestViewModel');


///////////////
// FUNCTIONS //
///////////////
const findBeerByRequest = async (req, res) => {
    

    let beer = req.body.beer;
    let order = req.body.orderBy
    let beerRequestParams = beerRequestViewModel(beer.name, beer.origin, beer.category, beer.style, beer.minAbv, beer.maxAbv, beer.minIbu, beer.maxIbu, beer.minSpm, beer.maxSpm, beer.minUpc, beer.maxUpc);

    let beers = beerService.giveMeThisBeers(beerRequestParams, order);
}

module.exports = {
    findBeerByRequest
}