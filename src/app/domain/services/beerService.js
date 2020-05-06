// Beers functions for domain layer

//////////////
// REQUIRES //
//////////////
// Usability
const beerRepository = require('../../infrastructure/repositories/beerRepository');
// Models
const {beerDomain} = require('../entities/beerDomain');

const giveMeThisBeers = async (beerReqParams, order) => {

    let beerParams = beerDomain(beerReqParams.name, beerReqParams.origin, beerReqParams.category, beerReqParams.style, beerReqParams.minAbv, beerReqParams.maxAbv, beerReqParams.minIbu, beerReqParams.maxIbu, beerReqParams.minSpm, beerReqParams.maxSpm, beerReqParams.minUpc, beerReqParams.maxUpc);

    let beers = await beerRepository.getBeersByParams(beerParams, order);
}

module.exports = {
    giveMeThisBeers
}