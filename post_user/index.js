const db = require('../shared/db')
/* Establishing a connection to the database */
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');


    try{
        await db.startDb();
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }
    switch (req.method) {
        case 'GET' :
            await get(context,req);
            break;
        case 'POST':
            await post(context,req);
            break;
        default:
            context.res ={
                body: "Please get or post"
            };
            break
    }
}

async function post(context,req){
    try{
        let payload = req.body; //make payload be the data from the signup form
        await db.insert(payload) //insert into .db (database)
        context.res = {
            body: {status: 'Succes'} //return succes
        }
    } catch(error) {
        context.res = {
            status: 400,
            body: error.message
        }
    }
}
