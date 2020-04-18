/////////////
// SIGN IN //
/////////////

async function signInCorrectData() {

    let data = {
        username: siUser.value,
        password: siPass.value
    };

    let url = `http://localhost:3003/signIn`;
    let settings = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
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
            localStorage.setItem('baron', JSON.stringify(response.cookie));
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

    let url = `http://localhost:3003/signUp`;
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

    let response = await URLfetch.json();

    return response;
}

// User creation function
async function createUser(userData) {

    let response = await checkInUse(userData);
    console.log(response);


    if (response.correctData[0]) {
        // El usuario ya existe
        let lblSuUser = document.querySelector('label[for="suUser"]');
        lblSuUser.innerHTML += '<span id="lblErrorUser" class="error"> (The user is already in use)</span>';
    }

    if (response.correctData[1]) {
        // El email ya esta en uso
        let lblEmail = document.querySelector('label[for="suEmail"]');
        lblEmail.innerHTML += '<span id="lblErrorMail" class="error"> (The email is already in use)</span>';
    }

    if (!response.correctData[0] && !response.correctData[0]) {
        console.log("creamos el usuario");
        // Hemos dado de alta el usuario en la BBDD
        // Informamos al usuario
        localStorage.setItem('baron', JSON.stringify(response.cookie));
        console.log('localStorage ' + JSON.parse(localStorage.getItem('baron')));
        windowPopupMessage();
    }
}

function windowPopupMessage() {

    let divMessage = document.createElement('div');
    let divContainer = document.createElement('div');

    divContainer.classList = 'divContainer';
    document.querySelector('body').appendChild(divContainer);

    divMessage.classList = 'divMessage';
    divMessage.id = 'divMessage';
    divMessage.innerHTML = `<p>Thank you for registering on our website, we are redirecting you to the main page.</p>`;
    divContainer.appendChild(divMessage);

    setTimeout(async () => {
        // TODO Realizar una petición para que el servidor me renderice el home.
        window.location.href = "http://localhost:3003/home";
        
        

    }, 3000);

}

//////////////////////
// GLOBAL FUNCTIONS //
//////////////////////

function getTheCookie() {

    let theCookie = JSON.parse(localStorage.getItem('baron'));
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
    if (cookie != null) {
        window.location.href = 'http://localhost:3003/home';
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