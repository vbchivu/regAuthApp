// src/middleware/errorHandler.js

const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
    // Log the error stack
    logger.error(`Error: ${err.message}`, { stack: err.stack });

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message,
        // Include stack trace only in development
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}

module.exports = errorHandler;
