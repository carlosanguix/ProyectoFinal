/////////////
// SIGN IN //
/////////////

async function signInCorrectData() {

    let siData = {
        username: siUser.value,
        password: siPass.value
    };
    console.log(siData);
    

    let hostLocation = window.location.hostname;
    let portNumber = window.location.port;

    console.log(portNumber);
    

    let url = 'http://' + hostLocation + ':' + portNumber + '/signIn';
    let settings = {
        method: 'POST',
        body: JSON.stringify(siData),
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

    let lblSiUser = document.querySelector('label[for="siUser"]');
    let lblSiPass = document.querySelector('label[for="siPass"]');
    lblSiUser.innerHTML = `Username`;
    lblSiPass.innerHTML = `Password`;

    if (response.correctData[0]) {
        // Usuario existe
        console.log('usuario existe');
        if (response.correctData[1]) {
            // Contraseña correcta
            console.log('password correcta');
            // Creamos la cookie en localStorage
            localStorage.setItem('baron', JSON.stringify(response.token));
            console.log('localStorage ' + JSON.parse(localStorage.getItem('baron')));
            // Redireccionamos al usuario a la pagina principal
            windowPopupMessage();
        } else {
            // Contraseña incorrecta
            console.log('password incorrecta');
            lblSiPass.innerHTML += `<span id="lblErrorPass" class="error"> (The password is incorrect)</span>`;
        }
    } else {
        // Usuario no esta registrado
        console.log('usuario no registrado');
        lblSiUser.innerHTML += `<span id="lblErrorUser" class="error"> (The user doesn't exist)</span>`;
    }
}


/////////////
// SIGN UP //
/////////////

// Validation user Function
function validateUsername() {

    if (!/^[a-zA-Z0-9]*$/.test(suUser.value)) {
        suUser.style.boxShadow = 'inset 0px 0px 0px 2px #f00';
        suErrors[0] = false;
        // Solo mayus, minus y numb
    } else {
        if (suUser.value.length < 4) {
            suUser.style.boxShadow = 'inset 0px 0px 0px 2px #f00';
            console.log('< 5');
            suErrors[0] = false;
            // mayor o = de 5 de longitud
        } else {
            suUser.style.boxShadow = 'none';
            suErrors[0] = true;
        }
    }

    if (suUser.value.length == "") {
        suUser.style.boxShadow = 'none';
    }
}

// Validation password function
function validatePassword() {

    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/.test(suPass.value)) {
        suPass.style.boxShadow = 'none';
        suErrors[1] = true;
    } else {
        suPass.style.boxShadow = 'inset 0px 0px 0px 2px #f00';
        suErrors[1] = false;
    }

    if (suPass.value.length == "") {
        suPass.style.boxShadow = 'none';
    }
}

// Validation identical passwords function
function areSamePasswords() {

    let passRep = suPassRep.value;

    let lblPassRep = document.querySelector('label[for="suPassRepeat"]');
    lblPassRep.innerHTML = 'Repeat password';

    if (passRep == suPass.value) {
        suPassRep.style.boxShadow = 'none';
        suErrors[2] = true;
    } else {
        suPassRep.style.boxShadow = 'inset 0px 0px 0px 2px #f00';
        lblPassRep.innerHTML += '<span id="lblErrorPassRep" class="error"> (The passwords must match)</span>';
        suErrors[2] = false;
    }
}

// Validation email function
function validateEmail(mail) {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        suEmail.style.boxShadow = 'none';
        suErrors[3] = true;
    } else {
        suEmail.style.boxShadow = 'inset 0px 0px 0px 2px #f00';
        suErrors[3] = false;
    }

    if (suUser.value.length == "") {
        suUser.style.boxShadow = 'none';
    }
}

// Validation function of all fields
function signUpCorrectData() {

    console.log(suErrors);

    // Comprobamos que todos los elementos del array son true
    let checker = arr => arr.every(Boolean);

    if (checker(suErrors)) {

        let suData = {
            username: suUser.value,
            password: suPass.value,
            email: suEmail.value
        };

        createUser(suData);

    } else {
        console.log('mal');
    }
}

// Non-repeated user validation funcion
async function checkInUse(userData) {

    console.log(userData);

    let hostLocation = window.location.hostname;
    let portNumber = window.location.port;

    let url = 'http://' + hostLocation + ':' + portNumber + '/signUp';
    let settings = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let URLfetch = await fetch(url, settings).catch((err) => {
        console.log(err);
    });
    
    console.log(URLfetch.headers);
    
    let response = await URLfetch.json();
    

    return response;
}

// User creation function
async function createUser(userData) {

    let response = await checkInUse(userData);
    console.log(response);

    let lblSuUser = document.querySelector('label[for="suUser"]');
    let lblEmail = document.querySelector('label[for="suEmail"]');
    lblSuUser.innerHTML = "Username";
    lblEmail.innerHTML = "Email address";

    if (response.correctData[0]) {
        // El usuario ya existe
        lblSuUser.innerHTML += '<span id="lblErrorUser" class="error"> (The user is already in use)</span>';
    }

    if (response.correctData[2]) {
        // El email ya esta en uso
        lblEmail.innerHTML += '<span id="lblErrorMail" class="error"> (The email is already in use)</span>';
    }

    if (!response.correctData[0] && !response.correctData[2]) {
        console.log("creamos el usuario");
        // Hemos dado de alta el usuario en la BBDD
        // Informamos al usuario
        localStorage.setItem('baron', JSON.stringify(response.token));
        console.log('localStorage ' + JSON.parse(localStorage.getItem('baron')));
        windowPopupMessage();
    }
}

function windowPopupMessage() {

    setTimeout(async () => {
        let hostLocation = window.location.hostname;
        let portNumber = window.location.port;
        window.location.href = "http://" + hostLocation + ":" + portNumber + "/home";
    }, 500);

}


//////////////////////
// GLOBAL FUNCTIONS //
//////////////////////

function getTheCookie() {

    let theCookie = JSON.parse(localStorage.getItem('baron'));
    console.log(theCookie);
    return theCookie;
}


//////////
// MAIN //
//////////

function giveEvents() {

    // Sign In Events
    siButton.onclick = () => { signInCorrectData() };

    // Sign Up Events
    suUser.onblur = () => { validateUsername() }
    suUser.onkeyup = () => { validateUsername() }
    suPass.onblur = () => {
        if (suPassRep.value != "") { areSamePasswords() }
        validatePassword();
    };
    suPass.onkeyup = () => {
        if (suPassRep.value != "") { areSamePasswords() }
        validatePassword();
    };
    suPassRep.onblur = () => {
        areSamePasswords();
    };
    suPassRep.onkeyup = () => {
        areSamePasswords();
    };
    suEmail.onblur = () => { validateEmail(suEmail.value) };
    suButton.onclick = () => { signUpCorrectData() };
}

function init() {

    cookie = getTheCookie();
    console.log(cookie);
    
    
    if (cookie !== null) {
        let hostLocation = window.location.hostname;
        let portNumber = window.location.port;
        window.location.href = "http://" + hostLocation + ":" + portNumber + "/home";
    }

    siUser = document.getElementById('siUser');
    siPass = document.getElementById('siPass');
    siButton = document.getElementById('siButton');

    suUser = document.getElementById('suUser');
    suPass = document.getElementById('suPass');
    suPassRep = document.getElementById('suPassRepeat');
    suEmail = document.getElementById('email');
    suButton = document.getElementById('suButton');

    giveEvents();
}


//////////////////////
// GLOBAL VARIABLES //
//////////////////////

/*
si -> sign in
su -> sign up
*/
let siUser;
let siPass;
let siButton;
let suUser;
let suPass;
let suPassRep;
let suEmail;
let suButton;

// TODO Esta a true para probar, CAMBIAR
let suErrors = [true, true, true, true];

let cookie;

window.onload = init;