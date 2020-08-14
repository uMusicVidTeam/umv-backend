const express = require('express');
const cors = require('cors');
const videoController = require('./controllers/videos');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/videos', videoController)

app.listen(8080, () => console.log('PORT 8080 successful'));