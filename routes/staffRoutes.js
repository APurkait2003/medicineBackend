const express = require('express')
const staffRouter = express.Router()

const staffController = require('../controller/staffController')

staffRouter.post("/signup",staffController.staffSignup)
staffRouter.post("/signin", staffController.staffSignin)
staffRouter.put("/update", staffController.updateStaff)
staffRouter.get("/all", staffController.allStaff)
staffRouter.delete("/delete/:staffid", staffController.deleteStaff)
staffRouter.get("/:staffid", staffController.staffById)

module.exports = staffRouter
console.log("Staff router is working.")