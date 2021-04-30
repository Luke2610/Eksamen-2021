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
                    document.getElementById('name').innerHTML = "Full name: " + data[1].value + " " + data[2].value;
                    document.getElementById('gender').innerHTML = "Gender: " + data[3].value;

                    //console.log(data[1]);
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })
})