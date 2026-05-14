const mongoose = require('mongoose')

const medicineSchema = mongoose.Schema({
    "medicineId" : {
        type : String,
        required : [true]
    },
    "name" : {
        type : String,
        required : [true, "medicine name is required."],
        validate : {
            validator : (mediNameValue)=>{
                let medicineNameRegex = /^[A-Za-z0-9 .()\-\/+®™%]{2,120}$/
                if(medicineNameRegex.test(mediNameValue)) return true; return false
            },
            message : (mediNameProps)=>{
                return `${mediNameProps} Enter valid medicine name.`
            }
        }
    },
    "strength" : {
        type : String,
        required : [true, "Medicine strength is required."],
        validate : {
            validator : (mediStrengthValue)=>{
                let medicineStrengthRegex = /^\d+(\.\d+)?\s?(mg|ml|g)([\/+]\d+(\.\d+)?\s?(mg|ml|g))*$/
                if(medicineStrengthRegex.test(mediStrengthValue)) return true; return false
            },
            message : (mediStrengthProps)=>{
                return `${mediStrengthProps} Enter valid medicine strength.`
            }
        }
    },
    "form" : {
        type : String,
        required : [true, "Medicine form is required."],
        validate : {
            validator : (mediFormValue)=>{
                let medicineFormRegex = /^(tablet|capsule|syrup)$/i
                if(medicineFormRegex.test(mediFormValue)) return true; return false
            },
            message : (mediFormProps)=>{
                return `${mediFormProps} Enter valid medicine form.`
            }
        }
    },
    "brand" : {
        type : String,
        required : [true, "Brand is required."]
    },
    "category" : {
        type : String,
        required : [true, "medicine category is required."]
    },
    'originalPrice' : {
        type : Number,
        required : [true, 'Original price is required.'],
        validate : {
            validator : (oriPriceValue)=>{
                let medicinePriceRegex = /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/
                if(medicinePriceRegex.test(oriPriceValue)) return true; return false
            },
            message : (oriPriceProps)=>{
                return `${oriPriceProps} Enter valid price.`
            }
        }
    },
    'discountPercentage' : {
        type : Number,
        required : [true, 'Discount percentage is required.'],
        validate : {
            validator : (dictPercentageValue)=>{
                let medicinePriceRegex = /^(100|[1-9]?\d)(\.\d{1,2})?$/
                if(medicinePriceRegex.test(dictPercentageValue)) return true; return false
            },
            message : (dictPercentageProps)=>{
                return `${dictPercentageProps} Enter valid price.`
            }
        }
    },
    'discountPrice' : {
        type : Number,
        required : [true, 'Discount price is required.'],
        validate : {
            validator : (discPriceValue)=>{
                let medicinePriceRegex = /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/
                if(medicinePriceRegex.test(discPriceValue)) return true; return false
            },
            message : (discPriceProps)=>{
                return `${discPriceProps} Enter valid price.`
            }
        }
    },
    "stock" : {
        type : Number,
        required : [true, "In stock is required."]
    },
    "manufacturer" : {
        type : String,
        required : [true, "medicine manufacturer is required."]
    },
    "description" : {
        type : String,
        required : [true, "medicine description is required."]
    },
    "uses" : {
        type : String,
        required : [true, "Used for is required."]
    },
    "sideEffects" : {
        type : String,
        required : [true, "side effects is required."]
    },
    "createdDate" : {
        type : Date,
        required : [true, "Create date is required."]
    },
    "expiryDate" : {
        type : Date,
        required : [true, "Expiry date is required."]
    },
    'medicineImages' : {
        type : [],
        required : [true, 'Medicine picture is required.']
    }
})

module.exports = mongoose.model("medicineModel", medicineSchema, "medicine")
console.log("Medicine schema is working.")