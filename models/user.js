const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        "Name": { type: String, require: true },
        "FlatId": { type: String, },
        "ContactNo": { type: String, require: true },
        "FamilyMembers": { type: String },
        "Role": { type: String, require: false },
        "Occupation": { type: String, },
        "Indate": { type: String, },
        "email": { type: String, require: true, unique: true },
        "password": { type: String, require: true },
        isAdmin: { type: Boolean, require: true, default: false }
    }
)
let User = mongoose.model("users", schema);
module.exports = User


