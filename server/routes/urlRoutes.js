const express = require('express');
const { createShortUrl, getLongUrl } = require('../controllers/urlController');
const verifyToken = require('../middlewares/verifyToken');

const urlRouter = express.Router();

urlRouter.post('/shorten', verifyToken, createShortUrl);
urlRouter.get('/:shortId',  getLongUrl);

module.exports = urlRouter;
