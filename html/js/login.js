var getButton = document.getElementById("getUsers")

getButton.addEventListener("click",function(){
    var firstname1 = document.getElementById("firstname").value
    fetch(`http://localhost:7071/api/user?firstname=${firstname1}`)
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

loginButton.addEventListener("submit",function(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    fetch(`http://localhost:7071/api/user?email=${email}&password=${password}`)
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Noget gik galt v2 " + response.status)
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