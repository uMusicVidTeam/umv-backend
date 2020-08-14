const Video = require('../models/Video');
const videos = require('./videos.json');

Video.remove({})
	.then(() => {
		return Video.collection.insert(videos);
	})
	.then(() => {
		process.exit();
	});
