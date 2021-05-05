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
}