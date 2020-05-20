// Object comment for view layer

const commentViewModel = (id, idUser, userName, comment) => {
    return {
        id: id,
        idUser: idUser,
        userName, userName,
        comment: comment
    }
}

module.exports = {
    commentViewModel
}