function giveEvents() {
    // navHome.onclick = () => {window.location.href = "http://localhost:3003/home";}
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].onclick = loadItem;
    }
}

function loadItem(ev) {

    document.querySelector('#container'). innerHTML = "";

    for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove('lighting');
    }

    ev.target.classList.add('lighting');
}

function init() {

    navItems = document.querySelector('#nav').children;
    
    giveEvents();
}

let navItems;
let navHome;
let navBeers;
let navMyProfile;

window.onload = init;