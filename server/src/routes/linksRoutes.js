const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { getUserLinks, delteUserLink } = require('../controllers/linkController');

const linkRouter = express.Router();

linkRouter.get("/",verifyToken,getUserLinks)
linkRouter.delete("/:shortId",verifyToken,delteUserLink)

module.exports = linkRouter;
