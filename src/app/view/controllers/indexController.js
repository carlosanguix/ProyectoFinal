
const filterService = require('../../domain/services/filterService');
const {filterViewModel} = require('../models/filterViewModel');

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
        let maxSpm = await filterService.giveMeMaxSpm();
        let maxUpc = await filterService.giveMeMaxUpc();

        let filterModel = filterViewModel(origins, categories, styles, maxAbv, 9, 8, 7);

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