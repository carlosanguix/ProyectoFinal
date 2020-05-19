// Beer functions for infrastructure layer

//////////////
// REQUIRES //
//////////////
// Usability
const connections = require('../connection');
// Models
const { beerData } = require('../tables/beerData');
const { favoriteData } = require('../tables/favoriteData');
const { beerDomain } = require('../../domain/entities/beerDomain');
const { votingData } = require('../tables/votingData');

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
        connection.end();

        reqReturn.totalNumberOfBeers = found[0][0].finded;

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
    connection.end();

    if (rows.length != 0) {
        return rows[0].avgScore;
    } else {
        return 0;
    }
}

const isFavoriteBeer = async (idBeer, idUser) => {

    let favoriteDB = favoriteData(idUser, idBeer)

    let query = 'SELECT * FROM `favorites` WHERE `idBeer`=? AND `idUser`=?';
    
    let params = [favoriteDB.idBeer, favoriteDB.idUser]
    let connection = await connections.connectDB();
    let [rows] = await connection.query(query, params);
    connection.end();

    if (rows.length != 0) {
        return true;
    } else {
        return false;
    }
}

const removeFavoriteBeer = async (idBeer, idUser) => {

    let favoriteDB = favoriteData(idUser, idBeer)
    
    let query = 'DELETE FROM `favorites` WHERE `idBeer`=? AND `idUSer`=?';

    let params = [favoriteDB.idBeer, favoriteDB.idUser]
    let connection = await connections.connectDB();
    let [rows] = await connection.query(query, params);
    connection.end();

    if (rows.length != 0) {
        return true;
    } else {
        return false;
    }
}

const addBeerToFavorite = async (idBeer, idUser) => {

    let favoriteDB = favoriteData(idUser, idBeer)
    
    let query = 'INSERT INTO `favorites` (`idUser`, `idBeer`) VALUES (?, ?)';

    let params = [favoriteDB.idUser, favoriteDB.idBeer]
    let connection = await connections.connectDB();
    let [rows] = await connection.query(query, params);
    connection.end();

    if (rows.length != 0) {
        return true;
    } else {
        return false;
    }
}

const getBeerByID = async (idBeer) => {

    let query = 'SELECT * FROM `beers` WHERE `id`=?';

    let connection = await connections.connectDB();
    let [rows] = await connection.query(query, [idBeer]);
    connection.end();

    return rows[0];
}

const getMostFavoriteBeer = async () => {

    let query = 'SELECT `idBeer` FROM `favorites` GROUP BY `idBeer` ORDER BY count(`idBeer`) DESC LIMIT 1 OFFSET 0';

    let connection = await connections.connectDB();
    let [rows] = await connection.query(query);
    connection.end();

    let idBeer = rows[0].idBeer;

    let mostFavorite = await getBeerByID(idBeer);

    return mostFavorite;
}

const getBestRatedBeer = async () => {

    let query = 'SELECT avg(`voting`.`score`) AS vg, `breweries`.`country`, `styles`.`style_name`, `categories`.`cat_name`, `beers`.*';
    query += ' FROM `beers` INNER JOIN `voting` ON `beers`.`id` = `voting`.`idBeer`';
    query += ' INNER JOIN `breweries` ON `beers`.`brewery_id` = `breweries`.`id`';
    query += ' INNER JOIN `styles` ON `beers`.`style_id` = `styles`.`id`';
    query += ' INNER JOIN `categories` ON `beers`.`cat_id` = `categories`.`id`';
    query += ' GROUP BY `voting`.`idBeer` ORDER BY vg DESC';

    let connection = await connections.connectDB();
    let [rows] = await connection.query(query);
    connection.end();

    console.log(rows[0]);

    let bestRatedBeer = rows[0];

    return bestRatedBeer;
}

const isBeerAlreadyVoted = async (votingParams) => {

    let votingDB = votingData(votingParams.idUser, votingParams.idBeer, votingParams.score);
    let params = [votingDB.idUser, votingDB.idBeer];

    let query = 'SELECT * FROM `voting` WHERE `idUser`=? AND `idBeer`=?';
    let connection = await connections.connectDB();
    let [rows] = await connection.query(query, params);
    connection.end();

    if (rows.length != 0) {
        return true;
    } else {
        return false;
    }
}

const updateScore = async (votingParams) => {

    let votingDB = votingData(votingParams.idUser, votingParams.idBeer, votingParams.score);
    let params = [votingDB.score, votingDB.idUser, votingDB.idBeer];

    let query = 'UPDATE `voting` SET `score`=? WHERE `idUser`=? AND `idBeer`=?;';
    let connection = await connections.connectDB();
    let [rows] = await connection.query(query, params);
    connection.end();

    return 'updated';
}

const voteBeer = async (votingParams) => {

    let votingDB = votingData(votingParams.idUser, votingParams.idBeer, votingParams.score);
    let params = [votingDB.idUser, votingDB.idBeer, votingDB.score];

    let query = 'INSERT INTO `voting` (`idUser`, `idBeer`, `score`) VALUES (?, ?, ?)';
    let connection = await connections.connectDB();
    let [rows] = await connection.query(query, params);
    connection.end();
    
    return 'scored';
}

module.exports = {
    getBeersByParams,
    getPunctuationOfThisBeer,
    isFavoriteBeer,
    removeFavoriteBeer,
    addBeerToFavorite,
    getMostFavoriteBeer,
    getBestRatedBeer,
    isBeerAlreadyVoted,
    updateScore,
    voteBeer
}