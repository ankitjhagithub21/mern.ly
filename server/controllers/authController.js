const User = require('../models/userModel')
const validator = require('validator')
const generateToken = require("../utils/generateToken")
const bcryptjs = require('bcryptjs')

const register = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required.", success: false })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email address.", success: false })
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "Please login.", success: false })
        }


        if (password.trim().length <6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters long.", success: false })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        user = new User({
            email,
            password: hashedPassword
        })

        const savedUser = await user.save();

        const token = generateToken(savedUser._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        })


        res.status(201).json({
            message: "Account created successfully.", data: {
                email: savedUser.email
            }
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error.", success: false })
    }
}



module.exports = {
    register
}