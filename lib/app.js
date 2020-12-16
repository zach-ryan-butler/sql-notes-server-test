const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/api/v1/notes', require('./routes/notes'));

module.exports = app;
