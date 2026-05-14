const addressController = require('../controller/addressController')

const express = require('express')
const addressRoute = express.Router()

addressRoute.post('/user/address/add/:userId', addressController.addAddress)
addressRoute.delete('/user/address/delete/:userId/:addressId', addressController.removeAddress)
addressRoute.get('/user/address/allAddress/:userId', addressController.allAddressByUserId)
addressRoute.get('/user/address/:userId/:addressId', addressController.allAddressByUserId)
addressRoute.put('/user/address/update/:userId/:addressId', addressController.updateAddressByUserId)

module.exports = addressRoute
console.log('Address routes is working.')