//////////////
// REQUIRES //
//////////////
// Functions
const userService = require('../../domain/services/userService');
// Models
const {userRequestViewModel} = require('../models/userRequestViewModel');


///////////////
// FUNCTIONS //
///////////////
async function checkUserInDatabase(userRequest) {

    console.log(userRequest);
    // 0-username / 1-password / 2-email
    let coincidences = [false, false, false];

    let storedName = await userService.giveMeUsername(userRequest);
    if (storedName == userRequest.username) {
        console.log('El usuario existe');
        coincidences[0] = true;
    }
    
    let storedPassword = await userService.giveMePassword(userRequest);
    if (storedPassword == userRequest.password) {
        console.log('El password es correcto');
        coincidences[1] = true;
    }

    if (userRequest.email != undefined) {
        let storedEmail = await userService.giveMeEmail(userRequest);
        if (storedEmail == userRequest.email) {
            console.log('El email existe');
            coincidences[2] = true;
        }
    }

    return coincidences;
}

const signIn = async (req, res) => {

    const userRequest = userRequestViewModel(req.body.username, req.body.password, req.body.email);
    
    let coincidences = await checkUserInDatabase(userRequest);

    let idUser = -1;
    
    if (coincidences[0] && coincidences[1]) {
        idUser = await userService.giveMeId(userRequest);
    }

    let response = {
        correctData: coincidences,
        token: idUser
    }

    res.send(response);
}

const signUp = async (req, res) => {

    const userRequest = userRequestViewModel(req.body.username, req.body.password, req.body.email);

    let coincidences = await checkUserInDatabase(userRequest);

    let idUser = -1;

    if (!coincidences[0] && !coincidences[2]) {
        idUser = await userService.createUser(userRequest);
    }

    let response = {
        correctData: coincidences,
        token: idUser
    }
    
    res.send(response);
}

module.exports = {
    signIn,
    signUp
}