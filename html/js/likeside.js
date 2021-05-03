window.onload = function() {
    if(readCookie("email") === null){
    window.location.replace("./homepage.html") 
    }

    var name = readCookie("firstname") + " " + readCookie("lastname")

    document.getElementById("name").innerHTML += name;
    
    var user_id = readCookie("user_id")
    var gender = readCookie("gender")
    var maxAge = readCookie("maxAge")
    var minAge = readCookie("minAge")
    var interestedInGender = readCookie("interestedInGender")

    fetch(`http://localhost:7071/api/get_other_users?user_id=${user_id}&gender=${gender}&interestedInGender=${interestedInGender}&maxAge=${maxAge}&minAge=${minAge}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt " + response.status)
                    return 
                }

                response.json().then(function(data){
                    console.log(data)
                    const div = document.createElement("div")
                    div.className = 'User'
    
                    div.innerHTML =`
                    <p> Name: ${data[1].value} ${data[2].value} </p>
                    <p> Gender: ${data[3].value} </p>
                    <p> Age: ${data[14].value} </p>
                    <p> City: ${data[6].value} </p>
                    <p> Biography: ${data[10].value} <br> <br>
                    <button onclick="like(${data[0].value})"> Like </button> <button> Dislike </button>
                    `;
                    document.getElementById('likes').appendChild(div)
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })

    
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

function deleteLocal(){
    var cok = document.cookie;
            var multiple = cok.split(";");
            for(var i = 0; i < multiple.length; i++) {
               var key = multiple[i].split("=");
               document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
            }
    window.location.replace("./homepage.html")
}

function like(liked_user_id){
    var user_id = readCookie("user_id")

    fetch("http://localhost:7071/api/store_like", {
        method: 'POST',
        body: JSON.stringify({
            user_id: user_id,
            liked_user_id: liked_user_id
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
}