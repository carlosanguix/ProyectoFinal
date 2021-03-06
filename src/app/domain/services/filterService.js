// Filter functions for domain layer

//////////////
// REQUIRES //
//////////////
// Usability
const filterRepository = require('../../infrastructure/repositories/filterRepository');
// Models

const giveMeOrigins = async () => {

    let countries = await filterRepository.getOrigins();
    return countries;
}

const giveMeCategories = async () => {

    let categories = await filterRepository.getCategories();
    return categories;
}

const giveMeStyles = async () => {

    let styles = await filterRepository.getStyles();
    return styles;
}

const giveMeMaxAbv = async () => {

    let maxAbv = await filterRepository.getMaxAbv();
    return maxAbv;
}

const giveMeMaxIbu = async () => {

    let maxIbu = await filterRepository.getMaxIbu();
    return maxIbu;
}

const giveMeMaxSrm = async () => {

    let maxSrm = await filterRepository.getMaxSrm();
    return maxSrm;
}


module.exports = {
    giveMeOrigins,
    giveMeCategories,
    giveMeStyles,
    giveMeMaxAbv,
    giveMeMaxIbu,
    giveMeMaxSrm
}