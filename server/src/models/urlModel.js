const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortUrl: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    longUrl: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    // Optional: track IPs or analytics
    // analytics: [{ ip: String, date: Date }],

    // Optional: owner reference if user-based
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required:true},
  },
  {
    timestamps: true, 
    versionKey:false// adds createdAt and updatedAt
  }
);

const Url = mongoose.model('Url',urlSchema);

module.exports = Url
