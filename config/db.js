const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://hannasherin:Alazhar4@cluster0.agtcb.mongodb.net/DBapartment-management?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));