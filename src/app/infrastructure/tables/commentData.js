// Object comment for infrastructure layer

const commentData = (id, idUser, idBeer, comment) => {
    return {
        id: id,
        idUser: idUser,
        idBeer: idBeer,
        comment: comment
    }
}

module.exports = {
    commentData
}