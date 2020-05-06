// Functions for DB connect

//////////////
// REQUIRES //
//////////////
// Usability
const mysql = require("mysql2/promise");
// Models
const { dbData } = require('./keys');

///////////////
// FUNCTIONS //
///////////////
const connectDB = async () => {

    let config = {
        host: dbData.host,
        user: dbData.user,
        password: dbData.password,
        database: dbData.database
    };

    return await mysql.createConnection(config);
}

module.exports = {
    connectDB
}