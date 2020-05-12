// Beers functions for domain layer

//////////////
// REQUIRES //
//////////////
// Usability
const beerRepository = require('../../infrastructure/repositories/beerRepository');
// Models
const {beerFilterDomain} = require('../entities/beerFilterDomain');

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

}

module.exports = {
    giveMeBeersByFilters,
    checkAndSetUserFavoriteBeer
}