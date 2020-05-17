
async function getTheBestRatedBeer() {

    let user = {
        user: JSON.parse(localStorage.getItem('baron'))
    }

    let hostLocation = window.location.hostname;
    let portNumber = window.location.port;
    let url = 'http://' + hostLocation + ':' + portNumber + '/beers/bestRated';
    let settings = {
        method: 'POST',
        body: JSON.stringify(user),
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }

    let URLfetch = await fetch(url, settings).catch((err) => {
        console.log(err);
    });

    let beer = await URLfetch.json().catch((err) => {
        console.log(err);
    });

    console.log(beer);

    paintMostLikedBeer(beer.beer, beer.favorite, beer.score, 'bestRated');
}

async function getTheMostLikedBeer() {

    let user = {
        user: JSON.parse(localStorage.getItem('baron'))
    }

    let hostLocation = window.location.hostname;
    let portNumber = window.location.port;
    let url = 'http://' + hostLocation + ':' + portNumber + '/beers/mostFavorite';
    let settings = {
        method: 'POST',
        body: JSON.stringify(user),
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }

    let URLfetch = await fetch(url, settings).catch((err) => {
        console.log(err);
    });

    let beer = await URLfetch.json().catch((err) => {
        console.log(err);
    });

    console.log(beer);
    
    paintMostLikedBeer(beer.beer, beer.favorite, beer.score, 'mostLiked');
}

function paintMostLikedBeer(beer, favorite, score, place) {

    console.log(place);

    let cardBeer = document.createElement('div');
    cardBeer.classList = 'cardBeer';
    cardBeer.id = beer.id;

    let imgSrc = 'unknown.png';
    if (beer.filepath != '') {
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

        if (score >= i) {
            star.classList.add('lighting')
        }
        starRating.appendChild(star);
    }
    cardBeer.appendChild(starRating);

    if (place == 'mostLiked') {
        document.querySelector('#mostLikedBeer').appendChild(cardBeer);
    } else if(place == 'bestRated') {
        document.querySelector('#bestRatedBeer').appendChild(cardBeer);
    }
    if (favorite == true) {
        cardBeer.children[0].children[1].children[0].classList.add('lighting');
    }
    giveBeerEvents(beer, cardBeer);
};


function giveBeerEvents(beer, cardBeer) {

    let favoriteButton = cardBeer.children[0].children[1].children[0];
    favoriteButton.onclick = (ev) => { markBeerAsFavorite(beer, cardBeer) };

    let stars = cardBeer.children[2];
    for (let i = 0; i < stars.children.length; i++) {
        stars.children[i].onclick = (ev) => { sendScore(beer.id, parseInt(stars.children[i].getAttribute('value'))) }
    }

}

function sendScore(beer, score) {

    console.log(beer, score);
}

function markBeerAsFavorite(beer, cardBeer) {


    if (cardBeer.children[0].children[1].children[0].classList.contains('lighting')) {
        cardBeer.children[0].children[1].children[0].classList.remove('lighting');
        sendFavoriteRequestInfo(beer);
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

    console.log(favoriteInfo);
    
    

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


getTheBestRatedBeer();
getTheMostLikedBeer();