// Object voting for infrastructure layer

const votingData = (idUser, idBeer, score) => {
    return {
        idUser: idUser,
        idBeer: idBeer,
        score: score
    }
}

module.exports = {
    votingData
}