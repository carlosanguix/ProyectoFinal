// Beer functions for infrastructure layer

//////////////
// REQUIRES //
//////////////
// Usability
const connections = require('../connection');
// Models
const { beerData } = require('../tables/beerData');
const { beerDomain } = require('../../domain/entities/beerDomain');

///////////////
// FUNCTIONS //
///////////////
const getBeersByParams = async (beerParams, order, pagination) => {

    let params = [];

    // Initial query
    let query = 'SELECT sql_calc_found_rows `breweries`.`country`, `styles`.`style_name`, `categories`.`cat_name`, `beers`.* FROM `beers`';
    query += ' INNER JOIN `breweries` ON `beers`.`brewery_id` = `breweries`.`id`';
    query += ' INNER JOIN `styles` ON `beers`.`style_id` = `styles`.`id`';
    query += ' INNER JOIN `categories` ON `beers`.`cat_id` = `categories`.`id`';
    // Query to compare the name of the beer
    query += ' WHERE `beers`.`name` LIKE ?';
    params.push('%' + beerParams.name + '%');
    // Query to compare the country of the beer
    query += ' AND `breweries`.`country` LIKE ?';
    params.push('%' + beerParams.origin + '%');
    // Query to compare the style of the beer
    query += ' AND `styles`.`style_name` LIKE ?';
    params.push('%' + beerParams.style + '%');
    // Query to compare the category of the beer
    query += ' AND `categories`.`cat_name` LIKE ?';
    params.push('%' + beerParams.category + '%');
    // Query to compare the abv of the beer
    query += ' AND `beers`.`abv` BETWEEN ? AND ?';
    params.push(beerParams.minAbv, beerParams.maxAbv);
    // Query to compare the ibu of the beer
    query += ' AND `beers`.`ibu` BETWEEN ? AND ?';
    params.push(beerParams.minIbu, beerParams.maxIbu);
    // Query to compare the srm of the beer
    query += ' AND `beers`.`srm` BETWEEN ? AND ?';
    params.push(beerParams.minSrm, beerParams.maxSrm);
    // Query to order the results
    if (order != '') {
        query += ' ORDER BY ' + order + ' ASC';
    } else {
        query += 'ORDER BY `beers`.`id`';
    }
    // Query to paging
    query += ' LIMIT 20 OFFSET ' + pagination * 20;

    console.log(query);
    console.log(params);


    let connection = await connections.connectDB();
    let [rows] = await connection.query(query, params);

    let reqReturn = {
        allBeers: [],
        totalNumberOfBeers: -1
    }

    let beers = [];

    if (rows.length != 0) {
        rows.forEach(beer => {
            let beerDom = beerDomain(beer.id, beer.brewery_id, beer.name, beer.cat_id, beer.cat_name, beer.style_id, beer.style_name, beer.abv, beer.ibu, beer.srm, beer.filepath, beer.descript);
            beers.push(beerDom);
        });

        reqReturn.allBeers = beers;

        let foundRows = 'SELECT FOUND_ROWS() as finded';
        let found = await connection.query(foundRows);

        reqReturn.totalNumberOfBeers = found[0][0].finded;

        // console.log(reqReturn.allBeers[0]);
        // console.log(reqReturn.totalNumberOfBeers);

        return reqReturn;
    } else {
        return beers;
    }
}

const getPunctuationOfThisBeer = async (idBeer) => {

    let query = 'SELECT AVG(`score`) AS avgScore FROM `voting` WHERE `idBeer`=?';

    let params = [idBeer]
    let connection = await connections.connectDB();
    let [rows] = await connection.query(query, [idBeer]);

    if (rows.length != 0) {
        return rows[0].avgScore;
    } else {
        return 0;
    }
}

const isFavoriteBeer = async (idBeer, idUser) => {

    let query = 'SELECT * FROM `favorites` WHERE `idBeer`=? && `idUser`=?';

    console.log(idBeer, idUser);
    
    let params = [idBeer, idUser]
    let connection = await connections.connectDB();
    let [rows] = await connection.query(query, params);

    if (rows.length != 0) {
        console.log(rows[0]);
        return true;
    } else {
        return false;
    }
}

module.exports = {
    getBeersByParams,
    getPunctuationOfThisBeer,
    isFavoriteBeer
}