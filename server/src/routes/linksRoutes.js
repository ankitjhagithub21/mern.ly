const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { getUserLinks } = require('../controllers/linkController');

const linkRouter = express.Router();

linkRouter.get("/",verifyToken,getUserLinks)

module.exports = linkRouter;
