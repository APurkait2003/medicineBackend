const orderSchema = require('../schema/orderSchema')

const addOrder = async (req, res) => {
    try {
        const orderDate = new Date()

        const deliveryDate = new Date()
        deliveryDate.setDate(orderDate.getDate() + 5)
        await orderSchema.create({
            orderId: `ORDER-${Math.floor(Math.random() * 9999)}-${Date.now()}`,
            userId: req.params.userId,
            mediId: req.body.mediId,
            items: req.body.items,
            totalAmount: req.body.totalAmount,
            deliveryAddress: req.body.deliveryAddress,
            paymentMethod: req.body.paymentMethod,
            paymentStatus: req.body.paymentStatus,
            orderStatus: req.body.orderStatus,
            expectedDeliveryDate : deliveryDate
        })
        return res.status(200).json('Order Placed successfully.')
    }
    catch (error) {
        return res.status(501).json(error?.message)
    }
}

const allOrdersByUserId = async (req, res) => {
    try {
        const orderDetails = await orderSchema.find({ userId: req.params.userId })

        if (orderDetails.length === 0) {
            return res.status(501).json({ Message: 'Order list is empty. Buy medicines.' })
        }
        else {
            return res.status(200).json(orderDetails)
        }
    }
    catch (error) {
        return res.status(501).json(error.message)
    }
}

const updateOrder = async (req, res) => {
    try {
        const ifOrderExists = await orderSchema.findOne({ orderId: req.params.orderId })

        if (ifOrderExists) {
            await orderSchema.updateOne({ orderId: req.params.orderId },
                {
                    $set: {
                        paymentStatus : req.body.paymentStatus,
                        orderStatus : req.body.orderStatus,
                        expectedDeliveryDate : req.body.expectedDeliveryDate
                    }
                }
            )
            return res.status(200).json({Message : 'Order updated successfully.'})
        }
        else {
            return res.status(501).json({ Message: 'Order not exists.' })
        }
    }
    catch (error) {
        return res.status(501).json(error.message)
    }
}

const getOrderByOrderId = async(req, res)=>{
    try{
        const existsOrder = await orderSchema.findOne({orderId : req.params.orderId})

        if(existsOrder){
            return res.status(200).json(existsOrder)
        }
        else{
            return res.status(501).json({Message : 'Order not find.'})
        }
    }
    catch(error){
        return res.status(501).json(error.message)
    }
}

const allOrders = async(req, res)=>{
    try{
        let allUserExists = await orderSchema.find()

        if(allUserExists.length === 0){
            return res.status(501).json({Message : 'No order exists.'})
        }
        else{
            return res.status(200).json(allUserExists)
        }
    }
    catch(error){
        return res.status(501).json(error.message)
    }
}

const deleteOrder = async(req, res)=>{
    try{
        const orderExists = await orderSchema.findOne({orderId : req.params.orderId})

        if(!orderExists){
            return res.status(501).json({Message : 'Order not found.'})
        }
        else{
            await orderSchema.deleteOne({orderId : req.params.orderId})
            return res.status(200).json({Message : 'Order cancelled successfully.'})
        }
    }
    catch(error){
        return res.status(501).json(error.message)
    }
}

module.exports = {
    addOrder,
    allOrdersByUserId,
    updateOrder,
    getOrderByOrderId,
    allOrders,
    deleteOrder
}
console.log('Order controller is working.')