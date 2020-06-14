


function initializeVariables() {

    commentBox = document.querySelector('#comments');
    comment = document.querySelector('#commentary');
    sendButton = document.querySelector('#send');
    infoButton = document.querySelector('#filterInfo');
}

function giveEvents() {

    sendButton.onclick = () => { sendCommentary() };

    infoButton.onmouseover = () => {
        document.querySelector('#infoFilter').classList.add('visible');
    }

    infoButton.onmouseout = () => {
        document.querySelector('#infoFilter').classList.remove('visible');
    }
}

function buildTrashButton() {

    let comments = document.querySelectorAll('.comment');

    let localIdUser = JSON.parse(localStorage.getItem('baron'));

    comments.forEach(comment => {
        if (localIdUser == comment.children[0].id) {
            console.log(comment.children[0]);
            comment.innerHTML += `<img src="../img/trash.png">`;
            comment.children[2].onclick = (ev) => { deleteComment(ev) };
        }
    });
}

async function deleteComment(ev) {
    console.log(ev.target.parentNode.id)
    let element = document.getElementById(ev.target.parentNode.id);
    element.remove();
    console.log(element);

    let body = {
        idComment: ev.target.parentNode.id
    }

    let hostLocation = window.location.hostname;
    let portNumber = window.location.port;
    let url = 'http://' + hostLocation + ':' + portNumber + '/oneBeer/removeComment';
    let settings = {
        method: 'POST',
        body: JSON.stringify(body),
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }

    
    let URLfetch = await fetch(url, settings).catch((err) => {
        console.log(err);
    });
/*
    let beerCommented = await URLfetch.json().catch((err) => {
        console.log(err);
    });*/


}

async function sendCommentary() {

    if (comment.value != "") {
        console.log(comment.value);
        console.log(document.querySelector('#box').children[3].getAttribute('idbeer'));

        let body = {
            idUser: JSON.parse(localStorage.getItem('baron')),
            idBeer: document.querySelector('#box').children[3].getAttribute('idbeer'),
            comment: comment.value
        }

        let hostLocation = window.location.hostname;
        let portNumber = window.location.port;
        let url = 'http://' + hostLocation + ':' + portNumber + '/beers/commentBeer';
        let settings = {
            method: 'POST',
            body: JSON.stringify(body),
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }

        let URLfetch = await fetch(url, settings).catch((err) => {
            console.log(err);
        });

        let beerCommented = await URLfetch.json().catch((err) => {
            console.log(err);
        });

        console.log(beerCommented);


        if (beerCommented.commented) {
            showComment(beerCommented);
        }
    }
}

function showComment(beerCommented) {

    let newComment = document.createElement('div');
    newComment.id = beerCommented.idComment
    newComment.classList = 'comment';
    newComment.innerHTML = `
    <div class="user">
        <img src="../img/user.png">
        <span>${beerCommented.username}</span>
    </div>
    <p>${comment.value}</p>
    <img src="../img/trash.png">`;

    newComment.children[2].onclick = (ev) => { deleteComment(ev) }
    commentBox.appendChild(newComment)
}

let commentBox;
let comment;
let sendButton;
let infoButton;

initializeVariables();
buildTrashButton();
giveEvents();