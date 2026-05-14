const addressSchema = require('../schema/addressSchema')

const addAddress = async (req, res) => {
    try {
        const addressDetails = await addressSchema.find({ userId: req.params.userId, addressType: req.body.addressType })

        if (addressDetails.length === 0 || req.body.addressType === 'Other') {
            await addressSchema.create({
                addressId: `ADDRESS${req.body.addressType}${req.params.userId}${Math.floor(Math.random()*9999)}`,
                userId: req.params.userId,
                addressType: req.body.addressType,
                phone: req.body.phone,
                altPhone: req.body.altPhone,
                addressLine: req.body.addressLine,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
                area: req.body.area,
                landmark: req.body.landmark,
                houseNo: req.body.houseNo
            })

            return res.status(200).json({ Message: 'Address added successfully.' })
        }
        else {
            return res.status(501).json({ Message: 'Address type is already exists. Try with another address type or remove this address and try again.' })
        }
    }
    catch (error) {
        return res.status(501).json({error : error?.message})
    }
}

const removeAddress = async (req, res) => {
    try{
        const addressDetails = await addressSchema.findOne({userId : req.params.userId, addressId : req.params.addressId})

        if(!addressDetails){
            return res.status(501).json({Message : 'Address not find.'})
        }
        else{
            await addressSchema.deleteOne({addressId : req.params.addressId})
            return res.status(200).json({Message : 'Address deleted successfully.'})
        }
    }
    catch(error){
        return res.status(501).json({error : error?.message})
    }
}

const allAddressByUserId = async (req, res) => {
    try{
        allAddresses = await addressSchema.find()
        if(!allAddresses){
            return res.status(501).json({Message : 'No address found. Please add address.'})
        }
        else{
            return res.status(200).json(allAddresses)
        }
    }
    catch(error){
        return res.status(501).json(error?.message)
    }
}

const updateAddressByUserId = async (req, res) => {
  try {
    const addressDetails = await addressSchema.findOne({
      userId: req.params.userId,
      addressId: req.params.addressId
    });

    if (!addressDetails) {
      return res.status(404).json({ message: 'Address not found.' });
    }

    const isPresentAddressType = await addressSchema.findOne({
      userId: req.params.userId,
      addressType: req.body.addressType,
      addressId: { $ne: req.params.addressId } // exclude current
    });

    if (isPresentAddressType) {
      return res.status(400).json({ message: 'Address type already exists.' });
    }

    await addressSchema.updateOne(
      {
        userId: req.params.userId,
        addressId: req.params.addressId
      },
      {
        addressType: req.body.addressType,
        phone: req.body.phone,
        altPhone: req.body.altPhone,
        addressLine: req.body.addressLine,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        area: req.body.area,
        landmark: req.body.landmark,
        houseNo: req.body.houseNo
      }
    );

    return res.status(200).json({ Message: 'Address updated successfully.' });

  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const addressByUserId = async(req, res)=>{
    try{
        const addressInfo = await addressSchema.findOne({
            userId : req.params.userId,
            addressId : req.params.addressId
        })

        if(addressInfo.length === 0){
            return res.status(501).json({Message : 'Address not found.'})
        }
        else{
            return res.status(200).json(addressInfo)
        }
    }
    catch(error){
        return res.status(501).json(error.message)
    }
}

module.exports = {
    addAddress,
    removeAddress,
    allAddressByUserId,
    updateAddressByUserId,
    addressByUserId
}
console.log('Address controller is working.')