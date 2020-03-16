// Requires
const dbClass = require('../connections/database');
let database = new dbClass();

exports.findAllBeers = (req, res) => {

    // database.connect();
    res.send('findAll');
}

exports.findOneBeer = (req, res) => {

    // database.connect();
    res.send(req.params.idBeer);
}

// Function to find one comment


// Function to find all replies to one comment


// Function to find