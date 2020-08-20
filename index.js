const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

const videoController = require('./controllers/videos');
app.use('/api/videos', videoController);

const userController = require('./controllers/users');
app.use('/api', userController);

app.get('/', (req, res) => {
	res.redirect('/api/videos');
});

const {
	handleErrors,
	handleValidationErrors,
} = require('./middleware/custom_errors');

app.use(handleValidationErrors);
app.use(handleErrors);

// Define a port for API to run on, if the environment
// variable called `PORT` is not found use port 4000
const port = process.env.PORT || 8080;
// Run server on designated port
app.listen(port, () => {
	console.log('listening on port ' + port);
});
