window.onload = function(){
    if(readCookie("admin_email") == null){
        window.location.replace("homepage.html")
    }
    document.getElementById("firstname").innerHTML += readCookie("admin_firstname") + " " + readCookie("admin_lastname")
}

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

function logout(){
    var cok = document.cookie;
            var multiple = cok.split(";");
            for(var i = 0; i < multiple.length; i++) {
               var key = multiple[i].split("=");
               document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
            }
    window.location.replace("./homepage.html")
}