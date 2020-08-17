const express = require('express');
const router = express.Router();

const Video = require('../models/Video');

router.get('/', (req, res) => {
	Video.find({}).then((videos) => res.json(videos));
});

router.get('/:title', (req, res) => {
	Video.find({
		title: { $regex: new RegExp(req.params.title, 'ig') },
	}).then((videos) => res.json(videos));
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
	const video = req.body
	Video.findByIdAndUpdate(req.params.id, video, {new: true})
	.then((video) => {
		res.json(video);
	})
});

// delete
router.delete('/:title', (req, res) => {
	Video.findOneAndDelete({
		title: { $regex: new RegExp(req.params.title, 'ig') },
	}).then(() => {
		Video.find({}).then((allVideos) => {
			res.json(allVideos);
		});
	});
});

module.exports = router;
