const {Connection, Request, TYPES} = require('tedious');
const config = require('./config.json')

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

function select(firstname){
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM [users].[user] where firstname = @firstname'
        const request = new Request(sql, (err,rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if (rowcount == 0) {
            reject({message: 'User does not exist'})
        }
    });
    request.addParameter('firstname', TYPES.VarChar, firstname)

    request.on('row',(colums) => {
        resolve(colums)
    })
    connection.execSql(request)  
    })

}

module.exports.select = select;