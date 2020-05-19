// Object voting for view layer

const votingRequestViewModel = (idUser, idBeer, score) => {
    return {
        idUser: idUser,
        idBeer: idBeer,
        score: score
    }
}

module.exports = {
    votingRequestViewModel
}