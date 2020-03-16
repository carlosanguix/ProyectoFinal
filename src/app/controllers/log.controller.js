// Requires
const dbClass = require('../connections/database');
const md5 = require('crypto-md5');
let database = new dbClass();

exports.signIn = (req, res) => {

    let user = req.body.username;
    let password = md5(req.body.password);

    console.log(user + "" + password);
    
    // Comprobar usuario y contraseña introducidos en la BBDD
    
    // Usuario incorrecto, la contraseña no tiene sentido comprobarla, devolvemos "el usuario no existe"
    // Usuario correcto
        // Pero la contraseña es incorrecta, devolvemos "contraseña incorrecta"
        // Contraseña correcta, redireccionamos al usuario ala web principal
        

    res.send(true);
}

exports.signUp = (req, res) => {

    res.send('signUp');
}