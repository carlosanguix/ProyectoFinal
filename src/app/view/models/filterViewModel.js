const filterViewModel = (origins, categories, styles, abv, ibu, spm, upc, orderBy) => {
    return {
        origins: origins,
        categories: categories,
        styles: styles,
        abv: abv,
        ibu: ibu,
        spm: spm,
        upc: upc,
        orderBy: ['name', 'bestRated', 'abv']
    }
}

module.exports = {
    filterViewModel
}