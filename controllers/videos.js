const express = require('express');
const router = express.Router();

const Video = require('../models/Video');

router.get('/', (req, res) => {
	Job.find()
		.then((videos) => res.json(videos))
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	Video.findById(req.params.id)
		.then((video) => {
			if (!video) {
				res.sendStatus(404);
			} else {
				res.json(video);
			}
		})
		.catch(next);
});

router.post('/', (req, res) => {
	Video.create(req.body)
		.then(() => {
			Video.find().then((allVideos) => {
				res.status(201).json(allVideos);
			});
		})
		.catch(next);
});

// update
router.put('/:id', (req, res) => {
	Video.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	})
		.then((video) => {
			if (!video) {
				res.sendStatus(404);
			} else {
				res.json(video);
			}
		})
		.catch(next);
});

// delete
router.delete('/:id', (req, res) => {
	Video.findOneAndDelete({
		_id: req.params.id,
	})
		.then((video) => {
			if (!video) {
				res.sendStatus(404);
			} else {
				res.sendStatus(204);
			}
		})
		.catch(next);
});

module.exports = router;
