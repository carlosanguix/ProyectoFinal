// Controller for beers request

//////////////
// REQUIRES //
//////////////
// Usability
const beerService = require('../../domain/services/beerService');
// Models
const { beerFilterRequestViewModel } = require('../models/BeerFilterRequestViewModel');
const { votingRequestViewModel } = require('../models/votingRequestViewModel');


///////////////
// FUNCTIONS //
///////////////
const findBeerByRequest = async (req, res) => {

    let beer = req.body.beer;
    let order = req.body.orderBy
    let pagination = req.body.page;
    let idUser = req.body.idUser;

    let beerFilters = beerFilterRequestViewModel(beer.name, beer.origin, beer.category, beer.style, beer.minAbv, beer.maxAbv, beer.minIbu, beer.maxIbu, beer.minSrm, beer.maxSrm);

    let beerPagination = await beerService.giveMeBeersByFilters(beerFilters, order, pagination, idUser);
    
    res.send(beerPagination);
}

const setUserFavoriteBeer = async (req, res) => {

    let idUser = req.body.idUser;
    let idBeer = req.body.idBeer;

    let beerFavoriteStatus = await beerService.checkAndSetUserFavoriteBeer(idBeer, idUser);

    console.log(beerFavoriteStatus);
    

    res.send(beerFavoriteStatus);
}

const getMostFavorite = async (req, res) => {
    
    let mostFavorite = await beerService.giveMeMostFavoriteBeer(req.body.user);

    res.send(mostFavorite)    
}

const getBestRatedBeer = async (req, res) => {

    let bestRatedBeer = await beerService.giveMeBestRatedBeer(req.body.user);

    res.send(bestRatedBeer);
}

const voteBeer = async (req, res) => {

    let votingRequest = votingRequestViewModel(req.body.idUser, req.body.idBeer, req.body.score);
    
    let beerHasBeenVoted = await beerService.voteBeer(votingRequest);

    res.send(beerHasBeenVoted);
}

module.exports = {
    findBeerByRequest,
    setUserFavoriteBeer,
    getMostFavorite,
    getBestRatedBeer,
    voteBeer
}