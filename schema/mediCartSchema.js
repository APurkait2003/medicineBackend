const mongoose = require('mongoose')

const mediCartSchema = mongoose.Schema({
    'userId' : {
        type : String,
        required : [true]
    },
    mediId : {
        type : String,
        require : [true]
    },
    quantity : {
        type : Number,
        required : [true],
        default : 1
    }
})

module.exports = mongoose.model('mediCartModel', mediCartSchema, "mediCart")
console.log('cart Schema is working.')