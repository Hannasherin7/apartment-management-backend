const usermodel = require('../models/user')

const userProfile = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user.id }).select("-password")
        // console.log(user)
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        res.status(200).json({ status: "success", user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });

    }
}

module.exports = {
    userProfile
}


