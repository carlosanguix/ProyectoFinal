// Object beer for domain layer

const beerDomain = (name, origin, category, style, minAbv, maxAbv, minIbu, maxIbu, minSpm, maxSpm, minUpc, maxUpc) => {
    return {
        name: name,
        origin: origin,
        category: category,
        style: style,
        minAbv: minAbv,
        maxAbv: maxAbv,
        minIbu: minIbu,
        maxIbu: maxIbu,
        minSpm: minSpm,
        maxSpm: maxSpm,
        minUpc: minUpc,
        maxUpc: maxUpc
    }
}

module.exports = {
    beerDomain
}

