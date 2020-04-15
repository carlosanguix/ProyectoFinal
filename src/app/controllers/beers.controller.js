// Requires
let db = require('../connections/manager');

exports.findAllBeers = async (req, res) => {

    //database.connect();
    //res.send('findAll');
    //database.close();

    let connection = await db.connectDB();
    res.send('findAll');
    connection.end();
}

exports.findOneBeer = (req, res) => {

    // database.connect();
    res.send(req.params.idBeer);
}

// Function to find one comment


// Function to find all replies to one comment


// Function to find