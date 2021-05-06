window.onload = async function(){
    await fetch(`http://localhost:7071/api/get_all_users`)
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
                        <p> User_ID: ${deta[0].value}
                        <p> Name: ${deta[1].value} ${deta[2].value} </p>
                        <p> Gender: ${deta[3].value} </p>
                        <p> Birthdate: ${new Date(deta[4].value)} </p>
                        <p> Country: ${deta[5].value} </p>
                        <p> City: ${deta[6].value} </p>
                        <p> Interested in: ${deta[7].value} </p>
                        <p> Max age: ${deta[8].value} </p>
                        <p> Min age: ${deta[9].value} </p>
                        <p> Biography: ${deta[10].value} <br> <br>
                        <p> Email: ${deta[11].value} </p>
                        <p> Password: ${deta[12].value} </p>
                        <p> Created at: ${new Date(deta[13].value)} </p>
                        `;
                        document.getElementById('users').appendChild(div)
                    }
                    document.getElementById("users_number").innerHTML += data.length
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })

    await fetch(`http://localhost:7071/api/get_all_matches`)
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Noget gik galt " + response.status)
                return 
            }

            response.json().then(function(data){
                document.getElementById("matches_number").innerHTML += data.length
            })
        }
    )
    .catch(function (err){
        console.log(err)
    })
}