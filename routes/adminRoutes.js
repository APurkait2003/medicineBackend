const express = require('express')
const adminRoutes = express.Router()

const adminController = require('../controller/adminController')

adminRoutes.post("/signup", adminController.adminSignup)
adminRoutes.post("/signin", adminController.adminSignin)

module.exports = adminRoutes