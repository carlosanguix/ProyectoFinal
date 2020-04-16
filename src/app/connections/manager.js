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

const getPassword = async (password) => {

    let connecttion = await connectDB();

    let [rows] = await connecttion.execute('SELECT `password` FROM `users` WHERE `password` LIKE ?', [password]);

    if (rows.length != 0) {
        console.log(rows[0]);
        return rows[0];
    } else {
        return "";
    }
}

const getUserID = async (name) => {

    let connection = await connectDB();

    let [rows] = await connection.execute('SELECT `idUser` FROM `users` WHERE `name` LIKE ?', [name]);

    if (rows.length != 0) {
        console.log(rows[0]);
        return rows[0];
    } else {
        return "";
    }
}

const getUserByName = async (name) => {

    let connection = await connectDB();

    let [rows] = await connection.execute('SELECT `name` FROM `users` WHERE `name` LIKE ?', [name]);

    if (rows.length != 0) {
        console.log(rows[0].name);
        return rows[0].name;
    } else {
        return "";
    }
};

const getEmail = async (email) => {

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
}

module.exports = {
    connectDB,
    getUserByName,
    getEmail,
    createUser,
    getPassword,
    getUserID
}