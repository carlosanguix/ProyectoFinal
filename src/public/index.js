
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
    

    if (response) {
        window.location.href = 'http://localhost:3003/firstSite/firstSite.html';
        console.log('usuario correcto');
    } else {
        console.log('usuario incorrecto');
    }
}

/////////////
// SIGN UP //
/////////////

function validateUsername() {

    if (!/^[a-zA-Z0-9]*$/.test(suUser.value)) {
        suUser.style.boxShadow = 'inset 0px 0px 0px 2px #f00';
        suErrors[0] = false;
        // Solo mayus, minus y numb
    } else {
        if (suUser.value.length < 5) {
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

function validatePassword() {

    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(suPass.value)) {
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

function areSamePasswords() {

    let passRep = suPassRep.value;

    if (passRep == suPass.value) {
        suPassRep.style.boxShadow = 'none';
        suErrors[2] = true;
    } else {
        suPassRep.style.boxShadow = 'inset 0px 0px 0px 2px #f00';
        suErrors[2] = false;
    }
}

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

function signUpCorrectData() {

    console.log(suErrors);

    // Comprobamos que todos los elementos del array son true
    let checker = arr => arr.every(Boolean);

    if (checker(suErrors)) {
        console.log('ok');

        let a = CryptoJS.MD5(suPass.value);

        let userData = {
            username: suUser.value,
            password: suPass.value,
            email: suEmail.value,
            p: a
        };

        console.log(userData);

        createUser(userData);

    } else {
        console.log('mal');
    }
}

async function createUser(userData) {

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

    if (response) {
        window.location.href = 'http://localhost:3003/firstSite/firstSite.html';
        console.log('usuario correcto');
    } else {
        console.log('usuario incorrecto');
    }
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

let suErrors = [false, false, false, false];

window.onload = init;