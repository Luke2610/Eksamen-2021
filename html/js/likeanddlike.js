window.onload = async function onLoad(){
    var user_id = readCookie("user_id")

    await fetch(`http://localhost:7071/api/get_like?user_id=${user_id}`)
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
                        <p> Age: ${deta[4].value} </p>
                        <p> City: ${deta[5].value} </p>
                        <p> Biography: ${deta[6].value} <br> <br>
                        <button onclick="like(${deta[0].value})"> Remove Like </button>
                        `;
                        document.getElementById('Likes').appendChild(div)
                    }
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })

    await fetch(`http://localhost:7071/api/get_dislikes?user_id=${user_id}`)
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
                        <p> Age: ${deta[4].value} </p>
                        <p> City: ${deta[5].value} </p>
                        <p> Biography: ${deta[6].value} <br> <br>
                        <button onclick="dislike(${deta[0].value})"> Remove Dislike </button>
                        `;
                        document.getElementById('Dislikes').appendChild(div)
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