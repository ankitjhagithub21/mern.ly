const express = require('express')
const { register, login,logout,getUser } = require('../controllers/authController')
const verifyToken = require('../middlewares/verifyToken')

const authRouter = express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.get("/user",verifyToken,getUser)

module.exports = authRouter