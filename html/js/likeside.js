window.onload = function(){
    document.getElementById('name').innerHTML += localStorage.getItem("firstname") + " " + localStorage.getItem("lastname")
    if (localStorage.getItem("email") === null) {
        window.location.replace("./homepage.html")
    }
}

function profile(){
    window.location.href("./profil.html")
    console.log("Press")
}