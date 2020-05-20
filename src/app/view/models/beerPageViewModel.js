// Object beerPage for view layer

const beerPage = (id, name, catName, styleName, abv, ibu, srm, filepath, descript, company, state, country, website, score, comments) => {
    return {
        id: id,
        name: name,
        catName: catName,
        styleName: styleName,
        abv: abv,
        ibu: ibu,
        srm: srm,
        filepath: filepath,
        descript: descript,
        company: company,
        state: state,
        country: country,
        website:website,
        score: score,
        comments: comments
    }
}

module.exports = {
    beerPage
}