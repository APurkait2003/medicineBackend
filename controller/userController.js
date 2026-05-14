const userSchema = require('../schema/userSchema')

const jwt = require('jsonwebtoken')
const env = require('dotenv')

const bcrypt = require('bcrypt')
const { ModifiedPathsSnapshot } = require('mongoose')
const hashPass = (input) => {
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(input, salt)
  return hash;
}

const userSignup = async (req, res) => {
  try {
    const ifExists = await userSchema.findOne({
      $or: [
        { phoneNo: req.body.phoneNo },
        { mail: req.body.mail }
      ]
    });

    if (ifExists) {
      if (ifExists.mail === req.body.mail) {
        return res.status(501).json({ Message: "Mail is already Exists." });
      }
      else if (ifExists.phoneNo === req.body.phoneNo) {
        return res.status(501).json({ Message: "Phone number is already Exists." });
      }
    }

    if (req.body.password === req.body.confirmPassword) {
      await userSchema.create({
        userId: "USER-" + Math.floor(Math.random() * 9999) + "-" + Date.now(),
        fullName: req.body.fullName,
        mail: req.body.mail,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        pincode: req.body.pincode,
        password: hashPass(req.body.password)
      });

      return res.status(200).json({ Message: "Signup successfully." });
    } else {
      return res.status(501).json({ Message: "Password not matched." });
    }

  } catch (error) {
    return res.status(501).json(error);
  }
}

const userSignin = async (req, res) => {
  try {
    const loginId = req.body.mailPhone;
    const query = loginId.includes('@') ? {mail : loginId} : {phoneNo : loginId}
    const ifExists = await userSchema.findOne(query)

    if (ifExists) {
      const userPassMatch = bcrypt.compareSync(req.body.password, ifExists.password)
      if (userPassMatch) {
        const jwToken = jwt.sign({ "mail": ifExists.mail }, process.env.privateKey, { expiresIn: "1h" })
        return res.status(200).json({ Message: "Signin Successfully.", userToken: jwToken, userId : ifExists.userId })
      }
      else {
        return res.status(501).json({ Message: "Password not matched." })
      }
    } else {
      return res.status(501).json({ Message: "User not find. Signup First." })
    }
  }
  catch (error) {
    return res.status(501).json(error)
  }
}

const allUser = async (req, res) => {
  try {
    const userInfo = await userSchema.find()

    if (!userInfo) {
      return res.status(501).json({ Message: "No user." })
    }
    else {
      return res.status(200).json(userInfo)
    }
  }
  catch (error) {
    return res.status(501).json(error)
  }
}

const updateUserAfterLogin = async (req, res) => {
  try {
    const ifExists = await userSchema.findOne({
      "userId" : req.params.userId
    })

    const updatedData = await userSchema.updateOne({
      "fullName": req.body.fullName,
      "address": req.body.password,
      "pincode": req.body.pincode
    })

    if (ifExists) {
      if (updatedData.modifiedCount !== 0) {
        return res.status(200).json({ Message: "Update successfully." })
      }
      else {
        return res.status(501).json({ Message: "You should make change for update." })
      }
    }
    else {
      return res.status(501).json({ Message: "User not find." })
    }
  }
  catch (error) {
    return res.status(501).json(error)
  }
}

const userForgetPass = async(req, res)=>{
  try{
    const ifExists = await userSchema.findOne({
      $or : [
        {"mail" : req.body.mail},
        {"phoneNo" : req.body.phoneNo}
      ]
    })

    if(ifExists){
      const oldPass = bcrypt.compareSync(req.body.password, ifExists.password)
      if(req.body.password === req.body.confirmPassword){
        if(oldPass){
          return res.status(501).json({Message : "Entered old password."})
        }
        else{
          await userSchema.updateOne({
            "password" : hashPass(req.body.password),
            "confirmPassword" : hashPass(req.body.confirmPassword)
          })
          return res.status(200).json({Message : "Update done. Now login with new password."})
        }
      }
      else{
        return res.status(501).json({Message : "Password not matched."})
      }
    }else{
      return res.status(501).json({Message : "User not find."})
    }
  }
  catch(error){
    return res.status(501).json(error)
  }
}

const userById = async(req, res)=>{
  try{
    const ifExists = await userSchema.findOne({
      "userId" : req.params.userId
    })

    if(ifExists){
      return res.status(200).json(ifExists)
    }
    else{
      return res.status(501).json({Message : "User not find."})
    }
  }
  catch(error){
    return res.status(501).json(error)
  }
}

const deleteUser = async(req, res)=>{
  try{
    const ifExists = await userSchema.findOne({
      "userId" : req.params.userId
    })

    if(ifExists){
      await userSchema.deleteOne({
        "userId" : req.params.userId
      })
      return res.status(200).json({Message : "Delete successfully."})
    }
    else{
      return res.status(501).json({Message : "User not find."})
    }
  }
  catch(error){
    return res.status(501).json(error)
  }
}

module.exports = {
  userSignup,
  userSignin,
  allUser,
  updateUserAfterLogin,
  userForgetPass, 
  userById,
  deleteUser
}