'use strict';

// Prepare the express app
const express = require('express');
const app = express();

// Internal Resources
const errorHandler = require('./err-handlers/500.js');
const notFound = require('./err-handlers/404.js');
const authRoutes = require('./auth/routes/auth.js');
const appRoutes = require('./auth/routes/routes.js');

// To read from the body
app.use(express.json());

// Routes
app.use(authRoutes);
app.use('/api',appRoutes);

// Error Handlers
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};