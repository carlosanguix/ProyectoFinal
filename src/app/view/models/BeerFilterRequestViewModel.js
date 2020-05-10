const beerFilterRequestViewModel = (name, origin, category, style, minAbv, maxAbv, minIbu, maxIbu, minSrm, maxSrm) => {
    return {
        name: name,
        origin: origin,
        category: category,
        style: style,
        minAbv: minAbv,
        maxAbv: maxAbv,
        minIbu: minIbu,
        maxIbu: maxIbu,
        minSrm: minSrm,
        maxSrm: maxSrm
    }
}

module.exports = {
    beerFilterRequestViewModel
}

