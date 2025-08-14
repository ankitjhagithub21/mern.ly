const Url = require('../models/urlModel');
const { nanoid } = require('nanoid');
const validUrl = require('valid-url');

// Optional: define your app's base URL (used for full short links)
const BASE_URL = process.env.ORIGIN || 'http://localhost:3000';

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


const getLongUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    // Find the original URL from the database
    const urlDoc = await Url.findOne({ shortUrl:shortId });



    if (!urlDoc) {
      return res.status(404).json({ message: "Short URL not found",success:false });
    }

    urlDoc.clicks = urlDoc.clicks+1;
    await urlDoc.save();
    // Redirect to the original URL
    return res.status(200).json({success:true, data:urlDoc});

    // return res.redirect(urlDoc.longUrl)

  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).json({ message: "Server error",success:false });
  }
};


const getUserLinks = async (req, res) => {
  try {

    const links = await Url.find({ owner: userId })
      .sort({ createdAt: -1 }) 

    return res.status(200).json({
      success: true,
      message: "User links fetched successfully",
      data:links,
    });
  } catch (err) {
    console.error("Get user links error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {
    createShortUrl,
    getLongUrl,
    getUserLinks
};
