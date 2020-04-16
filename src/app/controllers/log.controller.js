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

/*
exports.signUp = async (req, res) => {

    console.log(req.body);

    let created = await functionsDB.createUser(req.body);


    res.send(true);
}*/

exports.signUp = async (req, res) => {

    let coincidences = [false, false];

    let name = req.body.username;
    let email = req.body.email;
    
    let userExists = await functionsDB.userExists(name);
    let emailExists = await functionsDB.emailExists(email);

    if (userExists == name) {
        console.log('El usuario ya existe');
        coincidences[0] = true;
    }

    if (emailExists == email) {
        console.log('El email ya existe');
        coincidences[1] = true;
    }

    if (!coincidences[0] && !coincidences[1]) {
        functionsDB.createUser(req.body);
    }

    console.log(coincidences);
    
    res.send(coincidences);
}