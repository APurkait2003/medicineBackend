const adminSchema = require('../schema/adminSchema')

const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

const bcrypt = require('bcrypt')
const hashPass = (input)=>{
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(input, salt)
    return hash;
}

const adminSignup = async(req,res)=>{
    try{
        const adminCount = await adminSchema.countDocuments()

        if(adminCount < 1){
            if(req.body.password === req.body.confirmPassword){
                await adminSchema.create({
                    "adminId" : "ADMIN-"+Math.floor(Math.random()*9999)+"-"+Date.now(),
                    "fullName" : req.body.fullName,
                    "mail" : req.body.mail,
                    "password" : hashPass(req.body.password)
                })
                return res.status(200).json({Message : "Signup Successfully."})
            }
            else{
                return res.status(501).json({Message : "Password not Matched."})
            }
        }
        else{
            return res.status(501).json({Message : "Admin already added."})
        }
    }
    catch(error){
        return res.status(501).json(error)
    }
}

const adminSignin = async(req,res)=>{
    try{
        const ifExists = await adminSchema.findOne({"mail" : req.body.mail})

        if(ifExists){
            let isPassMatch = bcrypt.compareSync(req.body.password, ifExists.password)
            if(isPassMatch){
                const jwToken = jwt.sign({"adminId" : ifExists.adminId}, process.env.privateKey, {expiresIn : "1h"})
                return res.status(200).json({Message : "Signin Successfully.", adminToken : jwToken})
            }
            else{
                return res.status(501).json({Message : "Wrong password or mail."})
            }
        }else{
            return res.status(501).json({Message : 'Admin not ifExists.'})
        }
    }
    catch(error){
        return res.status(501).json(error)
    }
}

module.exports = {
    adminSignup,
    adminSignin
}