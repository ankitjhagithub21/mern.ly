const express = require('express');
const { createShortUrl } = require('../controllers/urlController');
const verifyToken = require('../middlewares/verifyToken');

const urlRouter = express.Router();

urlRouter.post('/shorten', verifyToken, createShortUrl);

module.exports = urlRouter;
