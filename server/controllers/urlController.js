const Url = require('../models/urlModel');
const { nanoid } = require('nanoid');
const validUrl = require('valid-url');

// Optional: define your app's base URL (used for full short links)
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// POST /api/url/shorten
const createShortUrl = async (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) {
        return res.status(400).json({ message: 'Long Url is required.', success:false });
    }

    const normalizedUrl = longUrl.trim().startsWith('http')
        ? longUrl.trim()
        : `https://${longUrl.trim()}`;

    if (!validUrl.isUri(normalizedUrl)) {
        return res.status(400).json({ message: 'Invalid URL format', success:false });
    }

    try {
        // Optional: check if user already created the same link
        const existing = await Url.findOne({ longUrl: normalizedUrl, owner: req.userId });

        if (existing) {
            return res.json({
                success: true, 
                message:"Short URL created successfully.",
                data: {
                    shortUrl: `${BASE_URL}/${existing.shortUrl}`,
                    _id: existing._id,
                }
            });
        }

        // Generate unique short slug
        const shortSlug = nanoid(6);

        const newUrl = await Url.create({
            shortUrl: shortSlug,
            longUrl: normalizedUrl,
            owner:req.userId,
        });

        return res.status(201).json({
            message: 'Short URL created successfully',
            success: true,
            data: {
                shortUrl: `${BASE_URL}/${newUrl.shortUrl}`,
                _id: newUrl._id,
            }
        });
    } catch (error) {
        console.error('Short URL creation error:', error);
        return res.status(500).json({ message: 'Server error', success: false });
    }
};

module.exports = {
    createShortUrl,
};
