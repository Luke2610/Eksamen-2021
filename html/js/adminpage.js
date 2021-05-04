// View all users
window.onload = function() {
    fetch(`http://localhost:7071/api/getallusers?firstname=${firstname}&lastname=${lastname}gender=${gender}birthdate=${birthdate}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Error" + response.status)
                    return 
                }

                response.json().then(function(data){
                    console.log(data)
                    const div = document.createElement("div")
                    div.className = 'Users'
    
                    div.innerHTML =`
                    <p> Firstname: ${data[1].value} </p>
                    <p> Lastname: ${data[2].value} </p>
                    <p> Gender: ${data[3].value} </p>
                    `;
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })
    }