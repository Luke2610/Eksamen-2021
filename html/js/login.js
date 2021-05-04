var loginButton = document.getElementById("loginButton")

loginButton.addEventListener("click",function(){
    var email = document.getElementById("email").value
    var hashed_password = document.getElementById("password").value
    console.log(email,hashed_password)
    fetch(`http://localhost:7071/api/get_User?email=${email}&hashed_password=${hashed_password}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt " + response.status)
                    return 
                }

                response.json().then(function(data){
                    console.log(data);
                    window.location.replace("./likeside.html")
                    document.cookie = "user_id=" + data[0].value
                    document.cookie = "firstname=" + data[1].value;
                    document.cookie = "lastname=" + data[2].value
                    document.cookie = "gender=" + data[3].value ;
                    document.cookie = "birthdate=" + data[4].value;
                    document.cookie = "country=" + data[5].value;
                    document.cookie = "city=" + data[6].value;
                    document.cookie = "interestedInGender=" + data[7].value;
                    document.cookie = "maxAge=" + data[8].value;
                    document.cookie = "minAge=" + data[9].value;
                    document.cookie = "biography=" + data[10].value;
                    document.cookie = "email=" + data[11].value;
                    document.cookie = "age=" + data[14].value
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })
})


window.onload = function() {
    if(readCookie("email") != null){
    window.location.replace("./likeside.html") 
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