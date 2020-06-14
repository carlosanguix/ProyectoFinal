// Main script for the beer section of the web

// Function for the button "Apply Filters"
async function buildRequest() {

    let idUSerLocalStorage = JSON.parse(localStorage.getItem('baron'));

    let beerParams = {
        beer: {
            name: nameFilter.value,
            origin: originFilter.options[originFilter.selectedIndex].value,
            category: categoryFilter.options[categoryFilter.selectedIndex].value,
            style: styleFilter.options[styleFilter.selectedIndex].value,
            minAbv: minAbvFilter.options[minAbvFilter.selectedIndex].value,
            maxAbv: maxAbvFilter.options[maxAbvFilter.selectedIndex].value,
            minIbu: minIbuFilter.options[minIbuFilter.selectedIndex].value,
            maxIbu: maxIbuFilter.options[maxIbuFilter.selectedIndex].value,
            minSrm: minSrmFilter.options[minSrmFilter.selectedIndex].value,
            maxSrm: maxSrmFilter.options[maxSrmFilter.selectedIndex].value,
        },
        orderBy: orderByFilter.options[orderByFilter.selectedIndex].value,
        page: 0,
        idUser: idUSerLocalStorage
    };
    console.log(beerParams);
    

    // ABV Filter
    if (beerParams.beer.minAbv == '') {
        beerParams.beer.minAbv = 0;
    }
    if (beerParams.beer.maxAbv == '') {
        beerParams.beer.maxAbv = maxAbvFilter.children[maxAbvFilter.children.length - 1].value;
    }
    // IBU Filter
    if (beerParams.beer.minIbu == '') {
        beerParams.beer.minIbu = 0;
    }
    if (beerParams.beer.maxIbu == '') {
        beerParams.beer.maxIbu = maxIbuFilter.children[maxIbuFilter.children.length - 1].value;
    }
    // SRM Filter
    if (beerParams.beer.minSrm == '') {
        beerParams.beer.minSrm = 0;
    }
    if (beerParams.beer.maxSrm == '') {
        beerParams.beer.maxSrm = maxSrmFilter.children[maxSrmFilter.children.length - 1].value;
    }

    let beers = await giveMeThisBeers(beerParams);

    if (document.querySelector('#paging')) {
        container.removeChild(document.querySelector('#paging'));
    }

    if (document.querySelector('#noBeers')) {
        document.querySelector('#beersContainer').removeChild(document.querySelector('#noBeers'));
    }

    if (beers.length != 0) {

        buildBeers(beers, beerParams);

        if (beers.totalNumberOfBeers > 10) {

            createPagination(beers, beerParams);
        }
    } else {
        console.log('hola');

        document.querySelector('#beersContainer').innerHTML = '';
        
        let advertisement = document.createElement('div');
        advertisement.id = 'noBeers';
        advertisement.innerHTML += `
        <p>there are no beers that meet the requirements</p>`;
        document.querySelector('#beersContainer').appendChild(advertisement);
        console.log('none');
    }
}

// Function for build the request
async function giveMeThisBeers(beerParams) {

    let hostLocation = window.location.hostname;
    let portNumber = window.location.port;
    let url = 'http://' + hostLocation + ':' + portNumber + '/beers';
    let settings = {
        method: 'POST',
        body: JSON.stringify(beerParams),
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

    console.log(beers);
    

    return beers;
}

// Function for build the beers and then show them
function buildBeers(beers) {

    beersContainer.innerHTML = '';

    beers.allBeers.forEach(beer => {
        let cardBeer = document.createElement('div');
        cardBeer.classList = 'cardBeer';
        cardBeer.id = beer.id;

        console.log(beer.filepath);
        

        let imgSrc = 'unknown.png';
        if (beer.filepath != "") {
            imgSrc = beer.filepath;
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
                star.classList.add('lighting')
            }
            starRating.appendChild(star);
        }
        cardBeer.appendChild(starRating);
        beersContainer.appendChild(cardBeer);
        if (beer.favorite == true) {
            cardBeer.children[0].children[1].children[0].classList.add('lighting');
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

async function openBeerInNewWindow(beer, cardBeer) {
    console.log(beer);
    console.log(cardBeer);
    
    let hostLocation = window.location.hostname;
    let portNumber = window.location.port;
    let url = "http://" + hostLocation + ":" + portNumber + "/beers/" + beer.id;

    window.location.href = url
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


    if (cardBeer.children[0].children[1].children[0].classList.contains('lighting')) {
        cardBeer.children[0].children[1].children[0].classList.remove('lighting');
        sendFavoriteRequestInfo(beer, cardBeer);
    } else {
        cardBeer.children[0].children[1].children[0].classList.add('lighting');
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
function createPagination(beers, beerParams) {

    let paging = document.createElement('div');
    paging.id = 'paging';
    paging.innerHTML += `
        <div id="prevPage" href="#filter" class="pag">&laquo;</div>
        <div id="pagingNumber" value=0 class="pag">1</div>
        <div id="nextPage" href="#filter" class="pag">&raquo;</div>`;

    container.appendChild(paging);

    createPaginationEvents(beers, beerParams);
}

// Function to give events to pagination elements
function createPaginationEvents(beers, beerParams) {

    let numPage = parseInt(document.querySelector('#pagingNumber').getAttribute('value'));

    document.querySelector('#nextPage').onclick = () => { chargeNextPagingBeers(beers, beerParams) };
    document.querySelector('#prevPage').onclick = () => { chargePreviousPagingBeers(beers, beerParams) };
}

// Function for the button "next" of pagination
async function chargeNextPagingBeers(beers, beerParams) {

    window.scrollTo(0, 0);

    let numPage = parseInt(document.querySelector('#pagingNumber').getAttribute('value'));

    if (numPage + 1 < beers.totalNumberOfBeers / 20) {
        numPage += 1;
        document.querySelector('#pagingNumber').setAttribute('value', numPage);
        document.querySelector('#pagingNumber').innerHTML = numPage + 1;

        beerParams.page = numPage;

        let beers = await giveMeThisBeers(beerParams);

        buildBeers(beers);
    }
}

// Function for the button "previous" of pagination
async function chargePreviousPagingBeers(beers, beerParams) {

    window.scrollTo(0, 0);

    let numPage = parseInt(document.querySelector('#pagingNumber').getAttribute('value'));

    if (numPage != 0) {
        numPage -= 1;
        document.querySelector('#pagingNumber').setAttribute('value', numPage);
        document.querySelector('#pagingNumber').innerHTML = numPage + 1;

        beerParams.page = numPage;

        let beers = await giveMeThisBeers(beerParams);

        buildBeers(beers);
    }
}


//////////
// INIT //
//////////
function initializeVariables() {

    container = document.querySelector('#container');

    beersContainer = document.querySelector('#beersContainer');

    nameFilter = document.querySelector('#nameFilter');
    originFilter = document.querySelector('#originFilter');
    categoryFilter = document.querySelector('#categoryFilter');
    styleFilter = document.querySelector('#styleFilter');
    minAbvFilter = document.querySelector('#minAbvFilter');
    maxAbvFilter = document.querySelector('#maxAbvFilter');
    minIbuFilter = document.querySelector('#minIbuFilter');
    maxIbuFilter = document.querySelector('#maxIbuFilter');
    minSrmFilter = document.querySelector('#minSrmFilter');
    maxSrmFilter = document.querySelector('#maxSrmFilter');

    orderByFilter = document.querySelector('#orderBy');
    applyFilters = document.querySelector('#applyFilters');

    filterInfo = document.querySelector('#filterInfo');
}

function giveEvents() {

    applyFilters.onclick = () => { buildRequest() };

    filterInfo.onmouseover = () => {
        document.querySelector('#info').classList.add('visible');
    }

    filterInfo.onmouseout = () => {
        document.querySelector('#info').classList.remove('visible');
    }

    minAbvFilter.onchange = (ev) => { changeMaxAbvFilterOptions(ev) };
    maxAbvFilter.onchange = (ev) => { changeMinAbvFilterOptions(ev) };
    minIbuFilter.onchange = (ev) => { changeMaxIbuFilterOptions(ev) };
    maxIbuFilter.onchange = (ev) => { changeMinIbuFilterOptions(ev) };
    minSrmFilter.onchange = (ev) => { changeMaxSrmFilterOptions(ev) };
    maxSrmFilter.onchange = (ev) => { changeMinSrmFilterOptions(ev) };
}

function changeMaxAbvFilterOptions(ev) {
    console.log(ev.target.options[ev.target.selectedIndex].value);
}
function changeMinAbvFilterOptions(ev) {
    console.log(ev.target.options[ev.target.selectedIndex].value);
}
function changeMaxIbuFilterOptions(ev) {
    console.log(ev.target.options[ev.target.selectedIndex].value);
}
function changeMinIbuFilterOptions(ev) {
    console.log(ev.target.options[ev.target.selectedIndex].value);
}
function changeMaxSrmFilterOptions(ev) {
    console.log(ev.target.options[ev.target.selectedIndex].value);
}
function changeMinSrmFilterOptions(ev) {
    console.log(ev.target.options[ev.target.selectedIndex].value);
}


///////////////
// VARIABLES //
///////////////
let container;
let beersContainer
let nameFilter;
let originFilter;
let abvFiltercategoryFilter;
let styleFilter;
let minAbvFilter;
let maxAbvFilter;
let minIbuFilter;
let maxIbuFilter;
let minSrmFilter;
let maxSrmFilter;
let orderByFilter;
let applyFilters;
let filterInfo;

initializeVariables();
giveEvents();
buildRequest();