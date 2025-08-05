require('dotenv').config()
const express = require('express');
const connectDB = require('./db/conn');
const app = express()

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})