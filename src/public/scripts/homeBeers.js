
function initializeVariables() {

    nameFilter = document.querySelector('#nameFilter');
    originFilter = document.querySelector('#originFilter');
    categoryFilter = document.querySelector('#categoryFilter');
    styleFilter = document.querySelector('#styleFilter');
    minAbvFilter = document.querySelector('#minAbvFilter');
    maxAbvFilter = document.querySelector('#maxAbvFilter');
    minIbuFilter = document.querySelector('#minIbuFilter');
    maxIbuFilter = document.querySelector('#maxIbuFilter');
    minSpmFilter = document.querySelector('#minSpmFilter');
    maxSpmFilter = document.querySelector('#maxSpmFilter');
    minUpcFilter = document.querySelector('#minUpcFilter');
    maxUpcFilter = document.querySelector('#maxUpcFilter');
    orderByFilter = document.querySelector('#orderBy');
    applyFilters = document.querySelector('#applyFilters');
}


function giveEvents() {

    applyFilters.onclick = () => { buildRequest() };
}

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
            minSpm: minSpmFilter.options[minSpmFilter.selectedIndex].value,
            maxSpm: maxSpmFilter.options[maxSpmFilter.selectedIndex].value,
            minUpc: minUpcFilter.options[minUpcFilter.selectedIndex].value,
            maxUpc: maxUpcFilter.options[maxUpcFilter.selectedIndex].value
        },
        orderBy: orderByFilter.options[orderByFilter.selectedIndex].value
    };

    console.log(beerParams);

    let url = `http://localhost:3003/beers`;
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

    let response = await URLfetch.json();

    console.log(response);
}



let nameFilter;
let originFilter;
let abvFiltercategoryFilter;
let styleFilter;
let minAbvFilter;
let maxAbvFilter;
let minIbuFilter;
let maxIbuFilter;
let minSpmFilter;
let maxSpmFilter;
let minUpcFilter;
let maxUpcFilter;
let orderByFilter;

initializeVariables();
giveEvents();