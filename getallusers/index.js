const db = require('../shared/db')
/* Azure function for "adminpage" */
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
        case 'DELETE':
                await post(context,req);
                break;
        default:
            context.res ={
                body: "no user details"
            };
            break
    }
}
async function get(context,req){
    try{
        let user_id = req.query.user_id;
        let firstname = req.query.firstname;
        let lastname = req.query.lastname;
        let gender = req.query.gender;
        let birthdate = req.query.birthdate;
        let country = req.query.country;
        let city = req.query.city;
        let minAge = req.query.minAge;
        let maxAge = req.query.maxAge;
        let biography = req.query.biography;
        let email = req.query.email; 
        let hashed_password = req.query.hashed_password;

        let Users = await db.getallusers(user_id, firstname, lastname, gender,birthdate, country, city, minAge, maxAge, biography, email, hashed_password)
        context.res = {
            body: Users
        }
    } catch(error) {
        context.res = {
            status: 400,
            body: `Error! ${error.message}`
        }
    }
}