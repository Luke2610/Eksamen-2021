// View all users
function admin () {
    var user_id = document.getElementById("user_id").innerHTML += user_id;
    var firstname = document.getElementById("firstname").innerHTML += firstname;
    var lastname = document.getElementById("lastname").innerHTML += lastname;
    var gender = document.getElementById("gender").innerHTML += gender;
    var birthdate = document.getElementById("birthdate").innerHTML += birthdate;
    var country = document.getElementById("country").innerHTML += country;
    var city = document.getElementById("city").innerHTML += city;
    var minAge = document.getElementById("minAge").innerHTML += minAge;
    var maxAge = document.getElementById("maxAge").innerHTML += maxAge;
    var biography = document.getElementById("biography").innerHTML += biography;
    var email = document.getElementById("email").innerHTML += email;
    var hashed_password = document.getElementById("hashed_password").innerHTML += hashed_password;

    console.log(user_id,firstname,lastname,gender,birthdate,country,city,minAge,maxAge,biography,email,hashed_password);
    
    fetch(`http://localhost:7071/api/getallusers?user_id=${user_id}&firstname=${firstname}&lastname=${lastname}gender=${gender}birthdate=${birthdate}&country=${country}&city=${city}&minAge=${minAge}&maxAge=${maxAge}&biography=${biography}&email=${email}&hashed_password=${hashed_password}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Error" + response.status)
                    return 
                }

                response.json().then(function(data){
                    console.log(data.length)
                    for(i=0;i<data.length;i++){
                        var dataa = data[i]
                        const div = document.createElement("div")
                        div.className = 'AllUsers'
    
                    div.innerHTML =`
                    <p> user_id: ${dataa[0].value} </p>
                    <p> firstname: ${dataa[1].value} </p>
                    <p> lastname: ${dataa[2].value} </p>
                    <p> lender: ${dataa[3].value} </p>
                    <p> birthdate: ${dataa[4].value} </p>
                    <p> country: ${dataa[5].value} </p>
                    <p> city: ${dataa[6].value} </p>
                    <p> minAge: ${dataa[7].value} </p>
                    <p> maxAge: ${dataa[8].value} </p>
                    <p> biography: ${dataa[9].value} </p>
                    <p> email: ${dataa[10].value} </p>
                    <p> hashed_password: ${dataa[11].value} </p>
                    `;
                    document.getElementById('UsersAll').appendChild(div)
                }
            })
            })
        .catch(function (err){
            console.log(err)
        })
    }