// src/controllers/userController.js

const userService = require('../services/userService');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function register(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        age: Joi.number().integer().min(5).max(100).required(),
        grade_level: Joi.number().integer().min(1).max(12).required(),
        preferred_language: Joi.string().max(5),
    });

    try {
        await schema.validateAsync(req.body);

        const userData = req.body;
        const user = await userService.registerUser(userData);
        res.status(201).json({
            user_id: user.user_id,
            email: user.email,
            registration_date: user.registration_date,
        });
    } catch (error) {
        next(error);
    }
}

async function getProfile(req, res, next) {
    try {
        const user_id = req.params.user_id;

        // Fetch user profile from the service
        const user = await userService.getUserById(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user profile
        res.json({
            user_id: user.user_id,
            email: user.email,
            age: user.age,
            grade_level: user.grade_level,
            preferred_language: user.preferred_language,
        });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    try {
        await schema.validateAsync(req.body);

        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { user_id: user.user_id, email: user.email },  // Payload
            process.env.JWT_SECRET,                       // Secret key
            { expiresIn: '1h' }                           // Token expiration
        );

        // Return the token along with user details
        res.json({
            token,  // The JWT token
            user: {
                user_id: user.user_id,
                email: user.email,
                age: user.age,
                grade_level: user.grade_level,
                preferred_language: user.preferred_language,
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    getProfile,
    login,
};
