
function initializeVariables() {
    logoutButton = document.querySelector('#logout');
}

function giveEvents() {

    logoutButton.onclick = () => { logoutClient(); }
}

function logoutClient() {

    window.localStorage.removeItem('baron');

    let url = "http://localhost:3003";

    window.location.href = url
}

let logoutButton;

initializeVariables();
giveEvents();