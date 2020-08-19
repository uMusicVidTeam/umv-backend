const mongoose = require('../db/connection');

const VideoSchema = new mongoose.Schema(
	{
		artist: { type: String, required: true },
		title: { type: String, required: true },
		url: { type: String, required: true },
		score: { type: Number, default: 0 },
		genre: { type: String, required: true },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
