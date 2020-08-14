const express = require('express');
const router = express.Router();

const Video = require('../models/Video');

router.get('/', (req, res) => {
	Video.find({}).then((videos) => res.json(videos));
});

module.exports = router;
