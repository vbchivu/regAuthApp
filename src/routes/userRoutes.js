// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - age
 *         - grade_level
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         age:
 *           type: integer
 *           description: The user's age
 *         grade_level:
 *           type: integer
 *           description: The user's grade level
 *         preferred_language:
 *           type: string
 *           description: The user's preferred language
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: The ID of the created user
 *                 email:
 *                   type: string
 *                   description: The email of the created user
 *                 registration_date:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user registered
 *       400:
 *         description: Invalid input
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: The user's profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: The ID of the user
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 age:
 *                   type: integer
 *                   description: The user's age
 *                 grade_level:
 *                   type: integer
 *                   description: The user's grade level
 *       404:
 *         description: User not found
 */
router.get('/:user_id', authenticateToken, userController.getProfile);

router.post('/login', userController.login);

module.exports = router;
