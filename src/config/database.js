const mongoose = require("mongoose")

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://anushazz841:anushazz841@cluster0.cnvb6.mongodb.net/devTinder")
}

module.exports = connectDB;