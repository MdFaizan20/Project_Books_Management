const userModel = require("../models/userModel")
const valid = require("../validation/validator")
const jwt = require("jsonwebtoken")

//--------------------createUser(POST Api)---------------

const createUser = async function (req, res) {

    try {
        const requestBody = req.body;
        const { title, name, phone, email, password, address } = requestBody

        if (!valid.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide author details' })

        }

        if (!valid.isValid(title)) {
            return res.status(400).send({ status: false, message: 'Title is required' })

        }

        if (!valid.isValidtitle(title)) {
            return res.status(400).send({ status: false, message: `Title should be among Mr, Mrs, Miss` })

        }

        if (!valid.isValid(name)) {
            return res.status(400).send({ status: false, message: `name is required` })

        }

        if (!valid.isValid(phone)) {
            return res.status(400).send({ status: false, message: `phone no. is required` })

        }
        if (!valid.validatePhone(phone)) {
            return res.status(400).send({ status: false, msg: " plz provide valid phone no. " })
        }
        const usedPhoneNumber = await userModel.findOne({ phone: phone })

        if (usedPhoneNumber) {
            return res.status(400).send({ status: false, msg: "phone number is already used" })
        }

        if (!valid.isValid(email)) {
            return res.status(400).send({ status: false, message: `Email is required` })

        }
        if (!valid.isValidEmail(email)) {
            return res.status(400).send({ status: false, msg: "pls provide valid email id" })
        }
        const emailAlreadyUsed = await userModel.findOne({ email: email })
        if (emailAlreadyUsed) {
            return res.status(400).send({ status: false, msg: " email id already used" })
        }

        if (!valid.isValid(password)) {
            return res.status(400).send({ status: false, message: `Password is required` })

        }
        if (!valid.validatePassword(password)) {
            return res.status(400).send({ status: false, message: 'password should be between 8 and 15 characters' })

        }

        if (!valid.isValid(address)) {
            return res.status(400).send({ status: false, msg: "pls provide address" })
        }


        const createUserData = await userModel.create(req.body)
        res.status(201).send({ status: true, msg: "successfully created", data: createUserData })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


//------------------loginUser(POST Api)----------------


const loginUser = async function (req, res) {
    try {
        const email = req.body.email
        const password = req.body.password

        if (!valid.isValidEmail(email)) {
            return res.status(400).send({ status: false, msg: "pls provide valid password" })
        }
        if (!valid.isValid(password)) {
            return res.status(400).send({ status: false, msg: "wrong password" })
        }

        if (email && password) {
            const userPassword = await userModel.findOne({ email: email, password: password })

            if (userPassword) {
                const token = jwt.sign({ createUser: userPassword._id }, "secret")
                return res.status(200).send({ status: true, token: token })

            } else {
                return res.status(500).send({ status: false, msg: " invalid credential" })
            }
        }
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createUser, loginUser }