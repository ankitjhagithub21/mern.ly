require('dotenv').config()
const express = require('express');
const connectDB = require('./db/conn');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const urlRouter = require('./routes/urlRoutes');
const app = express()


connectDB();

app.use(express.json());
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))
app.use(cookieParser())


app.get("/",(req,res) => {
  res.json({"message":"Api working."})
})

app.use("/api/auth",authRouter)
app.use("/api/url",urlRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})