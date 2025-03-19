const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        "ResidentName":{type:String,require:true},
        "FlatId":{type:String,require:true},
        "ComplaintType":{type:String,require:true},
        "PriorityLevel":{type:String,require:true},
        "DateFilled":{type:String,require:true},
        "ContactNo":{type:String,require:true},
        "status":{type:String,require:true,default:"pending"},
        "postedby":{type: mongoose.Schema.Types.ObjectId,ref: "users"}
        
    }
)
let complaintmodel=mongoose.model("complaints",schema);

module.exports=complaintmodel