// User functions for infrastructure layer

//////////////
// REQUIRES //
//////////////
// Usability
const connections = require('../connection');
// Models
let {userData} = require('../tables/userData');

///////////////
// FUNCTIONS //
///////////////
const getID = async (user) => {

    const dbUser = userData(user.name, user.password, user.email);
    
    let connection = await connections.connectDB();
    let query = 'SELECT `idUser` FROM `users` WHERE `name` LIKE ?';
    let [rows] = await connection.execute(query, [dbUser.name]);

    if (rows.length != 0) {
        console.log(rows[0].idUser);
        return rows[0].idUser;
    } else {
        return "";
    }
}

const createUser = async (user) => {
    
    const dbUser = userData(user.name, user.password, user.email);
    
    let connection = await connections.connectDB();
    let query = 'INSERT INTO `users` (`name`, `email`, `password`) VALUES (?, ?, ?)'
    let [rows] = await connection.execute(query, [dbUser.name, dbUser.email, dbUser.password]);
    
    return rows.insertId
}

const getPassword = async (user) => {

    console.log('getPassword');
    
    const dbUser = userData(user.name, user.password, user.email);

    let connection = await connections.connectDB();
    let query = 'SELECT `name`, `password` FROM `users` WHERE `name` LIKE ? AND `password` LIKE ?';
    let [rows] = await connection.execute(query, [dbUser.name, dbUser.password]);

    if (rows.length != 0) {
        console.log(rows[0].password);
        return rows[0].password;
    } else {
        return "";
    }
}

const getUsername = async (user) => {

    console.log('getUsername');

    let dbUser = userData(user.name, user.password, user.email);

    let connection = await connections.connectDB();
    let query = 'SELECT `name` FROM `users` WHERE `name` LIKE ?';
    let [rows] = await connection.execute(query, [dbUser.name]);

    if (rows.length != 0) {
        console.log(rows[0].name);
        return rows[0].name;
    } else {
        return "";
    }
}

const getEmail = async (user) => {

    console.log('getEmail');

    let dbUser = userData(user.name, user.password, user.email);

    let connection = await connections.connectDB();
    let query = 'SELECT `email` FROM `users` WHERE `email` LIKE ?';
    let [rows] = await connection.execute(query, [dbUser.email]);

    if (rows.length != 0) {
        console.log(rows[0].email);
        return rows[0].email;
    } else {
        return "";
    }
}

const getUsernameByID = async (idUser) => {

    let connection = await connections.connectDB();
    let query = 'SELECT `name` FROM `users` WHERE `idUser`=?';
    let [rows] = await connection.execute(query, [idUser]);

    if (rows.length != 0) {
        console.log(rows[0].name);
        return rows[0].name;
    } else {
        return "";
    }
}

module.exports = {
    getEmail,
    getID,
    getPassword,
    createUser,
    getUsername,
    getUsernameByID
}