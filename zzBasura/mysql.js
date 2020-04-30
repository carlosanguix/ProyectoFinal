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

const createUser = async (user) => {

    let {newUserData} = require('../infrastructure/tables/userData');
    const newUser = newUserData(user.username, user.password, user.email)
    
    let connection = await connectDB();
    let query = 'INSERT INTO `users` (`name`, `email`, `password`) VALUES (?, ?, ?)'
    let [rows] = await connection.execute(query, [newUser.name, newUser.email, newUser.password]);
    console.log(rows);
    
}

module.exports = {
    connectDB,
    getUserByName,
    getEmail,
    createUser,
    getPassword,
    getUserID
}