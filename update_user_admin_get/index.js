const db = require('../shared/db')

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

async function get(context,req){
    try{
        let user = await db.update_user_admin_get()
        context.res = {
            body: user
        }
    } catch(error) {
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}