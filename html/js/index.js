var form = document.getElementById("form")

form.addEventListener('submit',function(e){
    e.preventDefault()

    var firstname = document.getElementById("firstname").value
    var lastname = document.getElementById("lastname").value
    var gender = document.getElementById("gender").value
    var birthdate = document.getElementById("birthdate").value
    var country = document.getElementById("country").value
    var city = document.getElementById("city").value
    var interestedInGender = document.getElementById("interestedInGender").value
    var maxAge = document.getElementById("maxAge").value
    var minAge = document.getElementById("minAge").value
    var biography = document.getElementById("biography").value
    var email = document.getElementById("email").value
    var hashed_password = document.getElementById("hashed_password").value

    fetch("http://localhost:7071/api/user", {
        method: 'POST',
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            birthdate: birthdate,
            country: country,
            city: city,
            interestedInGender: interestedInGender,
            maxAge: maxAge,
            minAge: minAge,
            biography: biography,
            email: email,
            hashed_password: hashed_password
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })
})

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

loginButton.addEventListener("click",function(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    fetch(`http://localhost:7071/api/user?email=${email}&password=${password}`)
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