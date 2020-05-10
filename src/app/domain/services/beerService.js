// Beers functions for domain layer

//////////////
// REQUIRES //
//////////////
// Usability
const beerRepository = require('../../infrastructure/repositories/beerRepository');
// Models
const {beerFilterDomain} = require('../entities/beerFilterDomain');

const giveMeBeersByFilters = async (beerReqParams, order, pagination) => {

    let beerParams = beerFilterDomain(beerReqParams.name, beerReqParams.origin, beerReqParams.category, beerReqParams.style, beerReqParams.minAbv, beerReqParams.maxAbv, beerReqParams.minIbu, beerReqParams.maxIbu, beerReqParams.minSrm, beerReqParams.maxSrm);

    let beerPagination = await beerRepository.getBeersByParams(beerParams, order, pagination);

    return beerPagination;
}

module.exports = {
    giveMeBeersByFilters
}