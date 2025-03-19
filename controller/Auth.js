const { generateHashedpswd, isMatch, generatetoken } = require('../helper/index')
const usermodel = require('../models/user')

const signup = async (req, res) => {
    try {
        let input = req.body;
        let hashedpswd = await generateHashedpswd(input.password);
        input.password = hashedpswd; 

        let user = new usermodel(input);
        await user.save();
        res.json({ "status": "SIGNUP" });
    } catch (error) {
        console.error("Error during signup", error);
        res.status(500).json({ "status": "error", "message": "Internal Server Error" });
    }
}


const signin = async (req, res) => {
    const { email, password } = req.body;
    console.log("Received login request:", { email, password }); 

    try {
        const user = await usermodel.findOne({ email });
        console.log("User found in DB:", user); 

        if (!user) {
            console.log("User not found");
            return res.status(200).json({ status: "Error", message: "User not found" });
        }
        const passwordError = await isMatch(password, user.password);
        console.log("Password check result:", passwordError); 
        if (passwordError) {
            console.log("Incorrect password");
            return res.status(200).json(passwordError); 
        }

        const token = generatetoken({ email, id: user?._id, isAdmin: user?.isAdmin })
        res.json({ status: "Success", userid: user._id, token, name: user?.Name, isAdmin: user?.isAdmin || "false" });
    } catch (error) {
        console.error("Sign-in error:", error);
        res.status(500).json({ status: "Error", message: "An error occurred. Please try again." });
    }
};


const residents = async (req, res) => {
    usermodel.find().then(
        (data) => {
            res.json(data)
        }
    ).catch(
        (error) => {
            res.json(error)
        }
    )
}
const deleteNonResident = async (req, res) => {

    let input = req.body
    usermodel.findByIdAndDelete(input._id).then(
        (response) => {
            res.json({ "status": "success" })
        }
    ).catch(
        (error) => {
            res.json({ "status": "error" })
        })

}
module.exports = {
    signin,
    signup,
    residents,
    deleteNonResident
}

