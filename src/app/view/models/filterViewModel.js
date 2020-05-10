const filterViewModel = (origins, categories, styles, maxAbv, maxIbu, maxSrm) => {
    return {
        origins: origins,
        categories: categories,
        styles: styles,
        maxAbv: maxAbv,
        maxIbu: maxIbu,
        maxSrm: maxSrm,
        orderBy: ['name', 'abv']
    }
}

module.exports = {
    filterViewModel
}