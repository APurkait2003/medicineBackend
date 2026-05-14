const staffSchema = require('../schema/staffSchema')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

const hashPass = (input)=>{
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(input, salt)
    return hash;
}

const genId = "STAFF-"+Math.floor(Math.random()*9999)+"-"+Date.now()
const staffSignup = async(req, res)=>{
    try{
        const ifExists = await staffSchema.findOne({"mail" : req.body.mail})
        if(ifExists){
            return res.status(501).json({Message : "Mail already exists."})
        }else{
            if(req.body.confirmPassword !== req.body.password){
                return res.status(501).json({Message : "Confirm password not Matched."})
            }else{
                const staffInfo = await staffSchema.create({
                    "staffId" : genId,
                    "fullName" : req.body.fullName,
                    "mail" : req.body.mail,
                    "password" : hashPass(req.body.password)
                })

                if(!staffInfo){
                    return res.status(501).json({Message : "User not added. Something went wrong."})
                }else{
                    return res.status(200).json({Message : "Signup Successfully."})
                }
            }
        }
    }
    catch(error){
        return res.status(501).json(error)
    }
}

const staffSignin = async(req,res)=>{
    try{
        const ifExists = await staffSchema.findOne({"mail" : req.body.mail})

        if(ifExists){
            let passMatch = bcrypt.compareSync(req.body.password, ifExists.password)
           if(passMatch){
            const jwToken = jwt.sign({"staffId" : ifExists.staffId}, process.env.privateKey, {expiresIn : "1h"})
            return res.status(200).json({Message : "Login successful.", staffToken : jwToken})
           }else{
            return res.status(501).json({Message : "Wrong Password."})
           }
        }
        else{
            return res.status(501).json({Message : "Staff not find. Signup First."})
        }
    }
    catch(error){
        console.log(error)
    }
}

const updateStaff = async(req,res)=>{
    try{
        let ifExists = await staffSchema.findOne({"mail" : req.body.mail})

        let oldPass = bcrypt.compareSync(req.body.password, ifExists.password)

        if(ifExists){
            if(req.body.password === req.body.confirmPassword){
                if(oldPass === true){
                    return res.status(501).json({Message : "Try with diffrent password."})
                }else{
                    await staffSchema.updateOne({
                        "password" : hashPass(req.body.password)
                    })
                    return res.status(200).json({Message : "Update Successfully."})
                }
            }
            else{
                return res.status(501).json({Message : "Password not Matched."})
            }
        }
        else{
            return res.status(501).json({Message : "User not find."})
        }
    }
    catch(error){
        return res.status(501).json(error)
    }
}

const allStaff = async(req,res)=>{
    try{
        let staffInfo = await staffSchema.find()

        if(!staffInfo){
            return res.status(501).json({Message : "Empty"})
        }else{
            return res.status(200).json(staffInfo)
        }
    }
    catch(error){
        return res.status(501).json(error)
    }
}

const deleteStaff = async(req,res)=>{
    try{
        let ifExists = await staffSchema.findOne({"staffId" : req.params.staffid})

        if(ifExists){
            await staffSchema.deleteOne({
                "staffId" : req.params.staffid
            })
            return res.status(200).json({Message : "Delete Successfully."})
        }
        else{
            return res.status(501).json({Message : "User not find."})
        }
    }
    catch(error){
        res.status(501).json(error)
    }
}

const staffById = async(req,res)=>{
    try{
        let ifExists = await staffSchema.findOne({"staffId" : req.params.staffid})

        if(ifExists){
            let staffInfo = await staffSchema.findOne({"staffId" : req.params.staffid})
            return res.status(200).json(staffInfo)
        }
        else{
            return res.status(501).json({Message : "Staff not find."})
        }
    }
    catch(error){
        return res.status(501).json(error)
    }
}

module.exports = {
    staffSignup,
    staffSignin,
    updateStaff,
    allStaff, 
    deleteStaff,
    staffById
}
console.log("Staff controller is working.")