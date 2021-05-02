function deleteLocal(){
    var cok = document.cookie;
            var multiple = cok.split(";");
            for(var i = 0; i < multiple.length; i++) {
               var key = multiple[i].split("=");
               document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
            }
    window.location.replace("./homepage.html")
}

window.onload = function ShowName() {
        if(readCookie("email") === null){
        window.location.replace("./homepage.html") 
        }

    var name = readCookie("firstname") + " " + readCookie("lastname")
    var gender = readCookie("gender")

    document.getElementById("name").innerHTML += name;
    document.getElementById("gender").innerHTML += gender;
}

//function that reads the stored cookies
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}