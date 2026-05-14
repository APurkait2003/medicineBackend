const express = require('express')
const orderRouter = express.Router()

const orderController = require('../controller/orderController')

orderRouter.post('/placed/:userId', orderController.addOrder)
orderRouter.get('/all', orderController.allOrders)
orderRouter.get('/all/:userId', orderController.allOrdersByUserId)
orderRouter.get('/:orderId', orderController.getOrderByOrderId)
orderRouter.put('/update/:orderId', orderController.updateOrder)
orderRouter.delete('/delete/:orderId', orderController.deleteOrder)

module.exports = orderRouter
console.log('Order router is working.')