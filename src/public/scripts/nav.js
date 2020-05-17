
async function loadItem(ev) {

    console.log(ev.target.id);
    let hostLocation = window.location.hostname;
    let portNumber = window.location.port;
    let url = "http://" + hostLocation + ":" + portNumber + "/" + ev.target.id;

    window.location.href = url

}

let navItems;
let navHome;
let navBeers;
let navMyProfile;

document.querySelectorAll('.navItem').forEach((ch) => {
    ch.onclick = loadItem;
});
