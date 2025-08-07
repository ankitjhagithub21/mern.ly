require('dotenv').config()
const express = require('express');
const connectDB = require('./db/conn');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const app = express()


connectDB();

app.use(express.json());
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))
app.use(cookieParser())


app.use("/api/auth",authRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})