function initializeVariables() {

    liked = document.querySelector('#liked');
    voted = document.querySelector('#voted');
}

function giveEvents() {

    liked.onclick = openPage;
    voted.onclick = openPage;
}

function openPage() {

    let tabcontent = document.querySelectorAll(".tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    let tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
        tablinks[i].classList.remove('lighting');
    }

    document.querySelector('#' + this.id).classList.add('lighting');
    document.querySelector('#' + this.id + 'Container').style.display = "flex";

    let containerBeers = document.querySelector('#' + this.id + 'Container');

    getMyBeers(containerBeers);
}

async function getMyBeers(containerBeers) {

    let type;

    console.log(containerBeers.id);


    if (containerBeers.id == 'likedContainer') {
        type = 'liked';
    } else {
        type = 'voted';
    }

    let params = {
        type: type,
        page: 0,
        idUser: JSON.parse(localStorage.getItem('baron'))
    };

    let beers = await giveMeThisBeers(params);

    if (document.querySelector('#paging')) {
        container.removeChild(document.querySelector('#paging'));
    }

    if (document.querySelector('#noBeers')) {
        document.querySelector('#' + containerBeers.id).removeChild(document.querySelector('#noBeers'));
    }

    if (beers.length != 0) {

        buildBeers(beers, containerBeers);

        if (beers.totalNumberOfBeers > 10) {

            createPagination(beers, params);
        }
    } else {
        console.log('hola');

        document.querySelector('#' + containerBeers.id).innerHTML = '';

        let advertisement = document.createElement('div');
        advertisement.id = 'noBeers';
        advertisement.innerHTML += `
        <p>there are no beers that meet the requirements</p>`;
        document.querySelector('#' + containerBeers.id).appendChild(advertisement);
        console.log('none');
    }

    console.log(beers);
}

async function giveMeThisBeers(params) {

    let hostLocation = window.location.hostname;
    let portNumber = window.location.port;
    let url = 'http://' + hostLocation + ':' + portNumber + '/myProfile/' + params.type;
    console.log(url);

    let settings = {
        method: 'POST',
        body: JSON.stringify(params),
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }

    let URLfetch = await fetch(url, settings).catch((err) => {
        console.log(err);
    });

    let beers = await URLfetch.json().catch((err) => {
        console.log(err);
    });

    return beers;
}

function buildBeers(beers, containerBeers) {

    document.querySelector('#' + containerBeers.id).innerHTML = '';

    beers.allBeers.forEach(beer => {
        let cardBeer = document.createElement('div');
        cardBeer.classList = 'cardBeer';
        cardBeer.id = beer.id;

        let imgSrc = 'unknown.png';
        if (beers.filepath != undefined) {
            imgSrc = beers.filepath;
        }

        cardBeer.innerHTML += `
        <div class="photoAndLike">
            <div class="photo">
                <img src="../img/${imgSrc}">
            </div>
            <div class="fav-btn">
                <span href="" class="favme dashicons dashicons-heart"></span>
            </div>
        </div>
        <div class="name">
            <span>${beer.name}</span>
        </div>`;

        let starRating = document.createElement('div');
        starRating.classList = 'star-rating';

        for (let i = 5; i > 0; i--) {
            let star = document.createElement('span');
            star.id = beer.name + i;
            star.setAttribute('value', i);
            star.innerText = '★';
            star.classList.add('star');

            if (beer.score >= i) {
                star.classList.add('starLighting')
            }
            starRating.appendChild(star);
        }
        cardBeer.appendChild(starRating);
        document.querySelector('#' + containerBeers.id).appendChild(cardBeer);
        if (beer.favorite == true) {
            cardBeer.children[0].children[1].children[0].classList.add('hearthLighting');
        }
        giveBeerEvents(beer, cardBeer);
    });
}

function giveBeerEvents(beer, cardBeer) {

    let favoriteButton = cardBeer.children[0].children[1].children[0];
    favoriteButton.onclick = (ev) => { markBeerAsFavorite(beer, cardBeer) };

    let stars = cardBeer.children[2];
    for (let i = 0; i < stars.children.length; i++) {
        stars.children[i].onclick = (ev) => { sendScore(beer.id, parseInt(stars.children[i].getAttribute('value'))) }
    }

    cardBeer.children[0].children[0].children[0].onclick = (ev) => { openBeerInNewWindow(beer, cardBeer) };
}

async function sendScore(idBeer, score) {

    console.log(idBeer, score);
    let vote = {
        idUser: JSON.parse(localStorage.getItem('baron')),
        idBeer: idBeer,
        score: score
    }

    let hostLocation = window.location.hostname;
    let portNumber = window.location.port;
    let url = 'http://' + hostLocation + ':' + portNumber + '/beers/voteBeer';
    let settings = {
        method: 'POST',
        body: JSON.stringify(vote),
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }

    let URLfetch = await fetch(url, settings).catch((err) => {
        console.log(err);
    });

    let beerHasBeenVoted = await URLfetch.text().catch((err) => {
        console.log(err);
    });

    console.log(beerHasBeenVoted);
}

function markBeerAsFavorite(beer, cardBeer) {


    if (cardBeer.children[0].children[1].children[0].classList.contains('hearthLighting')) {
        cardBeer.children[0].children[1].children[0].classList.remove('hearthLighting');
        sendFavoriteRequestInfo(beer, cardBeer);
    } else {
        cardBeer.children[0].children[1].children[0].classList.add('hearthLighting');
        sendFavoriteRequestInfo(beer);
    }
}

async function sendFavoriteRequestInfo(beer) {

    let favoriteInfo = {
        idUser: JSON.parse(localStorage.getItem('baron')),
        idBeer: beer.id
    }

    let hostLocation = window.location.hostname;
    let portNumber = window.location.port;
    let url = 'http://' + hostLocation + ':' + portNumber + '/beers/favorite';
    let settings = {
        method: 'POST',
        body: JSON.stringify(favoriteInfo),
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }

    let URLfetch = await fetch(url, settings).catch((err) => {
        console.log(err);
    });

    let favoriteStatus = await URLfetch.json().catch((err) => {
        console.log(err);
    });


}

// Function to create the pagination elements
function createPagination(beers, params) {

    let paging = document.createElement('div');
    paging.id = 'paging';
    paging.innerHTML += `
        <div id="prevPage" class="pag">&laquo;</div>
        <div id="pagingNumber" value=0 class="pag">1</div>
        <div id="nextPage" class="pag">&raquo;</div>`;

    container.appendChild(paging);

    createPaginationEvents(beers, params);
}

// Function to give events to pagination elements
function createPaginationEvents(beers, params) {

    let numPage = parseInt(document.querySelector('#pagingNumber').getAttribute('value'));

    document.querySelector('#nextPage').onclick = () => { chargeNextPagingBeers(beers, params) };
    document.querySelector('#prevPage').onclick = () => { chargePreviousPagingBeers(beers, params) };
}

// Function for the button "next" of pagination
async function chargeNextPagingBeers(beers, params) {

    let numPage = parseInt(document.querySelector('#pagingNumber').getAttribute('value'));

    if (numPage + 1 < beers.totalNumberOfBeers / 20) {
        numPage += 1;
        document.querySelector('#pagingNumber').setAttribute('value', numPage);
        document.querySelector('#pagingNumber').innerHTML = numPage + 1;

        params.page = numPage;

        let beers = await giveMeThisBeers(params);

        let container = document.querySelector('#' + params.type + 'Container');

        buildBeers(beers, container);
    }
}

// Function for the button "previous" of pagination
async function chargePreviousPagingBeers(beers, params) {

    let numPage = parseInt(document.querySelector('#pagingNumber').getAttribute('value'));

    if (numPage != 0) {
        numPage -= 1;
        document.querySelector('#pagingNumber').setAttribute('value', numPage);
        document.querySelector('#pagingNumber').innerHTML = numPage + 1;

        params.page = numPage;

        let beers = await giveMeThisBeers(params);

        let container = document.querySelector('#' + params.type + 'Container');
        
        buildBeers(beers, container);
    }
}


let liked;
let voted;

document.querySelector('.tabcontent').style.display='none';
initializeVariables();
giveEvents();
