// Object user for infrastructure layer

const userData = (name, password, email) => {
    return {
        name: name,
        password: password,
        email: email
    }
}

module.exports = {
    userData
}