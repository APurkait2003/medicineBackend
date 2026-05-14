const express = require('express')
const medicineRouter = express.Router()

const multer = require('multer')

const cloudinary = require('../cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const storage = new CloudinaryStorage({
  cloudinary : cloudinary,
  params : {
    folder : 'medicinesImages',
    allowedFormats : ['jpg', 'jpeg', 'png']
  }
})

const upload = multer({ storage })

const medicineController = require('../controller/medicineController')

medicineRouter.post("/add", upload.array('medicineImages', 5), medicineController.addMedicine)
medicineRouter.get("/all", medicineController.allMedicine)
medicineRouter.get("/:mediId", medicineController.medicineById)
medicineRouter.delete("/delete/:mediId", medicineController.deleteMedicineById)
medicineRouter.put("/update/:mediId", upload.array('medicineImages', 5), medicineController.updateMedicineById)

module.exports = medicineRouter
console.log("Medicine router is working.")