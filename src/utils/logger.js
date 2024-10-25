// src/utils/logger.js
const { createLogger, format, transports } = require('winston');
const path = require('path');

// Create log directory if it doesn't exist
const logDirectory = path.join(__dirname, '../../logs');
const fs = require('fs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} ${level}: ${stack || message}`;
        })
    ),
    transports: [
        new transports.Console(), // This logs to the console
        new transports.File({
            filename: path.join(logDirectory, 'app.log'),
            handleExceptions: true,
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        }),
    ],
    exitOnError: false, // Do not exit on handled exceptions
});

module.exports = logger;
