// Controllers for render pages

//////////////
// REQUIRES //
//////////////
// Usability
const filterService = require('../../domain/services/filterService');
const beerService = require('../../domain/services/beerService');
// Models
const { filterViewModel } = require('../models/filterViewModel');
const { beerDomain } = require('../../domain/entities/beerDomain');


///////////////
// FUNCTIONS //
///////////////
const renderLogin = (req, res) => {

    res.render('index');
}

const renderHome = async (req, res) => {

    let page = req.query.page;
    console.log(page);

        res.render('home.ejs', {
            page: page
        });
}

const renderBeers = async (req, res) => {

    let page = req.query.page;
    console.log(page);

    let origins = await filterService.giveMeOrigins();
    let categories = await filterService.giveMeCategories();
    let styles = await filterService.giveMeStyles();
    let maxAbv = await filterService.giveMeMaxAbv();
    let maxIbu = await filterService.giveMeMaxIbu();
    let maxSrm = await filterService.giveMeMaxSrm();

    let filterModel = filterViewModel(origins, categories, styles, maxAbv, maxIbu, maxSrm);

    res.render('beers.ejs', { 
        page: page,
        filter: filterModel
    });
}

const renderMyProfile = async (req, res) => {

    let page = req.query.page;
    console.log(page);

    res.render('myProfile.ejs', {
        page: page 
    });
}

const renderBeer = async (req, res) => {

    let beer = await beerService.giveMeThisBeerByID(req.params.id);

    res.render('oneBeer.ejs', {beer: beer})
}

module.exports = {
    renderLogin,
    renderHome,
    renderBeers,
    renderMyProfile,
    renderBeer
}