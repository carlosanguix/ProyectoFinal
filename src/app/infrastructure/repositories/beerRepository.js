// Beer functions for infrastructure layer

//////////////
// REQUIRES //
//////////////
// Usability
const connections = require('../connection');
// Models
const {beerData} = require('../tables/beerData');

///////////////
// FUNCTIONS //
///////////////
const getBeersByParams = async (beerParams, order) => {

    // TODO Tengo la misma forma del objeto hasta aqui!! No esta bien, deberia tener la forma de la BBDD
    //const dbBeer = beerData();
    

    let connection = await connections.connectDB();
    let query = 'SELECT `*` FROM `beers` WHERE `name` LIKE ?';
    let [rows] = await connection.query(query, '%' + [beerParams.name] + '%');

    if (rows.length != 0) {
        console.log(rows);
        return rows;
    } else {
        return "";
    }
}


module.exports = {
    getBeersByParams
}