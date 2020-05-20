


function initializeVariables() {

    comment = document.querySelector('#commentary');
    sendButton = document.querySelector('#send');
}

function giveEvents() {

    sendButton.onclick = () => {sendCommentary()};
}

function sendCommentary() {

    console.log(comment.value);
    
}

let comment;
let sendButton;

initializeVariables();
giveEvents();