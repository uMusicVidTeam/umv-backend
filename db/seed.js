const User = require('../models/User');
const Video = require('../models/Video');
const videoSeedData = require('./videos.json');

const getUser = async () => {
	try {
		if (!process.argv[2]) {
			throw new Error(
				'To seed the database provide an email address for an existing user'
			);
		}
		const user = await User.findOne({ email: process.argv[2] });
		if (!user) {
			throw new Error('No matching user found!');
		}
		return user;
	} catch (error) {
		console.error(error);
	}
};

Video.deleteMany()
	.then(getUser)
	.then((user) => {
		const seedDataWithOwner = videoSeedData.map((video) => {
			video.owner = user._id;
			return video;
		});
		return Video.insertMany(seedDataWithOwner);
	})
	.then(console.log)
	.then(console.error)
	.finally(() => {
		process.exit();
	});
