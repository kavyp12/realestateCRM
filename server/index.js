const express = require('express');
const db = require('./db/config');
const route = require('./controllers/route');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 5001;

// Load environment variables from .env file
require('dotenv').config();

const fs = require('fs');
const path = require('path');

// Setup Express App
const app = express();
// Middleware
app.use(bodyParser.json());
// Set up CORS
app.use(cors());
// API Routes
app.use('/api', route);

app.get('/', async (req, res) => {
    res.send('Welcome to my world...');
});

// Get port from environment and store in Express.
const server = app.listen(port, () => {
    const protocol = (process.env.HTTPS === true || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    const { address, port } = server.address();
    const host = address === '::' ? '127.0.0.1' : address;
    console.log(`Server listening at ${protocol}://${host}:${port}/`);
});

// Connect to MongoDB Atlas
const DATABASE_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017'; // Fallback to local MongoDB if MONGODB_URL is not set
const DATABASE = 'career-guide'; // Database name from the Atlas connection string

db(DATABASE_URL, DATABASE);