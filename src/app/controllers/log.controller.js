// Requires
//const dbClass = require('../connections/database');
//let database = new dbClass();
//const md5 = require('crypto-md5');
const crypt = require('crypto-md5');
const functionsDB = require('../connections/manager');

exports.signIn = async (req, res) => {

    let user = req.body.username;
    let password = crypt(req.body.password).toString();

    console.log(user + "" + password);
    
    // Comprobar usuario y contraseña existen en la BBDD
    // Usuario incorrecto, la contraseña no tiene sentido comprobarla, devolvemos "el usuario no existe"
    // Usuario correcto
        // Pero la contraseña es incorrecta, devolvemos "contraseña incorrecta"
        // Contraseña correcta, redireccionamos al usuario ala web principal
        
    res.send(true);
}

exports.signUp = (req, res) => {

    console.log('sing up');
    
    let suData = req.body;
    console.log(suData);

    let crypted = crypt(suData.password);
    console.log(crypted);
    
    
    
    res.send(true);
}