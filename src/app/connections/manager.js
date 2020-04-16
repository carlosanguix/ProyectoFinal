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

const userExists = async (name) => {

    let connection = await connectDB();

    let [rows] = await connection.execute('SELECT `name` FROM `users` WHERE `name` like ?', [name]);

    if (rows.length != 0) {
        console.log(rows[0].name);
        return rows[0].name;
    } else {
        return "";
    }
};

const emailExists = async (email) => {

    let connection = await connectDB();

    let [rows] = await connection.execute('SELECT `email` FROM `users` WHERE `email` like ?', [email]);
    
    if (rows.length != 0) {
        console.log(rows[0].email);
        return rows[0].email;
    } else {
        return "";
    }
};

const createUser = async (suData) => {

    let connection = await connectDB();
    
    let [rows] = await connection.execute('INSERT INTO `users` (`name`, `email`, `password`) VALUES (?, ?, ?)', [suData.username, suData.email, suData.password]);

    // console.log(rows);
    
}

module.exports = {
    connectDB,
    userExists,
    emailExists,
    createUser
}