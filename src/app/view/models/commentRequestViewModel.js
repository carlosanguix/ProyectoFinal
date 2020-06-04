// Object commentRequest for view layer

const commentRequestViewModel = (idUser, idBeer, comment) => {
    return {
        idUser: idUser,
        idBeer: idBeer,
        comment: comment
    }
}

module.exports = {
    commentRequestViewModel
}