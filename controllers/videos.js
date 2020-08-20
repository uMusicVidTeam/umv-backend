const express = require('express');
const router = express.Router();

const Video = require('../models/Video');

router.get('/', (req, res) => {
	Video.find({}).then((videos) => res.json(videos));
});

router.get('/:id', (req, res) => {
	Video.findById(req.params.id).then((videos) => res.json(videos));
});

router.post('/', (req, res) => {
	let newVideo = req.body;
	Video.create(newVideo).then(() => {
		Video.find({}).then((allVideos) => {
			res.json(allVideos);
		});
	});
});

// update
router.put('/:id', (req, res) => {
	const video = req.body;
	Video.findByIdAndUpdate(req.params.id, video, { new: true }).then(() => {
		Video.find({}).then((allVideos) => {
			res.json(allVideos);
		});
	});
});

// delete
router.delete('/:id', (req, res) => {
	Video.findByIdAndDelete(req.params.id).then(() => {
		Video.find({}).then((allVideos) => {
			res.json(allVideos);
		});
	});
});

module.exports = router;
