const express = require('express');
const router = express.Router();

const Video = require('../models/Video');

const {
	handleValidateId,
	handleRecordExists,
} = require('../middleware/custom_errors');

router.get('/', (req, res, next) => {
	Job.find()
		.then((videos) => res.json(videos))
		.catch(next);
});

router.get('/:id', handleValidateId, (req, res, next) => {
	Video.findById(req.params.id)
		.then(handleRecordExists)
		.then((video) => res.json(video))
		.catch(next);
});

router.post('/', (req, res, next) => {
	Video.create(req.body)
		.then(() => {
			Video.find().then((allVideos) => {
				res.status(201).json(allVideos);
			});
		})
		.catch(next);
});

// update
router.put('/:id', handleValidateId, (req, res, next) => {
	Video.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	})
		.then(handleRecordExists)
		.then((video) => {
			res.json(video);
		})
		.catch(next);
});

// delete
router.delete('/:id', handleValidateId, (req, res, next) => {
	Video.findOneAndDelete({
		_id: req.params.id,
	})
		.then(handleRecordExists)
		.then((video) => video.remove())
		.then(() => {
			res.sendStatus(204);
		})
		.catch(next);
});

module.exports = router;
