const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    addressId : {
        type : String,
        required : true  
    },
    userId : {
        type : String,
        required : true
    },
    addressType: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    altPhone: {
        type: String,
        required: true,
        validate : {
            validator : (altPhoneValue)=>{
                let altPhoneRegex = /^(\+91)?[6-9]\d{9}$/
                if(altPhoneRegex.test(altPhoneValue)) return true; return false
            },
            message : (altPhoProps)=>{
                return `${altPhoProps} Enter valid phone number.`
            }
        }
    },
    addressLine: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true,
        validate : {
            validator : (pincodeValue)=>{
                let altPhoneRegex = /^[1-9][0-9]{5}$/
                if(altPhoneRegex.test(pincodeValue)) return true; return false
            },
            message : (pincodeProps)=>{
                return `${pincodeProps} Enter valid pincode.`
            }
        }
    },
    area: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    houseNo: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('addressModel', addressSchema, 'address')
console.log('Address schema is working.')