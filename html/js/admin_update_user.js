window.onload = function() {
    document.getElementById("firstname").value = localStorage.getItem("firstname")
    document.getElementById("lastname").value = localStorage.getItem("lastname")
    var genders = document.querySelectorAll('input[name="gender"]')
    for(i = 0;i<genders.length;i++){
        if(genders[i].value == localStorage.getItem("gender")){
            genders[i].checked = true;
        }
    }

    document.getElementById("birthdate").value = formatDate(new Date(localStorage.getItem("birthdate")))
    document.getElementById("country").value = localStorage.getItem("country")
    document.getElementById("city").value = localStorage.getItem("city")
    interestedInGenders = document.querySelectorAll('input[name="interestedInGender"]')
    for(i = 0;i<interestedInGenders.length;i++){
        if(interestedInGenders[i].value == localStorage.getItem("interestedInGender")){
            interestedInGenders[i].checked = true;
        }
    }

    document.getElementById("maxAge").value = localStorage.getItem("maxAge")
    document.getElementById("minAge").value = localStorage.getItem("minAge")
    document.getElementById("biography").value = localStorage.getItem("biography")
    document.getElementById("email").value = localStorage.getItem("email")
    document.getElementById("hashed_password").value = localStorage.getItem("password")

    function formatDate(date) {
        var day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var year = date.getFullYear();
        return year + "-" + month + "-" + day;
    }


}

var form = document.getElementById("updateUser")

form.addEventListener('submit',function(e){
    e.preventDefault()

    var user_id = localStorage.getItem("user_id")
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

    fetch("http://localhost:7071/api/update_user", {
        method: 'PUT',
        body: JSON.stringify({
            user_id: user_id,
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