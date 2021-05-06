const {Connection, Request, TYPES} = require('tedious');
const config = require('./config.json')
const bcrypt = require ('bcrypt');
const saltRounds = 4;

var connection = new Connection(config)

/* Start db function */
function startDb(){
    return new Promise((resolve,reject) => {
        connection.on('connect',(err) => {
            if (err) {
                console.log("Connection failed")
                reject(err)
                throw err;
            } else {
                console.log("Connected")
                resolve();
            }
        })
        connection.connect();
    })
}

module.exports.sqlConnection = connection;
module.exports.startDb = startDb;
module.exports.bcrypt = bcrypt
module.exports.saltRounds = saltRounds

/* Function for user registration */
function insert(payload){
    return new Promise((resolve,reject) => {
        const sql = `INSERT INTO [users].[user] (firstname, lastname, gender, birthdate, country, city, interestedInGender, maxAge, minAge, biography, email, hashed_password) VALUES (@firstname, @lastname, @gender, @birthdate, @country, @city, @interestedInGender, @maxAge, @minAge, @biography, @email, @hashed_password)`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('firstname', TYPES.VarChar, payload.firstname)
        request.addParameter('lastname', TYPES.VarChar, payload.lastname)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('birthdate', TYPES.Date, payload.birthdate)
        request.addParameter('country', TYPES.VarChar, payload.country)
        request.addParameter('city', TYPES.VarChar, payload.city)
        request.addParameter('interestedInGender', TYPES.VarChar, payload.interestedInGender)
        request.addParameter('maxAge', TYPES.Int, payload.maxAge)
        request.addParameter('minAge', TYPES.Int, payload.minAge)
        request.addParameter('biography', TYPES.VarChar, payload.biography)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('hashed_password', TYPES.VarChar, payload.hashed_password)

        request.on('requestCompleted', (row) => {
            console.log('User instered', row);
            resolve('user inserted',row)
        });
        connection.execSql(request);

    });

}
module.exports.insert = insert;

/* Function for user login */
function select_email(email,hashed_password){
    return new Promise((resolve,reject) => {
        const sql = 'SELECT *, YEAR((CURRENT_TIMESTAMP)) - YEAR(birthdate) AS age FROM [users].[user] where email = @email AND hashed_password = @hashed_password'
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: 'User does not exist'})
        }
    });

    
    request.addParameter('email', TYPES.VarChar, email)
    request.addParameter('hashed_password', TYPES.VarChar, hashed_password)

    request.on('row',(colums) => {
        resolve(colums)
    })
    connection.execSql(request)  
    })

}

module.exports.select_email = select_email;

/* Function for admin login */
function select_admin_email(email,hashed_password){
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM [users].[admin] where email = @email AND hashed_password = @hashed_password'
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: 'User does not exist'})
        }
    });
    request.addParameter('email', TYPES.VarChar, email)
    request.addParameter('hashed_password', TYPES.VarChar, hashed_password)

    request.on('row',(colums) => {
        resolve(colums)
    })
    connection.execSql(request)  
    }) 

}

module.exports.select_admin_email = select_admin_email;

//function that gets all users with filters
async function select_other_users(user_id,gender,interestedInGender,minAge,maxAge){
    return new Promise((resolve,reject) => {
        var result = []
        if(gender == interestedInGender){
            var sql = 'SELECT user_id,firstname,lastname,gender,city,biography, YEAR((CURRENT_TIMESTAMP)) - YEAR(birthdate) AS age FROM [users].[user] where gender = @interestedInGender AND interestedInGender = @interestedInGender AND YEAR((CURRENT_TIMESTAMP)) - YEAR(birthdate) BETWEEN @minAge AND @maxAge'
        } else {
             var sql = 'SELECT user_id,firstname,lastname,gender,city,biography, YEAR((CURRENT_TIMESTAMP)) - YEAR(birthdate) AS age, l.user_id_1, l.user_id_2, d.user_id_1, d.user_id_2  FROM [users].[user] LEFT JOIN users.[like] l on [user].user_id = l.user_id_2 LEFT JOIN users.dislike d on [user].user_id = d.user_id_2 WHERE gender = @interestedInGender AND interestedInGender = @gender AND YEAR((CURRENT_TIMESTAMP)) - YEAR(birthdate) BETWEEN @minAge AND @maxAge AND l.user_id_1 Is NULL AND d.user_id_1 Is NULL'
        }
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: 'Users does not exist'})
        } else {
            console.log(`${rowcount} row(s) returned`)
            resolve(result)
        }
    });

    request.addParameter('user_id', TYPES.Int, user_id)
    request.addParameter('gender', TYPES.VarChar, gender)
    request.addParameter('interestedInGender', TYPES.VarChar, interestedInGender)
    request.addParameter('minAge', TYPES.Int, minAge)
    request.addParameter('maxAge', TYPES.Int, maxAge)

        request.on('row',(columns) => {
            result.push(columns)
        })

    connection.execSql(request)  
    })

}

module.exports.select_other_users = select_other_users;

/* Like function */
function insert_like(payload){
    return new Promise((resolve,reject) => {
        const sql = `INSERT INTO [users].[like] (user_id_1,user_id_2) VALUES (@user_id,@liked_user_id)`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('user_id', TYPES.VarChar, payload.user_id)
        request.addParameter('liked_user_id', TYPES.VarChar, payload.liked_user_id)

        request.on('requestCompleted', (row) => {
            console.log('Like inserted', row);
            resolve('Like inserted',row)
        });
        connection.execSql(request);

    });
}

module.exports.insert_like = insert_like

//dislike function
function insert_dislike(payload){
    return new Promise((resolve,reject) => {
        const sql = `INSERT INTO [users].[dislike] (user_id_1,user_id_2) VALUES (@user_id,@disliked_user_id)`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('user_id', TYPES.VarChar, payload.user_id)
        request.addParameter('disliked_user_id', TYPES.VarChar, payload.disliked_user_id)

        request.on('requestCompleted', (row) => {
            console.log('Dislike inserted', row);
            resolve('Dislike inserted',row)
        });
        connection.execSql(request);

    });
}

module.exports.insert_dislike = insert_dislike

function delete_users_dislike(user_id){

    return new Promise((resolve,reject) => {
        const sql = 'DELETE FROM [users].[dislike] WHERE user_id_1 = @user_id OR user_id_2 = @user_id'
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            resolve("No one to delete")
        }
    });
        
    request.addParameter('user_id', TYPES.Int, user_id)

    request.on('done',(colums) => {
        resolve(colums)
    })
    connection.execSql(request)  
    }) 
}

module.exports.delete_users_dislike = delete_users_dislike

//function that deletes user likes
function delete_users_like(user_id){

    return new Promise((resolve,reject) => {
        const sql = 'DELETE FROM [users].[like] WHERE user_id_1 = @user_id OR user_id_2 = @user_id'
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            resolve("No one to delete")
        }
    });
        
    request.addParameter('user_id', TYPES.Int, user_id)

    request.on('done',(colums) => {
        resolve(colums)
    })
    connection.execSql(request)  
    }) 
}

module.exports.delete_users_like = delete_users_like

//function delete user from database
function delete_users_user(user_id){

    return new Promise((resolve,reject) => {
        const sql = 'DELETE FROM [users].[user] where user_id = @user_id'
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: 'User does not exist'})
        }
    });
        
    request.addParameter('user_id', TYPES.Int, user_id)

    request.on('done',(colums) => {
        resolve(colums)
    })
    connection.execSql(request)  
    }) 
}

module.exports.delete_users_user = delete_users_user

/* Function for get all users to admin */
function getallusers(){

}

function get_like(user_id){
    return new Promise((resolve,reject) => {
        var result = []
        var sql = 'SELECT u.user_id, u.firstname, u.lastname, u.gender, YEAR((CURRENT_TIMESTAMP)) - YEAR(u.birthdate) AS age, u.city, u.biography, id, user_id_2, user_id_1 FROM [users].[like] INNER JOIN [users].[user] u on u.user_id = [users].[like].user_id_2 WHERE user_id_1 = @user_id'
    
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: 'User has no likes'})
        } else {
            console.log(`${rowcount} row(s) returned`)
            resolve(result)
        }
    });

    request.addParameter('user_id', TYPES.Int, user_id)

        request.on('row',(columns) => {
            result.push(columns)
        })

    connection.execSql(request)  
    })
}

module.exports.get_like = get_like

function delete_like(user_id,delete_user_id){
    return new Promise((resolve,reject) => {
        var sql = 'DELETE FROM [users].[like] WHERE user_id_1 = @user_id AND user_id_2 = @delete_user_id'
    
        const request = new Request(sql, (err,rowcount) => {
            if(err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
            
        request.addParameter('user_id', TYPES.Int, user_id)
        request.addParameter('delete_user_id', TYPES.Int, delete_user_id)
    
        request.on('done',(colums) => {
            resolve(colums)
        })
        connection.execSql(request) 
    })
}

module.exports.delete_like = delete_like

function get_dislike(user_id){
    return new Promise((resolve,reject) => {
        var result = []
        var sql = 'SELECT u.user_id, u.firstname, u.lastname, u.gender, YEAR((CURRENT_TIMESTAMP)) - YEAR(u.birthdate) AS age, u.city, u.biography, id, user_id_2, user_id_1 FROM [users].[dislike] INNER JOIN [users].[user] u on u.user_id = [users].[dislike].user_id_2 WHERE user_id_1 = @user_id'
    
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: 'User has no dislikes'})
        } else {
            console.log(`${rowcount} row(s) returned`)
            resolve(result)
        }
    });

    request.addParameter('user_id', TYPES.Int, user_id)

        request.on('row',(columns) => {
            result.push(columns)
        })

    connection.execSql(request)  
    })
}

module.exports.get_dislike = get_dislike

function delete_dislike(user_id,delete_user_id){
    return new Promise((resolve,reject) => {
        var sql = 'DELETE FROM [users].[dislike] WHERE user_id_1 = @user_id AND user_id_2 = @delete_user_id'
    
        const request = new Request(sql, (err,rowcount) => {
            if(err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
            
        request.addParameter('user_id', TYPES.Int, user_id)
        request.addParameter('delete_user_id', TYPES.Int, delete_user_id)
    
        request.on('done',(colums) => {
            resolve(colums)
        })
        connection.execSql(request) 
    })
}

module.exports.delete_dislike = delete_dislike

function get_like_for_match(user_id){
    return new Promise((resolve,reject) => {
        var result = []
        var sql = 'SELECT * FROM [users].[like] WHERE user_id_1 = @user_id'
    
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: 'User has no likes'})
        } else {
            console.log(`${rowcount} row(s) returned`)
            resolve(result)
        }
    });

    request.addParameter('user_id', TYPES.Int, user_id)

        request.on('row',(columns) => {
            result.push(columns)
        })

    connection.execSql(request)  
    })
}

module.exports.get_like_for_match = get_like_for_match

function get_like_for_like(user_id){
    return new Promise((resolve,reject) => {
        var result = []
        var sql = 'SELECT * FROM [users].[like] l INNER JOIN [users].[like] m ON l.user_id_1 = m.user_id_2 WHERE l.user_id_2 = m.user_id_1 AND l.user_id_1 = @user_id'
    
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            resolve(result)
        } else {
            console.log(`${rowcount} row(s) returned`)
            resolve(result)
        }
    });

    request.addParameter('user_id', TYPES.Int, user_id)

        request.on('row',(columns) => {
            result.push(columns)
        })

    connection.execSql(request)  
    })
}

module.exports.get_like_for_like = get_like_for_like

function create_match(like_id_1,like_id_2,user_id,other_user_id){
    return new Promise((resolve,reject) => {
        var sql = 'INSERT INTO [users].[matches] (user_id_1,user_id_2,like_id_1,like_id_2) VALUES(@user_id,@other_user_id,@like_id_1,@like_id_2)'
    
        const request = new Request(sql, (err) => {
            if (err){
                resolve("Match findes")
            }
        });
        request.addParameter('user_id', TYPES.VarChar, user_id)
        request.addParameter('other_user_id', TYPES.VarChar, other_user_id)
        request.addParameter('like_id_2', TYPES.VarChar, like_id_2)
        request.addParameter('like_id_1', TYPES.VarChar, like_id_1)

        request.on('requestCompleted', (row) => {
            console.log('Match inserted', row);
            resolve('Match inserted',row)
        });
        connection.execSql(request);  
    })
}

module.exports.create_match = create_match

function get_match(user_id){
    return new Promise((resolve,reject) => {
        var result = []
        var sql = 'SELECT user_id, firstname,lastname,gender, YEAR((CURRENT_TIMESTAMP)) - YEAR(birthdate) AS age, city, biography FROM [users].[matches] INNER JOIN [users].[user] u on u.user_id = matches.user_id_2 WHERE user_id_1 = @user_id'
    
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            resolve(result)
        } else {
            console.log(`${rowcount} row(s) returned`)
            resolve(result)
        }
    });

    request.addParameter('user_id', TYPES.Int, user_id)

        request.on('row',(columns) => {
            result.push(columns)
        })

    connection.execSql(request)  
    })
}

module.exports.get_match = get_match

function delete_match(user_id,delete_user_id){
    return new Promise((resolve,reject) => {
        var sql = 'DELETE FROM [users].[matches] WHERE user_id_1 = @user_id AND user_id_2 = @delete_user_id'

        const request = new Request(sql, (err,rowcount) => {
            if(err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                resolve("no matches")
            }
        });
            
        request.addParameter('user_id', TYPES.Int,   user_id)
        request.addParameter('delete_user_id', TYPES.Int, delete_user_id)
    
        request.on('done',(colums) => {
            resolve(colums)
        })
        connection.execSql(request) 
    })
}

module.exports.delete_match = delete_match

function update_user(payload){
    return new Promise((resolve,reject) => {
        const sql = `UPDATE [users].[user] SET firstname = @firstname, lastname = @lastname, gender = @gender, birthdate = @birthdate, country = @country, city = @city, interestedInGender = @interestedInGender, maxAge = @maxAge, minAge = @minAge, biography = @biography, email = @email, hashed_password = @hashed_password WHERE user_id = @user_id`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('user_id', TYPES.VarChar, payload.user_id)
        request.addParameter('firstname', TYPES.VarChar, payload.firstname)
        request.addParameter('lastname', TYPES.VarChar, payload.lastname)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('birthdate', TYPES.Date, payload.birthdate)
        request.addParameter('country', TYPES.VarChar, payload.country)
        request.addParameter('city', TYPES.VarChar, payload.city)
        request.addParameter('interestedInGender', TYPES.VarChar, payload.interestedInGender)
        request.addParameter('maxAge', TYPES.Int, payload.maxAge)
        request.addParameter('minAge', TYPES.Int, payload.minAge)
        request.addParameter('biography', TYPES.VarChar, payload.biography)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('hashed_password', TYPES.VarChar, payload.hashed_password)

        request.on('requestCompleted', (row) => {
            console.log('User updated', row);
            resolve('user updated',row)
        });
        connection.execSql(request);

    });

}

module.exports.update_user = update_user

//function that gets all users from the database
function get_all_users(){
    return new Promise((resolve,reject) => {
        var result = []
        var sql = 'SELECT * FROM [users].[user] ORDER BY gender'
    
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            resolve(result)
        } else {
            console.log(`${rowcount} row(s) returned`)
            resolve(result)
        }
    });
        request.on('row',(columns) => {
            result.push(columns)
        })

    connection.execSql(request)  
    })
}

module.exports.get_all_users = get_all_users

function get_all_matches(){
    return new Promise((resolve,reject) => {
        var result = []
        var sql = 'SELECT * FROM [users].[matches]'
    
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            resolve(result)
        } else {
            console.log(`${rowcount} row(s) returned`)
            resolve(result)
        }
    });
        request.on('row',(columns) => {
            result.push(columns)
        })

    connection.execSql(request)  
    })
}

module.exports.get_all_matches = get_all_matches