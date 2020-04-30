//////////////
// REQUIRES //
//////////////
// Functions
const beerService = require('../../domain/services/beerService');
// Models
const {beerRequestViewModel} = require('../models/beerRequestViewModel');










// PRUEBAS
const connections = require('../../infrastructure/connection');

const findBeerByName = async (req, res) => {

    let connection = await connections.connectDB();
    let query = 'SELECT * FROM `beers` WHERE `name` LIKE ?'
    let [rows] = await connection.execute(query, [req.query.name]);

    rows.forEach(element => {
        console.log(element);
    });
}

const collectInputFields = async (req, res) => {

    let countries = await collectCountries();
    let categories = await collectCategories();
    let styles = await collectStyles();

    let fields = {
        countries: countries,
        categories: categories,
        styles: styles
    }

    res.send(fields);
    // console.log('///////////////// COUNTRIES');
    // console.log(countries);
    // console.log('///////////////// CATEGORIES');
    // console.log(categories);
    // console.log('///////////////// STYLES');
    // console.log(styles);
}

async function collectStyles() {

    let connection = await connections.connectDB();
    let query = 'SELECT `style_name` FROM `styles`';
    let [rows] = await connection.execute(query);

    let styles = [];

    rows.forEach(element => {
        styles.push(element.style_name);
    });

    return styles;
}

async function collectCategories() {

    let connection = await connections.connectDB();
    let query = 'SELECT `cat_name` FROM `categories`';
    let [rows] = await connection.execute(query);

    let categories = [];

    rows.forEach(element => {
        categories.push(element.cat_name);
    });

    return categories;
}

async function collectCountries() {

    let connection = await connections.connectDB();
    let query = 'SELECT DISTINCT `country` FROM `breweries` ORDER BY `country`';
    let [rows] = await connection.execute(query);

    let countries = [];

    rows.forEach(element => {
        countries.push(element.country);
    });

    return countries;
}

module.exports = {
    findBeerByName,
    collectInputFields
}