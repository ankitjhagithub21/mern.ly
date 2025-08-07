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
            },
            success:true
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error.", success: false })
    }
}


const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required.", success: false })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email address.", success: false })
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false })
        }

        const isValidPassword = await bcryptjs.compare(password,user.password);

         if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid credentials.", success: false })
        }

        const token = generateToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        })


        res.status(200).json({
            message: "Usere logged in successfully.", data: {
                email: user.email
            },
            success:true
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error.", success: false })
    }
}



const logout = async(req,res) => {
    return res.clearCookie('jwt',{
        maxAge:0
    }).status(200).json({message:"Logout successfully.", success:true})
}

const getUser = async(req,res) => {
    try{
        const user = await User.findById(req.userId).select("-password");

        if(!user){
            return res.status(400).json({message:"User not found.",success:false})
        }
        return res.status(200).json({message:"User found.", success:true, data:user})
    }catch(error){
        return res.status(500).json({message:"Server error.", success:false})
    }
}



module.exports = {
    register,
    login,
    logout,
    getUser
}