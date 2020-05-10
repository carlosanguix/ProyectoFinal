// Controllers for render pages

//////////////
// REQUIRES //
//////////////
// Usability
const filterService = require('../../domain/services/filterService');
// Models
const {filterViewModel} = require('../models/filterViewModel');


///////////////
// FUNCTIONS //
///////////////
const renderLogin = (req, res) => {

    res.render('index');
}

const renderHome = async (req, res) => {

    let page = req.query.page;
    console.log(page);

    if (page == 'home') {
        
        res.render('home.ejs', {
            page: page
        });
    } else if (page == 'beers') {
        
        let origins = await filterService.giveMeOrigins();
        let categories = await filterService.giveMeCategories();
        let styles = await filterService.giveMeStyles();
        let maxAbv = await filterService.giveMeMaxAbv();
        let maxIbu = await filterService.giveMeMaxIbu();
        let maxSrm = await filterService.giveMeMaxSrm();

        let filterModel = filterViewModel(origins, categories, styles, maxAbv, maxIbu, maxSrm);
        
        res.render('home.ejs', {
            page: page,
            filter: filterModel
        });
    } else if (page == 'myProfile') {
        
        res.render('home.ejs', {
            page: page
        });
    }

}



module.exports = {
    renderLogin,
    renderHome
}