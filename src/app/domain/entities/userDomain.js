// Object user for domain layer

const userDomain = (name, password, email) => {
    return {
        name: name,
        password: password,
        email: email
    }
}

module.exports = {
    userDomain
}