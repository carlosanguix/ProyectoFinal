// Requires
const crypt = require('crypto-md5');
const functionsDB = require('../connections/manager');

exports.signIn = async (req, res) => {

    //console.log(req.body.username + ", " + req.body.password);
    // ID, usuario y contraseña incorrectos al inicio
    let coincidences = [false, false];
    let id = -1;

    // Comprobar usuario y contraseña coinciden con algun usuario introducido en la BBDD
    let nameUser = await functionsDB.getUserByName(req.body.username);
    let passUser = await functionsDB.getPassword(req.body.password);
    console.log('userpass' +passUser.password);
    console.log('username' +nameUser);

    // Usuario correcto
    if (req.body.username == nameUser) {
        coincidences[0] = true;
    }
    // Contraseña correcta
    if (req.body.password == passUser.password) {
        coincidences[1] = true;
    }
    // Todo correcto, conseguimos el ID
    if (coincidences[0] && coincidences[1]) {
        id = await functionsDB.getUserID(req.body.username);
    }
    
    let respuesta = {
        correctData: coincidences,
        cookie: id.idUser
    }

    res.send(respuesta);




/*
    resp = {
        validation: true,
        name: user,
        id: 2
    }

    let j = JSON.stringify(resp);
    console.log(j);

    res.cookie('baron', resp.name);
    res.send(resp);*/
}

exports.signUp = async (req, res) => {

    let coincidences = [false, false];

    let name = req.body.username;
    let email = req.body.email;
    
    let userExists = await functionsDB.getUserByName(name);
    let emailExists = await functionsDB.getEmail(email);

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