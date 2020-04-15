// Requires
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
        
    resp = {
        validation: true,
        name: user,
        id: 2
    }

    let j = JSON.stringify(resp);
    console.log(j);
    
    res.cookie('baron', resp.name);
    res.send(resp);
}

exports.signUp = (req, res) => {

    let userExist = functionsDB.userExist(req.body.username);
    if (userExist) {
        console.log('existe');
    } else {
        console.log('no existe');
    }
    
    
    res.send(true);
}