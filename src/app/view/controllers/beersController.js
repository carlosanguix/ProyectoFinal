// Controller for beers request

//////////////
// REQUIRES //
//////////////
// Usability
const beerService = require('../../domain/services/beerService');
const userService = require('../../domain/services/userService');
// Models
const { beerFilterRequestViewModel } = require('../models/BeerFilterRequestViewModel');
const { votingRequestViewModel } = require('../models/votingRequestViewModel');
const { commentRequestViewModel } = require('../models/commentRequestViewModel');


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

const commentBeer = async (req, res) => {

    let commentRequest = commentRequestViewModel(req.body.idUser, req.body.idBeer, req.body.comment);

    let idComment = await beerService.commentBeer(commentRequest);
    let userName = await userService.giveMeUsernameByID(req.body.idUser);

    let resp = {
        idComment: idComment,
        username: userName,
        commented: true
    }

    res.send(resp);
}

const getMyLikedBeers = async (req, res) => {

    let likedBeers = await beerService.giveMeMyLikedBeers(req.body.page, req.body.idUser);

    res.send(likedBeers);
}

const getMyVotedBeers = async (req, res) => {

    let votedBeers = await beerService.giveMeMyVotedBeers(req.body.page, req.body.idUser);

    res.send(votedBeers);
}

const removeComment = async (req, res) => {

    let commentRemoved = await beerService.removeComment(req.body.idComment);

}

module.exports = {
    findBeerByRequest,
    setUserFavoriteBeer,
    getMostFavorite,
    getBestRatedBeer,
    voteBeer,
    commentBeer,
    getMyLikedBeers,
    getMyVotedBeers,
    removeComment
}