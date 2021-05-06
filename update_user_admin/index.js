const db = require('../shared/db')
/* Establishing a connection to th database */
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
        case 'PUT' :
            await put(context,req);
            break;
        default:
            context.res ={
                body: "Please get or post"
            };
            break
    }
}

async function put(context,req){
    try{
        let payload = req.body;
        await db.update_user_admin(payload)
        context.res = {
            body: {status: 'Succes'}
        }
    } catch(error) {
        context.res = {
            status: 400,
            body: error.message
        }
    }
}