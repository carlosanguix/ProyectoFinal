// User functions for domain layer

//////////////
// REQUIRES //
//////////////
// Usability
const userRepository = require('../../infrastructure/repositories/userRepository');
// Models
const {userDomain} = require('../entities/userDomain');

const giveMeId = async (userRequest) => {

    const user = userDomain(userRequest.username, userRequest.password, userRequest.email);
    let userId = await userRepository.getID(user);
    return userId;
}

const giveMeUsername = async (userRequest) => {

    const user = userDomain(userRequest.username, userRequest.password, userRequest.email);
    let storedUsername = await userRepository.getUsername(user);
    return storedUsername;
}

const giveMePassword = async (userRequest) => {

    const user = userDomain(userRequest.username, userRequest.password, userRequest.email);
    let storedPAssword = await userRepository.getPassword(user);
    return storedPAssword;
}

const giveMeEmail = async (userRequest) => {

    const user = userDomain(userRequest.username, userRequest.password, userRequest.email);
    let storedEmail = await userRepository.getEmail(user);
    return storedEmail;
}

const createUser = async (userRequest) => {

    const user = userDomain(userRequest.username, userRequest.password, userRequest.email);
    let userCreatedID = await userRepository.createUser(user);
    return userCreatedID;
}


module.exports = {
    giveMeId,
    giveMeUsername,
    giveMePassword,
    giveMeEmail,
    createUser
}