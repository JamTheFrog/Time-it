const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const keys = require("../../keys/keys")

const User = mongoose.model("users")

const router = express.Router()
const baseEndpoint = "/api/users"

router.post(`${baseEndpoint}/signin`, async (req,res) => {
    const {email, password} = req.body
    
    const exsistingUser = await User.findOne({email})
    if(!exsistingUser) return res.status(401).send({msg: "Auth failed"})

    const isMatch = await bcrypt.compare(password, exsistingUser.password)

    if(!isMatch) return res.status(401).send({msg: "Auth failed"})

    const token = jwt.sign({id: exsistingUser._id, role: exsistingUser.role}, keys.JWT_SECRET_KEY, {expiresIn:"2h"})
    res.send({token})
})

module.exports = router