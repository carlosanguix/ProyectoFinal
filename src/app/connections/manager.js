const mysql = require("mysql2/promise");
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

const userExist = async (name) => {

    let connection = await connectDB();

    let [rows, fields] = await connection.execute('SELECT `name` FROM `users` WHERE `name` like ?', [name]);
    
    if (rows.length != 0) {
        console.log(rows[0].name);
    }
};



const emailExist = (email) => {


}

const createUser = (suData) => {

    userExist(suData.username);


}

module.exports = {
    connectDB,
    userExist
}