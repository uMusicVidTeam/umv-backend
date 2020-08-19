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

// The last middleware receives any error as its first argument
app.use((err, req, res, next) => {
	// If the error contains a statusCode, set the variable to that code
	// if not, set it to a default 500 code
	const statusCode = err.statusCode || 500;
	// If the error contains a message, set the variable to that message
	// if not, set it to a generic 'Internal Server Error'
	const message = err.message || 'Internal Server Error';
	// Set the status and send the message as a response to the client
	res.status(statusCode).send(message);
});

const { handleErrors } = require('./middleware/custom_errors');
app.use(handleErrors);

// Define a port for API to run on, if the environment
// variable called `PORT` is not found use port 4000
const port = process.env.PORT || 4000;
// Run server on designated port
app.listen(port, () => {
	console.log('listening on port ' + port);
});
