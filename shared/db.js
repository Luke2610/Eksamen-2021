const {Connection, Request, TYPES} = require('tedious');
const config = require('./config.json')
const bcrypt = require ('bcrypt');
const saltRounds = 4;

var connection = new Connection(config)

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

function select_email(email,hashed_password){
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM [users].[user] where email = @email AND hashed_password = @hashed_password'
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

function select_other_users(user_id,gender,interestedInGender){
    return new Promise((resolve,reject) => {
        if(gender == interestedInGender){
            var sql = 'SELECT * FROM [users].[user] where gender = @interestedInGender AND interestedInGender = @interestedInGender'
        } else {
             var sql = 'SELECT * FROM [users].[user] where gender = @interestedInGender AND interestedInGender = @gender'
        }
        
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: 'Users does not exist'})
        } else {
            console.log(`${rowcount} row(s) returned`)
        }
    });

    request.addParameter('user_id', TYPES.Int, user_id)
    request.addParameter('gender', TYPES.VarChar, gender)
    request.addParameter('interestedInGender', TYPES.VarChar, interestedInGender)

    request.on('row',(columns) => {
        /*columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value)
        })*/
        resolve(columns)
    })
    connection.execSql(request)  
    })
}

module.exports.select_other_users = select_other_users;

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
            console.log('Like instered', row);
            resolve('Like inserted',row)
        });
        connection.execSql(request);

    });
}

module.exports.insert_like = insert_like