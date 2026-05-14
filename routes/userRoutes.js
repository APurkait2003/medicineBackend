const express = require('express')
const userRouter = express.Router()

const userController = require('../controller/userController')

userRouter.post("/signup", userController.userSignup)
userRouter.post("/signin", userController.userSignin)
userRouter.get("/all", userController.allUser)
userRouter.put("/update_after_login/:userId", userController.updateUserAfterLogin)
userRouter.put("/forget_pass", userController.userForgetPass)
userRouter.get("/:userId", userController.userById)
userRouter.delete("/delete/:userId", userController.deleteUser)

module.exports = userRouter
console.log("User router is working.")