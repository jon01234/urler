const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    longUrl: String, 
    shortUrl: String,
    urlCode: String,
    clicks: Number,
    date: { type: String, default: Date.now() },
})

module.exports = mongoose.model('url', UrlSchema);
