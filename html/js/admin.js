var adminButton = document.getElementById("adminButton")

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
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })
})