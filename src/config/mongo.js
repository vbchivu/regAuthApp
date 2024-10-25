// src/config/mongodb.js

const mongoose = require('mongoose');
const { mongodb } = require('./dbConfig');

mongoose.connect(mongodb.uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;
