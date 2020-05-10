
async function buildRequest() {

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
        page: 0
    };

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
        // console.log(err);
    });

    if (beers != null) {
        buildBeers(beers, beerParams);
    } else {
        console.log('none');
    }
}

function buildBeers(beers, beerParams) {
    beers.allBeers.forEach(beer => {
        console.log(beer);
    });
    console.log(beers.totalNumberOfBeers / 10);

    if (beers.totalNumberOfBeers > 10) {
        createPagination(beers, beerParams);
    }
}

function createPagination(beers, beerParams) {

    container.innerHTML += `
    <div id="paging">
        <div id="prevPage" class="pag">&laquo;</div>
        <div id="pagingNumber" value=0 class="pag">1</div>
        <div id="nextPage" class="pag">&raquo;</div>
    </div>`;

    createPaginationEvents(beers, beerParams);
}

function createPaginationEvents(beers, beerParams) {

    let numPage = parseInt(document.querySelector('#pagingNumber').getAttribute('value'));
    console.log(numPage);

    document.querySelector('#nextPage').onclick = () => { chargeNextPagingBeers(beers, beerParams) };
}

function chargeNextPagingBeers(beers) {

    let numPage = parseInt(document.querySelector('#pagingNumber').getAttribute('value'));
    
    if (numPage + 1 < beers.totalNumberOfBeers / 10) {
        document.querySelector('#pagingNumber').setAttribute('value', numPage + 1);
        document.querySelector('#pagingNumber').innerHTML = numPage + 2;

        chargeNextBeers(numPage, beerParams);
    }
}

function chargeNextBeers(page) {


}

function initializeVariables() {

    container = document.querySelector('#container');

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
}

function giveEvents() {

    applyFilters.onclick = () => { buildRequest() };
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

let container;
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

initializeVariables();
giveEvents();