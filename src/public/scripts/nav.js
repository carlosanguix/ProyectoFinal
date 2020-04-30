
async function loadItem(ev) {

    console.log(ev.target);
    
/*
    console.log(ev.target.id);
    let url = 'http://localhost:3003/' + ev.target.id;
    window.location.href = url;*/

    console.log(ev.target.id);
    
    let url = `http://localhost:3003/home?page=` + ev.target.id;

    window.location.href = url
    
}

let navItems;
let navHome;
let navBeers;
let navMyProfile;

document.querySelectorAll('.navItem').forEach((ch) => {
    ch.onclick = loadItem;
});
