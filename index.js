'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

// Connect To MongoDB
mongoose.connect(process.env.MONGODB_URI,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });

// invoke start function to operate the server
require('./src/server.js').start(process.env.PORT);