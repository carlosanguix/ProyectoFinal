// Object voting for domain layer

const votingDomain = (idUser, idBeer, score) => {
    return {
        idUser: idUser,
        idBeer: idBeer,
        score: score
    }
}

module.exports = {
    votingDomain
}