const Url = require('../models/urlModel')
const getUserLinks = async (req, res) => {

  try {

    const links = await Url.find({ owner: req.userId })
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
    getUserLinks
}