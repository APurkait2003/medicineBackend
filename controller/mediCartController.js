const mediCartSchema = require('../schema/mediCartSchema')

const addCart = async(req, res)=>{
    try{
        await mediCartSchema.create({
            userId : req.body.userId,
            mediId : req.body.mediId
        })
        return res.status(200).json({Message : 'Medicine added to cart.'})
    }
    catch(error){
        return res.status(501).json(error)
    }
}

const updateQuantity = async (req, res) => {
  try{
    const ifExists = await mediCartSchema.findOne({
        userId : req.params.userId,
        mediId : req.params.mediId
    })

    if(ifExists){
        await mediCartSchema.updateOne(
        {
            userId : req.params.userId,
            mediId : req.params.mediId
        },
        {
            $set : {quantity : req.body.quantity}
        })
        return res.status(200).json({Message : 'Successfully.'})
    }
    else{
        return res.status(501).json({Message : 'Not found.'})
    }
  }
  catch(error){
    return res.status(501).json(error?.message)
  }
}

const cartDetailsByUserId = async(req, res)=>{
    try{
        const ifExists = await mediCartSchema.find({
            userId : req.params.userId
        })
        if(!ifExists){
            return res.status(501).json({Message : 'Cart is empty.'})
        }
        else{
            return res.status(200).json(ifExists)
        }
    }
    catch(error){
        return res.status(501).json(error.message)
    }
}

const removeFromCart = async(req, res)=>{
    try{
        const ifExists = await mediCartSchema.findOne({
            mediId : req.params.mediId
        })

        if(!ifExists){
            return res.status(501).json({Message : 'Medicine not found.'})
        }
        else{
            await mediCartSchema.deleteOne({
                mediId : req.params.mediId
            })
            return res.status(200).json({Message : 'Medicine remove from the cart.'})
        }
    }
    catch(error){
        return res.status(501).json(error.message)
    }
}

const deleteAllFromCart = async(req, res)=>{
    try{
        let ifCartExixts = await mediCartSchema.find({userId : req.params.userId})

        if(ifCartExixts.length === 0){
            return res.status(501).json({Message : 'Cart is empty.'})
        }
        else{
            await mediCartSchema.deleteMany({userId : req.params.userId})
            return res.status(200).json({ Message: 'Cart cleared successfully' })
        }
    }
    catch(error){
        return res.status(501).json(error)
    }
}

module.exports = {
    addCart,
    cartDetailsByUserId,
    removeFromCart,
    updateQuantity,
    deleteAllFromCart
}
console.log('Medi cart controller is working.')