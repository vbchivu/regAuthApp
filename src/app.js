// src/app.js

require('dotenv').config();
require('./config/mongo');
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const swaggerSetup = require('./swagger');
const logger = require('./utils/logger');
const sequelize = require('./config/mysql');

const app = express();

// Middleware
app.use(bodyParser.json());

// Swagger setup
swaggerSetup(app);

// Routes
app.use('/api/v1/users', userRoutes);

// Error handling middleware (for catching and logging errors)
app.use(errorHandler);

// Sync Sequelize models and create tables if they don't exist
sequelize.sync({ force: false }).then(() => {
  logger.info('MySQL models synchronized');
}).catch((err) => {
  logger.error('Error syncing MySQL models:', err);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
