const userRequestViewModel = (username, password, email) => {
    return {
        username: username,
        password: password,
        email: email
    }
}

module.exports = {
    userRequestViewModel
}