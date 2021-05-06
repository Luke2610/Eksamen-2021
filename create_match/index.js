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
    var result = []
    try{
        let user_id = req.query.user_id;
        let liked_users = await db.get_like_for_like(user_id)

        for(i=0;i<liked_users.length;i++){
            let liked_user = liked_users[i]
            let like_id_1 = liked_user[0].value
            let like_id_2 = liked_user[4].value
            let other_user_id = liked_user[2].value
            let match = await db.create_match(like_id_1,like_id_2,user_id,other_user_id)
        }

        let matches = await db.get_match(user_id)
        context.res = {
            body: matches
        }
    } catch(error) {
        context.res = {
            status: 400,
            body: `No like - ${error.message}`
        }
    }
}