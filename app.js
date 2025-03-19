const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwtoken = require("jsonwebtoken")
const router = express.Router();
const indexRouter = require('./routes/index')
require('./config/db')



const app = express()
app.use(cors())
app.use(express.json())




app.use('/',indexRouter)




app.listen(8088,()=>{
    console.log("server started",8088)
})