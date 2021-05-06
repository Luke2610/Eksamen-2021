window.onload = async function(){
    await fetch(`http://localhost:7071/api/get_all_users`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Something went wrong " + response.status)
                    return 
                }

                //Inner html that loops through the data, displaying all users
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
                        <p> Biography: ${deta[10].value}<p>
                        <p> Email: ${deta[11].value} </p>
                        <p> Password: ${deta[12].value} </p>
                        <p> Created at: ${new Date(deta[13].value)} </p>
                        <p> <button onclick="updateUserLS(${deta[0].value}&${deta[1].value}&${deta[2].value}&${deta[3].value}&${deta[4].value}&${deta[5].value}&${deta[6].value}&${deta[7].value}&${deta[8].value}&${deta[9].value}&${deta[10].value}&${deta[11].value}&${deta[12].value})">Update user</button><br><br><p>
                        <p> <button onclick="delete_user_admin(${deta[0].value})">Delete user</button></a><p><br> <br>
                        <br><br>
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
    // Fetching matches
    await fetch(`http://localhost:7071/api/get_all_matches`)
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Something went wrong " + response.status)
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
async function delete_user_admin(user_id){
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
        
        //Deletes the user from the database
        await fetch(`http://localhost:7071/api/delete_user_admin?user_id=${user_id}`)
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
}}

var loginButton = document.getElementById("User")

async function updateUserLS (user_id){
loginButton.addEventListener("click",function(){
    fetch(`http://localhost:7071/api/update_user_admin_get?user_id=${user_id}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Error " + response.status)
                    return 
                }

                response.json().then(function(data){
                    localStorage.setItem(`${deta[0].value}`);
                    localStorage.setItem(`${deta[1].value} ${deta[2].value}`);
                    localStorage.setItem(`${deta[3].value}`);
                    localStorage.setItem(`${deta[4].value}`);
                    localStorage.setItem(`${deta[5].value}`);
                    localStorage.setItem(`${deta[6].value}`);
                    localStorage.setItem(`${deta[7].value}`);
                    localStorage.setItem(`${deta[8].value}`);
                    localStorage.setItem(`${deta[9].value}`);
                    localStorage.setItem(`${deta[10].value}`);
                    localStorage.setItem(`${deta[11].value}`);
                    localStorage.setItem(`${deta[12].value}`);
                    console.log(data);
                })
            }
        )
        .catch(function (err){
            console.log(err)
        })
})
}