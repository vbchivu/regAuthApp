// src/services/userService.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

async function registerUser(userData) {
    const { email, password, age, grade_level, preferred_language } = userData;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            logger.warn(`Attempt to register with existing email: ${email}`);
            throw new Error('User already exists');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            email,
            password_hash,
            age,
            grade_level,
            preferred_language,
        });

        logger.info(`User registered with email: ${email}`);
        return newUser;
    } catch (error) {
        logger.error(`Error in registerUser: ${error.message}`);
        throw error;
    }
}

async function getUserById(userId) {
    try {
        const user = await User.findOne({ where: { user_id: userId } });
        if (!user) {
            logger.warn(`User with ID ${userId} not found`);
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        logger.error(`Error in getUserById: ${error.message}`);
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            logger.warn(`User with email ${email} not found`);
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        logger.error(`Error in getUserByEmail: ${error.message}`);
        throw error;
    }
}

module.exports = {
    registerUser,
    getUserById,
    getUserByEmail,
};
