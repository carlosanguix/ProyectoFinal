const mysql = require("mysql2/promise");
const { dbData } = require('./keys');

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