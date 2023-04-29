const express = require('express');
const router = express.Router();

const Url = require('../models/url.js');

router.get('/:urlCode', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.urlCode });

        if (!url)
            return res.status(404).json("No url found");

        url.clicks++;
        await url.save();

        return res.redirect(url.longUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error: " + err.message);
    }
});

module.exports = router;
