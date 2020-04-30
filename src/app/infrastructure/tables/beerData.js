const beerData = (id, breweryId, name, catId, styleId, abv, ibu, srm, upc, filepath, descript) => {
    return {
        id: id,
        breweryId: breweryId,
        name: name,
        catId: catId,
        styleId: styleId,
        abv: abv,
        ibu: ibu,
        srm: srm,
        upc: upc,
        filepath: filepath,
        descript: descript
    }
}

module.exports = {
    beerData
}