const mongoose = require('mongoose')

const dbConnect = async()=>{
    try{
        await mongoose.connect("mongodb+srv://AritraPurkait:Aritra2003@cluster0.wz2aegp.mongodb.net/medicineDB")

        console.log("Database connected Successfully.")
    }
    catch(error){
        console.log(error)
    }
}

module.exports = dbConnect()
console.log("Database is working.")