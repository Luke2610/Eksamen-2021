var form = document.getElementById("form")

form.addEventListener('submit',function(e){
    e.preventDefault()

    var firstname = document.getElementById("firstname").value
    var lastname = document.getElementById("lastname").value
    if(document.getElementById("male").checked) {   
        var gender = "male";  
    } else if (document.getElementById("female").checked){
         var gender = "female"
        }
    var birthdate = document.getElementById("birthdate").value
    var country = document.getElementById("country").value
    var city = document.getElementById("city").value
    if(document.getElementById("interestedInGenderMale").checked) {   
        var interestedInGender = "male";  
    } else if (document.getElementById("interestedInGenderFemale").checked){
         var interestedInGender = "female"
        }
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