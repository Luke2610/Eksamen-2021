window.onload = function(){
    document.getElementById('name').innerHTML += localStorage.getItem("firstname") + " " + localStorage.getItem("lastname")
    if (localStorage.getItem("email") === null) {
        window.location.replace("./homepage.html")
    }
}

function deleteLocal(){
    localStorage.clear()
}

