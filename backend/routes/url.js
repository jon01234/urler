const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/url.js');

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = process.env.baseURL;

    if (!validUrl.isUri(baseUrl)) 
        return res.status(401).json('Invalid base URL: ' + baseUrl);

    if (!validUrl.isUri(longUrl))
        return res.status(401).json('Invalid long URL: ' + longUrl);

    const urlCode = shortid.generate();

    try {
        let url = await Url.findOne({ longUrl });
        
        if (url)
            res.json(url);
        else {
            const shortUrl = `${baseUrl}/${urlCode}`;

            url = new Url({
                longUrl,
                shortUrl,
                urlCode,
                clicks: 0,
                date: new Date()
            });

            await url.save();

            res.json(url);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error");
    }
})

module.exports = router;
