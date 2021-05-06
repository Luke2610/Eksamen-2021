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
                        <p> Birthdate: ${deta[4].value} </p>
                        <p> Country: ${deta[5].value} </p>
                        <p> City: ${deta[6].value} </p>
                        <p> Interested in: ${deta[7].value} </p>
                        <p> Max age: ${deta[8].value} </p>
                        <p> Min age: ${deta[9].value} </p>
                        <p> Biography: ${deta[10].value}<p>
                        <p> Email: ${deta[11].value} </p>
                        <p> Password: ${deta[12].value} </p>
                        <p> Created at: ${deta[13].value} </p>
                        <button onclick="update_user_admin(${deta[0].value})">Update user</button><br><br>
                        <button onclick="delete_user_admin(${deta[0].value})">Delete user</button><br> <br>
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

function update_user_admin(user_id){
    fetch(`http://localhost:7071/api/get_user_admin?user_id=${user_id}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt " + response.status)
                    return 
                }

                response.json().then(function(deta){
                    data = deta[0]
                    localStorage.setItem('user_id',user_id);
                    localStorage.setItem('firstname',data[1].value);
                    localStorage.setItem('lastname',data[2].value)
                    localStorage.setItem('gender',data[3].value);
                    localStorage.setItem('birthdate',data[4].value);
                    localStorage.setItem('country',data[5].value);
                    localStorage.setItem('city',data[6].value);
                    localStorage.setItem('interestedInGender',data[7].value);
                    localStorage.setItem('maxAge',data[8].value);
                    localStorage.setItem('minAge',data[9].value);
                    localStorage.setItem('biography',data[10].value);
                    localStorage.setItem('email',data[11].value);
                    localStorage.setItem('password',data[12].value);
                    localStorage.setItem('created_at',data[13].value);
                    window.location.replace("./admin_update_user.html")

                })
            }
        )
        .catch(function (err){
            console.log(err)
        })
    
}