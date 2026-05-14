const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "userId" : {
        type : String,
        required : [true]
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
    "phoneNo" : {
        type : String,
        required : [true, "Phone no. is required."],
        validate : {
            validator : (pnoValue)=>{
                let phNoRegex = /^(\+91)?[6-9]\d{9}$/
                if(phNoRegex.test(pnoValue)) return true; return false
            },
            message : (pnoProps)=>{
                return `${pnoProps} Enter valid phone no.`
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

module.exports = mongoose.model("userModel", userSchema, "user")
console.log("User schema is working.")