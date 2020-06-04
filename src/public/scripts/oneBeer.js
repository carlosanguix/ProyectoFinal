


function initializeVariables() {

    commentBox = document.querySelector('#comments');
    comment = document.querySelector('#commentary');
    sendButton = document.querySelector('#send');
}

function giveEvents() {

    sendButton.onclick = () => { sendCommentary() };
}

async function sendCommentary() {

    if (comment.value != "") {
        console.log(comment.value);

        let body = {
            idUser: JSON.parse(localStorage.getItem('baron')),
            idBeer: document.querySelector('#box').children[2].id,
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
            showComment(beerCommented.username);
        }
    }
}

function showComment(username) {
    
    let newComment = document.createElement('div');
    newComment.classList = 'comment';
    newComment.innerHTML = `
    <div class="user">
        <img src="../img/user.png">
        <span>${username}</span>
    </div>
    <p>${comment.value}</p>`;

    commentBox.appendChild(newComment)
}

let commentBox;
let comment;
let sendButton;

initializeVariables();
giveEvents();