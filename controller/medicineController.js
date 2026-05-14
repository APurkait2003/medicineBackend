const medicineSchema = require('../schema/medicineSchema')

const addMedicine = async (req, res) => {
    try {
        let ifExists = await medicineSchema.findOne({ "name": req.body.name })

        if (ifExists) {
            return res.status(501).json({ Message: "Medicine already added." })
        }
        else {
            await medicineSchema.create({
                "medicineId": `MEDI-${Math.floor(Math.random() * 9999)}-${Date.now()}`,
                "name": req.body.name,
                "strength": req.body.strength,
                "form": req.body.form,
                "brand": req.body.brand,
                "category": req.body.category,
                "originalPrice": req.body.originalPrice,
                "discountPercentage": req.body.discountPercentage,
                "discountPrice": req.body.discountPrice,
                "stock": req.body.stock,
                "manufacturer": req.body.manufacturer,
                "description": req.body.description,
                "uses": req.body.uses,
                "sideEffects": req.body.sideEffects,
                "createdDate": req.body.createdDate,
                "expiryDate": req.body.expiryDate,
                "medicineImages": req.files ? req.files.map(f => f.path) : []
            })
            return res.status(200).json({ Message: "Medicine added successfully." })
        }
    }
    catch (error) {
        return res.status(501).json(error)
    }
}

const allMedicine = async (req, res) => {
    try {
        const medicineInfo = await medicineSchema.find()
        if (!medicineInfo) {
            return res.status(501).json({ Message: "No data found." })
        }
        else {
            return res.status(200).json(medicineInfo)
        }
    }
    catch (error) {
        return res.status(501).json(error)
    }
}

const medicineById = async (req, res) => {
    try {
        const ifExists = await medicineSchema.findOne({ medicineId: req.params.mediId })

        if (ifExists) {
            return res.status(200).json(ifExists)
        } else {
            return res.status(501).json({ Message: "Medicine not found." })
        }
    }
    catch (error) {
        return res.status(501).json(error)
    }
}

const deleteMedicineById = async (req, res) => {
    try {
        const ifExists = await medicineSchema.findOne({ "medicineId": req.params.mediId })

        if (ifExists) {
            await medicineSchema.deleteOne({ "medicineId": req.params.mediId })
            return res.status(200).json({ Message: "Delete successfully." })
        }
        else {
            return res.status(501).json({ Message: "Medicine not find." })
        }
    }
    catch (error) {
        return res.status(501).json(error)
    }
}

const updateMedicineById = async (req, res) => {
    try {
        const ifExists = await medicineSchema.findOne({ "medicineId": req.params.mediId })

        if (ifExists) {
            const updateData = await medicineSchema.updateOne(
                { medicineId: req.params.mediId },
                {
                    "name": req.body.name,
                    "strength": req.body.strength,
                    "originalPrice": req.body.originalPrice,
                    "discountPercentage": req.body.discountPercentage,
                    "discountPrice": req.body.discountPrice,
                    "stock": req.body.stock,
                    "expiryDate": req.body.expiryDate,
                    'medicineImages': req.files ? req.files.map(f => f.path) : []
                })
            if (updateData.modifiedCount === 0) {
                return res.status(501).json({ Message: "No changes for update." })
            }
            else {
                return res.status(200).json({ Message: "Medicine update successfully." })
            }
        }
        else {
            return res.status(501).json({ Message: "Medicine not find." })
        }
    }
    catch (error) {
        return res.status(501).json(error)
    }
}

module.exports = {
    addMedicine,
    allMedicine,
    medicineById,
    deleteMedicineById,
    updateMedicineById
}
console.log("Medicine controller is working.")