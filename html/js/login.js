var getButton = document.getElementById("getUsers")

getButton.addEventListener("click",function(){
    var firstname1 = document.getElementById("firstname").value
    fetch(`http://localhost:7071/api/get_User?firstname=${firstname1}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt " + response.status)
                    return 
                }

                response.json().then(function(data){
                    console.log(data);
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })
})

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
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })
})