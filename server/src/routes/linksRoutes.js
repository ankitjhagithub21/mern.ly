const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { getUserLinks, delteUserLink } = require('../controllers/linkController');

const linkRouter = express.Router();

linkRouter.get("/",verifyToken,getUserLinks)
linkRouter.delete("/:linkId",verifyToken,delteUserLink)

module.exports = linkRouter;
