

function initializeVariables() {

    nameFilter = document.querySelector('#nameFilter');
    originFilter = document.querySelector('#originFilter');
    categoryFilter = document.querySelector('#categoryFilter');
    styleFilter = document.querySelector('#styleFilter');
    abvFilter = document.querySelector('#abvFilter');
    ibuFilter = document.querySelector('#ibuFilter');
    spmFilter = document.querySelector('#spmFilter');
    upcFilter = document.querySelector('#upcFilter');
    applyFilters = document.querySelector('#applyFilters');
}


function giveEvents() {

    applyFilters.onclick = () => { collectInputData() };
}

function collectInputData() {

    document.querySelectorAll('.inputFilter').forEach((element) => {
        console.log(element.value);
    });
}



let nameFilter;
let originFilter;
let categoryFilter;
let styleFilter;
let abvFilter;
let ibuFilter;
let spmFilter;
let upcFilter;
let orderByFilter;

initializeVariables();
giveEvents();