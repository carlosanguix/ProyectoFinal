const beerViewModel = (name, origin, category, style, minAbv, maxAbv, minIbu, maxIbu, minSpm, maxSpm, minUpc, maxUpc) => {
    return {
        name: name,
        origin: origin,
        category: category,
        style: style,
        abv: abv,
        ibu: ibu,
        spm: spm,
        upc: upc
    }
}

module.exports = {
    beerViewModel
}

