const beerViewModel = (id, breweryId, name, catId, catName, styleId, styleName, abv, ibu, srm, filepath, descript, score, favorite) => {
    return {
        id: id,
        breweryId: breweryId,
        name: name,
        catId: catId,
        catName: catName,
        styleId: styleId,
        styleName: styleName,
        abv: abv,
        ibu: ibu,
        srm: srm,
        filepath: filepath,
        descript: descript,
        score: score,
        favorite: favorite
    }
}

module.exports = {
    beerViewModel
}

