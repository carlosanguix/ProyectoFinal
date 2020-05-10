// Filter functions for infrastructure layer

//////////////
// REQUIRES //
//////////////
// Usability
const connections = require('../connection');
// Models
// ** No tenemos una entidad del filtro dentro de tables, porque no es una entidad de la BBDD es una entidad de la vista del cliente

///////////////
// FUNCTIONS //
///////////////
const getOrigins = async () => {

    let connection = await connections.connectDB();
    let query = 'SELECT DISTINCT `country` FROM `breweries` ORDER BY `country`';
    let [rows] = await connection.execute(query);

    let countries = [];

    rows.forEach(element => {
        countries.push(element.country);
    });

    return countries;
}

const getCategories = async () => {

    let connection = await connections.connectDB();
    let query = 'SELECT `cat_name` FROM `categories` WHERE `cat_name` NOT LIKE "none" ORDER BY `cat_name`';
    let [rows] = await connection.execute(query);

    let categories = [];

    rows.forEach(element => {
        categories.push(element.cat_name);
    });

    return categories;
}

const getStyles = async () => {

    let connection = await connections.connectDB();
    let query = 'SELECT `style_name` FROM `styles` WHERE `style_name` NOT LIKE "none" ORDER BY `style_name`';
    let [rows] = await connection.execute(query);

    let styles = [];

    rows.forEach(element => {
        styles.push(element.style_name);
    });

    return styles;
}

const getMaxAbv = async () => {

    let connection = await connections.connectDB();
    let query = 'SELECT max(`abv`) as maxAbv FROM `beers`';
    let [rows] = await connection.execute(query);

    let maxAbv;

    rows.forEach(element => {
        maxAbv = element.maxAbv;
    });

    return maxAbv;
}

const getMaxIbu = async () => {

    let connection = await connections.connectDB();
    let query = 'SELECT max(`ibu`) as maxIbu FROM `beers`';
    let [rows] = await connection.execute(query);

    let maxIbu;

    rows.forEach(element => {
        maxIbu = element.maxIbu;
    });

    return maxIbu;
}

const getMaxSrm = async () => {

    let connection = await connections.connectDB();
    let query = 'SELECT max(`srm`) as maxSrm FROM `beers`';
    let [rows] = await connection.execute(query);

    let maxSrm;

    rows.forEach(element => {
        maxSrm = element.maxSrm;
    });

    return maxSrm;
}



module.exports = {
    getOrigins,
    getCategories,
    getStyles,
    getMaxAbv,
    getMaxIbu,
    getMaxSrm
}