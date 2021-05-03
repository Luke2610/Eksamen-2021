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
        let user_id = req.query.user_id
        let gender = req.query.gender;
        let interestedInGender = req.query.interestedInGender
        let minAge = req.query.minAge
        let maxAge = req.query.maxAge

        let user = await db.select_other_users(user_id,gender,interestedInGender,minAge,maxAge)
        context.res = {
            body: user
        }
    } catch(error) {
        context.res = {
            status: 400,
            body: `No users with that gender - ${error.message}`
        }
    }
}