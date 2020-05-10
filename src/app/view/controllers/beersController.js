// Controller for beers request

//////////////
// REQUIRES //
//////////////
// Usability
const beerService = require('../../domain/services/beerService');
// Models
const { beerFilterRequestViewModel } = require('../models/BeerFilterRequestViewModel');


///////////////
// FUNCTIONS //
///////////////
const findBeerByRequest = async (req, res) => {


    let beer = req.body.beer;
    let order = req.body.orderBy
    let pagination = req.body.page;

    let beerFilters = beerFilterRequestViewModel(beer.name, beer.origin, beer.category, beer.style, beer.minAbv, beer.maxAbv, beer.minIbu, beer.maxIbu, beer.minSrm, beer.maxSrm);

    let beerPagination = await beerService.giveMeBeersByFilters(beerFilters, order, pagination);

    res.send(beerPagination);
}

module.exports = {
    findBeerByRequest
}