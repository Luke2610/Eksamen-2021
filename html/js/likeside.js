window.onload = async function() {
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

    await fetch(`http://localhost:7071/api/match_notification?user_id=${user_id}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt " + response.status)
                    return 
                }
                i = 0
                response.json().then(function(data){
                    console.log(data.length)
                    match = " match"
                    if (data.length > 1){
                        match = " matches"
                    }
                    document.getElementById("matches").innerHTML += data.length + match
                    
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })


    await fetch(`http://localhost:7071/api/get_other_users?user_id=${user_id}&gender=${gender}&interestedInGender=${interestedInGender}&maxAge=${maxAge}&minAge=${minAge}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt " + response.status)
                    return 
                }
                response.json().then(function(data){

                    
                    for(i=0;i<data.length;i++){
                        deta = data[i]
                        const div = document.createElement("div")
                        div.className = 'User'
                        div.innerHTML =`
                        <p> Name: ${deta[1].value} ${deta[2].value} </p>
                        <p> Gender: ${deta[3].value} </p>
                        <p> Age: ${deta[6].value} </p>
                        <p> City: ${deta[4].value} </p>
                        <p> Biography: ${deta[5].value} <br> <br>
                        <button onclick="like(${deta[0].value})"> Like </button>
                        <button onclick="dislike(${deta[0].value})"> Dislike </button>
                        `;
                        document.getElementById('likes').appendChild(div)
                    }
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

    fetch("http://localhost:7071/api/post_like", {
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

function dislike(disliked_user_id){
    var user_id = readCookie("user_id")
    
    fetch("http://localhost:7071/api/post_dislike", {
        method: 'POST',
        body: JSON.stringify({
            user_id: user_id,
            disliked_user_id: disliked_user_id
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
