
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

    localStorage.setItem('baronLogin', JSON.stringify(response));
    console.log(JSON.parse(localStorage.getItem('baronLogin')));

    console.log(response.validation);


    if (response.validation) {
        //setCookie(response);
        //setTimeout(() => {window.location.href = 'http://localhost:3003/firstSite/firstSite.html';}, 5000);
        window.location.href = 'http://localhost:3003/firstSite/firstSite.html';
        console.log('usuario correcto');
    } else {
        console.log('usuario incorrecto');
    }
}

function setCookie(data) {

    let date = new Date();
    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
    let expires = date.toUTCString();
    document.cookie = 'baronBeerLog' + '=' + (data.id) + ';expires=' + expires;
}

/*
function getCookie() {

    let cookie = document.cookie.split(';')
    if (cookie != "") {
        console.log('cookie exist');
        let p;
        let a;
        for (let i = 0; i < cookie.length; i++) {
            a = cookie[i];
            p += cookie[i];
            console.log(a);        
        }
        alert(p);
        
    } else {
        console.log('cookie not exist');
    }
}*/


/////////////
// SIGN UP //
/////////////

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

        let a = CryptoJS.MD5(suPass.value);

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


async function createUser(userData) {

    console.log(userData);
    let userAndEmail = await checkInUse(userData);

    if (userAndEmail[0]) {
        // El usuario ya existe
    }

    if (userAndEmail[1]) {
        // El email ya esta en uso
    }

    if (!userAndEmail[0] && !userAndEmail[1]) {

        // Damos de alta el usuario en la BBDD
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

        console.log(response);
    }

    /*
    if (response) {
        window.location.href = 'http://localhost:3003/firstSite/firstSite.html';
        console.log('usuario correcto');
    } else {
        console.log('usuario incorrecto');
    }*/
}

async function checkInUse(params) {
    
    let url = (`http://localhost:3003/checkUSer/${params.username}/${params.email}`);

    let URLfetch = await fetch(url).catch((err) => {
        console.log(err);
    });

    let response = await URLfetch.json();

    console.log(response);

    return response;
}

/*
async function checkUserInUse(username) {
    console.log(username);
    
    let url = (`http://localhost:3003/checkUSer/${username}`);

    let URLfetch = await fetch(url).catch((err) => {
        console.log(err);
    });

    let response = await URLfetch.json();

    console.log(response);

    return response;
}

async function checkEmailInUse() {

}*/

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

var getCookie = function (name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        console.log(parts.pop());

        return parts.pop().split(";").shift();
    }
};

function init() {

    /*
    //getCookie();
    let a = getCookie('baron');
    if(a){
        //console.log(Buffer.from(a, 'base64').toString());
        console.log(JSON.parse(a));
        //console.log(JSON.parse(a));

    }*/


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

// TODO Esta a true para probar, CAMBIAR
let suErrors = [true, true, true, true];

let cookie;

window.onload = init;