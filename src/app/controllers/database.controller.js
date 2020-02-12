// Requires
const dbClass = require('../model/birras.model');
let database = new dbClass();

exports.findAllBeers = (req, res) => {

    // Function to find all beers
    database.connect();
    res.send('findAll');
}

exports.findOneBeer = (req, res) => {

    database.connect();
    res.send('findOneBeer');
}