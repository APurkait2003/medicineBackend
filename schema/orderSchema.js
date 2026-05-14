const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    items: [
        {
            mediId: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            priceAtPurchase: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    deliveryAddress: {
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
            required: true
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
            required: true
        },
        houseNo : {
            type : String
        },
        landmark : {
            type : String,
            required : true
        },
        area : {
            type : String,
            required : true
        }
    },
    paymentMethod : {
        type : String,
        required : true
    },
    paymentStatus : {
        type : String,
        required : true,
        default : 'pending'
    },
    orderStatus : {
        type : String,
        required : true,
        default : 'placed'
    },
    orderDate : {
        type : Date,
        required : true,
        default : Date
    },
    expectedDeliveryDate : {
        type : Date,
        required : true
    }
})

module.exports = mongoose.model('orderModel', orderSchema, 'order')
console.log('Order schema is working.')