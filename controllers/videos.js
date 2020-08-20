const express = require('express');
const router = express.Router();

const Video = require('../models/Video');

const {
	handleValidateId,
	handleRecordExists,
	handleValidateOwnership,
} = require('../middleware/custom_errors');

const { requireToken } = require('../middleware/auth');

router.get('/', (req, res, next) => {
	Video.find({})
		// .populate('owner', 'email -_id')
		.then((videos) => res.json(videos))
		.catch(next);
});

router.get('/:id', handleValidateId, (req, res, next) => {
	Video.findById(req.params.id)
		.populate('owner')
		.then(handleRecordExists)
		.then((video) => res.json(video))
		.catch(next);
});

router.post('/', requireToken, (req, res, next) => {
	Video.create({ ...req.body, owner: req.user._id })
		.then(() => {
			Video.find().then((allVideos) => {
				res.status(201).json(allVideos);
			});
		})
		.catch(next);
});

// update
router.put('/:id', handleValidateId, requireToken, (req, res, next) => {
	Video.findById(req.params.id)
		.then(handleRecordExists)
		.then((video) => handleValidateOwnership(req, video))
		.then((video) => video.set(req.body).save())
		.then((video) => {
			res.json(video);
		})
		.catch(next);
});

// DESTROY
// DELETE api/jobs/5a7db6c74d55bc51bdf39793
router.delete('/:id', handleValidateId, requireToken, (req, res, next) => {
	Video.findById(req.params.id)
		.then(handleRecordExists)
		.then((video) => handleValidateOwnership(req, video))
		.then((video) => video.remove())
		.then(() => {
			res.sendStatus(204);
		})
		.catch(next);
});

module.exports = router;
