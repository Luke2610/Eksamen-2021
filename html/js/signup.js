var form = document.getElementById("form") //gets the information from the form

form.addEventListener('submit',function(e){ //when the signup button is submitted, this function activates
    e.preventDefault()

    //gets all the information from the form with the getElementById functions and saves it in variables.
    var firstname = document.getElementById("firstname").value
    var lastname = document.getElementById("lastname").value
    if(document.getElementById("male").checked) {   //checks which gender is checked
        var gender = "male";  
    } else if (document.getElementById("female").checked){
         var gender = "female"
        }
    var birthdate = document.getElementById("birthdate").value
    var country = document.getElementById("country").value
    var city = document.getElementById("city").value
    if(document.getElementById("interestedInGenderMale").checked) {   //checks which gender is checked
        var interestedInGender = "male";  
    } else if (document.getElementById("interestedInGenderFemale").checked){
         var interestedInGender = "female"
        }
    var maxAge = document.getElementById("maxAge").value
    var minAge = document.getElementById("minAge").value
    var biography = document.getElementById("biography").value
    var email = document.getElementById("email").value
    var hashed_password = document.getElementById("hashed_password").value

        //sends the data to the Azure endpoint, post_user
    fetch("http://localhost:7071/api/post_user", {
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
        console.log(data) //logs that the creation of a user was succesful
        window.location.replace("./login.html") //sends the user to the login.html
    })
    .catch((err) => { //if an error happens, the system will log it.
        console.log(err)
    })
})