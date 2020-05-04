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


module.exports = {
    findBeerByName
}