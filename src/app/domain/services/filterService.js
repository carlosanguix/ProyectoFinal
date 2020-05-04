const filterRepository = require('../../infrastructure/repositories/filterRepository');

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

const giveMeMaxSpm = async () => {

    let maxSpm = await filterRepository.getMaxSpm();
    return maxSpm;
}

const giveMeMaxUpc = async () => {

    let maxUpc = await filterRepository.getMaxUpc();
    return maxUpc;
}

module.exports = {
    giveMeOrigins,
    giveMeCategories,
    giveMeStyles,
    giveMeMaxAbv,
    giveMeMaxIbu,
    giveMeMaxSpm,
    giveMeMaxUpc
}