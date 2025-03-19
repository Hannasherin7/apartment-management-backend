require('../config/db')
const { generateHashedpswd } = require("../helper/index")
const usermodel = require('../models/user')


const signup = async () => {
    try {
        let input = {
            "Name": "admin",
            "ContactNo": "987664677775",
            "email": "admin@apartment.com",
            "password": "admin",
            isAdmin: true

        }
        let hashedpswd = await generateHashedpswd(input.password);
        input.password = hashedpswd; // This is for getting hashed password in db

        let user = new usermodel(input);
        await user.save();
        console.log('data uploaded')
    } catch (error) {
        console.error("Error during signup", error);
    }
}


signup()