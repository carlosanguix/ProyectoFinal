
const mysql = require("mysql");
const { dbData } = require('../../keys');
const md5 = require('crypto-md5');

const connectDB = async () => {

    let config = {
        host: dbData.host,
        user: dbData.user,
        password: dbData.password,
        database: dbData.database
    };

    return await mysql.createConnection(config);
}

const userExist = async(user, password) => {

    let connection = connectDB();
}

const createUser = async(suData) => {

    let username = suData.user;
    let passwordCrypted = md5(suData.password);
    let mail = suData.email;

    let connection = connectDB();

    
    let sql = `INSERT INTO users (${user}, ${password})`;
}




module.exports = {
    connectDB
}