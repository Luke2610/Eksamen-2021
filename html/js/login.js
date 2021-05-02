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
                    document.getElementById('birthdate').innerHTML = "Birthdate: " + data[4].value;
                    console.log(data);
                    localStorage.setItem("user_id",data[0].value)
                    localStorage.setItem("firstname",data[1].value)
                    localStorage.setItem("lastname",data[2].value)
                    localStorage.setItem("gender",data[3].value)
                    localStorage.setItem("birthdate",data[4].value)
                    localStorage.setItem("country",data[5].value)
                    localStorage.setItem("city",data[6].value)
                    localStorage.setItem("interestedInGender",data[7].value)
                    localStorage.setItem("maxAge",data[8].value)
                    localStorage.setItem("minAge",data[9].value)
                    localStorage.setItem("biography",data[10].value)
                    localStorage.setItem("email",data[11].value)
                    localStorage.setItem("password",data[12].value)
                    window.location.replace("./likeside.html")
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })
})

//LÆS OP PÅ SESSION

if(localStorage.getItem("email") != null){
    window.location.replace("./likeside.html")
}