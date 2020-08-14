const mongoose = require('../db/connection');

const VideoSchema = new mongoose.Schema({
    artist: {type: String, required: true},
    title: {type: String, required: true},
    url: {type: String, required: true},
    votes: {
        upvote: {type: Number, default: 0},
        downvote: {type: Number, default: 0}
    },
    genre: {type: String, required: true}
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;