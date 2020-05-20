// Beers functions for domain layer

//////////////
// REQUIRES //
//////////////
// Usability
const beerRepository = require('../../infrastructure/repositories/beerRepository');
// Models
const { beerFilterDomain } = require('../entities/beerFilterDomain');
const { votingDomain } = require('../entities/votingDomain');
const { beerPage } = require('../../view/models/beerPageViewModel');
const { commentViewModel } = require('../../view/models/commentViewModel');

const giveMeBeersByFilters = async (beerReqParams, order, pagination, idUser) => {

    let beerParams = beerFilterDomain(beerReqParams.name, beerReqParams.origin, beerReqParams.category, beerReqParams.style, beerReqParams.minAbv, beerReqParams.maxAbv, beerReqParams.minIbu, beerReqParams.maxIbu, beerReqParams.minSrm, beerReqParams.maxSrm);

    let beerPagination = await beerRepository.getBeersByParams(beerParams, order, pagination);

    for (let i = 0; i < beerPagination.allBeers.length; i++) {
        
        beerPagination.allBeers[i].score = await beerRepository.getPunctuationOfThisBeer(beerPagination.allBeers[i].id);
        beerPagination.allBeers[i].favorite = await beerRepository.isFavoriteBeer(beerPagination.allBeers[i].id, idUser);
    }

    return beerPagination;
}

const checkAndSetUserFavoriteBeer = async (idBeer, idUser) => {

    let statusFavorite = await beerRepository.isFavoriteBeer(idBeer, idUser);

    if (statusFavorite) {
        beerRepository.removeFavoriteBeer(idBeer, idUser);
    } else {
        beerRepository.addBeerToFavorite(idBeer, idUser);
    }

    return statusFavorite;
}

const giveMeMostFavoriteBeer = async (idUser) => {

    let mostFavorite = await beerRepository.getMostFavoriteBeer(idUser);
    let isFavorite = await beerRepository.isFavoriteBeer(mostFavorite.id, idUser);
    let score = await beerRepository.getPunctuationOfThisBeer(mostFavorite.id);

    let result = {
        beer: mostFavorite,
        favorite: isFavorite,
        score: score
    }

    return result;
}

const giveMeBestRatedBeer = async (idUser) => {

    let bestRatedBeer = await beerRepository.getBestRatedBeer();
    let isFavorite = await beerRepository.isFavoriteBeer(bestRatedBeer.id, idUser);

    let result = {
        beer: bestRatedBeer,
        favorite: isFavorite,
        score: bestRatedBeer.vg
    }

    return result;
}

const voteBeer = async (votingRequest) => {

    let votingParams = votingDomain(votingRequest.idUser, votingRequest.idBeer, votingRequest.score);
    
    let beerAlreadyVoted = await beerRepository.isBeerAlreadyVoted(votingParams);

    let beerStatus;

    if (beerAlreadyVoted) {
        beerStatus = await beerRepository.updateScore(votingParams);
    } else {
        beerStatus = await beerRepository.voteBeer(votingParams);
    }

    return beerStatus;
}

const giveMeThisBeerByID = async (idBeer) => {

    let beer = await beerRepository.getBeerByID(idBeer);
    let catName = await beerRepository.getCategoryNameByID(beer.cat_id);
    let styleName = await beerRepository.getStyleNameByID(beer.style_id);
    let brewery = await beerRepository.getBreweryNameByID(beer.brewery_id);
    let score = await beerRepository.getPunctuationOfThisBeer(beer.id);
    let comments = await beerRepository.getCommentsOfThisBeer(beer.id);

    let allComments = [];

    comments.forEach(comm => {
        let commentsView = commentViewModel(comm.id, comm.idUser, comm.userName, comm.comment);
        allComments.push(commentsView);
    });

    console.log(allComments);
    
    let beerView = beerPage(idBeer, beer.name, catName, styleName, beer.abv, beer.ibu, beer.srm, beer.filepath, beer.descript, brewery.name, brewery.state, brewery.country, brewery.website, score, allComments);
    
    return beerView;
}

module.exports = {
    giveMeBeersByFilters,
    checkAndSetUserFavoriteBeer,
    giveMeMostFavoriteBeer,
    giveMeBestRatedBeer,
    voteBeer,
    giveMeThisBeerByID
}