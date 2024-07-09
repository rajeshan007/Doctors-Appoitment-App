const User = require('../models/userModel')
const Doctor  = require('../models/doctorModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')


const usersCtrl = {}

usersCtrl.register = async (req, res) => {
    try {
        // if user is already registered 
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).send({ message: "User already registerd", sucess: false })
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword
        const newUser = new User(req.body)
        await newUser.save()
        res.status(200).send({ message: "User Registerd Sucessfully", sucess: true, data: newUser })
    } catch (error) {
        res.status(500).send({ message: `Error creating user  ${error.message}`, sucess: false })
    }

}

usersCtrl.login = async (req, res) => {
    try {
        //check if the user is present or not
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({ message: "User not found", sucess: false })
        }
        // check if the password is matching or not
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: "invalid email or password", sucess: false })
        }
        // if password is match then create the token
        const tokenData = { id: user._id }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "30d" })
        res.status(200).send({ message: "Login Sucessfully", sucess: true, token: ` Bearer ${token}` })

    } catch (error) {
        res.status(500).json({ message: ` Error Login failed ${error.message}`, sucess: false, error })

    }
}

// get user details
usersCtrl.getUser = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.userId })
        user.password = undefined
        //console.log(user);
        if (!user) {
            return res.status(200).send({ message: "User Not found", success: false })
        } else {
            res.status(200).send({
                success: true,
                data: user
            })
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: 'Auth Error',
            success: false,
            err
        })
    }
}






module.exports = usersCtrl

