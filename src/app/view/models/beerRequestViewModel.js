const beerRequestViewModel = (name, categorieName, styleName, abv, ibu, srm, upc) => {
    return {
        name: name,
        categorie: categorieName,
        style: styleName,
        abv: abv,
        ibu: ibu,
        srm: srm,
        upc: upc
    }
}

module.exports = {
    beerRequestViewModel
}