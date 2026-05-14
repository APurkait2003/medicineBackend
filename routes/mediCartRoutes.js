const express = require('express')
const cartRoutes = express.Router()

const mediCartController = require('../controller/mediCartController')

cartRoutes.post('/addCart', mediCartController.addCart)
cartRoutes.get('/details/:userId', mediCartController.cartDetailsByUserId)
cartRoutes.delete('/remove/:mediId', mediCartController.removeFromCart)
cartRoutes.delete('/remove/all/:userId', mediCartController.deleteAllFromCart)
cartRoutes.put('/update/:userId/:mediId', mediCartController.updateQuantity)

module.exports = cartRoutes
console.log('Medi cart routes is working.')