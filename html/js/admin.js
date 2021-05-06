var adminButton = document.getElementById("adminButton")
// Admin button event listener med sql query for admin data
adminButton.addEventListener("click",function(){
    var email = document.getElementById("email").value
    var hashed_password = document.getElementById("password").value
    console.log(email,hashed_password)
    fetch(`http://localhost:7071/api/get_admin?email=${email}&hashed_password=${hashed_password}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt " + response.status)
                    return 
                }

                response.json().then(function(data){
                    console.log(data);
                    document.cookie = "admin_id=" + data[0].value
                    document.cookie = "admin_firstname=" + data[1].value;
                    document.cookie = "admin_lastname=" + data[2].value
                    document.cookie = "admin_email=" + data[3].value;

                window.location.replace("./adminpage.html") 
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })
})

window.onload = function(){
    if(readCookie("admin_email") != null){
        window.location.replace("./adminpage.html") 
    } 
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