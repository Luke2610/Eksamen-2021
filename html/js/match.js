window.onload = function(){
    var user_id = readCookie("user_id")
    fetch(`http://localhost:7071/api/create_match?user_id=${user_id}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt " + response.status)
                    return 
                }
                i = 0
                response.json().then(function(data){

                    console.log(data)
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
                        `;
                        document.getElementById('matches').appendChild(div)
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