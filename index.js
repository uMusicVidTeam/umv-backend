const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const videoController = require('./controllers/videos');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
	res.redirect('/api/videos');
});

app.use('/api/videos', videoController);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
