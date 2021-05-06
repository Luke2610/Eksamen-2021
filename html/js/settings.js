async function deleteUser(){
    let user_id = readCookie("user_id")

   if (confirm("Are you sure you want to delete your user?") == true) {
    
    //deletes all dislikes the user has given
    await fetch(`http://localhost:7071/api/delete_users_dislike?user_id=${user_id}`)
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Couldn't delete dislikes " + response.status)
                return 
            }

            response.json().then(function(data){
                return
            })
        }
    )
    .catch(function (err){
        console.log(err)
    })

    //deletes all likes the user has given
    await fetch(`http://localhost:7071/api/delete_users_like?user_id=${user_id}`)
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Couldn't delete likes " + response.status)
                return 
            }

            response.json().then(function(data){
                return
            })
        }
    )
    .catch(function (err){
        console.log(err)
    })
    
    //Deletes the user in users.user
    await fetch(`http://localhost:7071/api/delete_users_user?user_id=${user_id}`)
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Couldn't delete user " + response.status)
                return 
            }

            response.json().then(function(data){
                return
            })
        }
    )
    .catch(function (err){
        console.log(err)
    })

    //Deletes cookies
    var cok = document.cookie;
            var multiple = cok.split(";");
            for(var i = 0; i < multiple.length; i++) {
                var key = multiple[i].split("=");
                document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
            }
    //window.location.replace("./homepage.html")
    
   } else {
       return
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

window.onload = function() {
    if(readCookie("email") === null){
    window.location.replace("./homepage.html") 
    }

    document.getElementById("firstname").value = readCookie("firstname")
    document.getElementById("lastname").value = readCookie("lastname")
    var genders = document.querySelectorAll('input[name="gender"]')
    for(i = 0;i<genders.length;i++){
        if(genders[i].value == readCookie("gender")){
            genders[i].checked = true;
        }
    }

    document.getElementById("birthdate").value = formatDate(new Date(readCookie("birthdate")))
    document.getElementById("country").value = readCookie("country")
    document.getElementById("city").value = readCookie("city")
    interestedInGenders = document.querySelectorAll('input[name="interestedInGender"]')
    for(i = 0;i<interestedInGenders.length;i++){
        if(interestedInGenders[i].value == readCookie("interestedInGender")){
            interestedInGenders[i].checked = true;
        }
    }

    document.getElementById("maxAge").value = readCookie("maxAge")
    document.getElementById("minAge").value = readCookie("minAge")
    document.getElementById("biography").value = readCookie("biography")
    document.getElementById("email").value = readCookie("email")
    document.getElementById("hashed_password").value = readCookie("hashed_password")

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

    var user_id = readCookie("user_id")
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
        document.cookie = "firstname=" + firstname;
        document.cookie = "lastname=" + lastname;
        document.cookie = "gender=" + gender;
        document.cookie = "birthdate=" + birthdate;
        document.cookie = "country=" + country;
        document.cookie = "city=" + city;
        document.cookie = "interestedInGender=" + interestedInGender;
        document.cookie = "maxAge=" + maxAge;
        document.cookie = "minAge=" + minAge;
        document.cookie = "biography=" + biography;
        document.cookie = "email=" + email;
        document.cookie = "hashed_password=" + hashed_password;
        console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })


})