const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    "adminId" : {
        type : String,
        required : true
    },
    "fullName" : {
        type : String,
        required : [true, "Full Name is required."],
        validate : {
            validator : (fNameValue) =>{
                let fNameRegex = /^[A-Za-z]+( [A-Za-z]+){0,2}$/
                if(fNameRegex.test(fNameValue)) return true; return false
            },
            message : (nameProps)=>{
                return `${nameProps} Enter valid Name.`
            }
        }
    },
    "mail" : {
        type : String,
        required : [true, "Mail is required"],
        validate : {
            validator : (mailValue)=>{
                let mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if(mailRegex.test(mailValue)) return true; return false
            },
            message : (mailProps)=>{
                return `${mailProps} Enter valid Mail.`
            }
        }
    },
    "password" : {
        type : String,
        required : [true, "Password is required."],
        validate : {
            validator : (passValue)=>{
                let passRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?!.*\s).*$/
                if(passRegex.test(passValue)) return true; return false
            },
            message : (passProps)=>{
                return `${passProps} Enter valid password.`
            }
        }
    },
    "confirmPassword" : {
        type : String
    }
})

module.exports = mongoose.model("adminModel",adminSchema,"admin")
console.log("Admin schema is working.")