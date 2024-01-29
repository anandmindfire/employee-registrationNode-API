// routes/auth/authRoutes.js
import express from "express";
import { registerController } from "../../controllers/authController/authRegistration.js";
import { loginController } from "../../controllers/authController/authLogin.js";

import {
  getUsers,
  updateUser,
  deleteUser,
} from "../../controllers/authController/UserController.js";

// router object
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication operations
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User registration successful
 *         content:
 *           application/json:
 *             example: { message: 'Registration successful', user: { username: 'new_user' } }
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example: { error: 'Bad request' }
 */

// admin registration || METHOD POST
router.post("/register", registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Authenticate user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             example: { message: 'Login successful', token: 'your_token_here' }
 *       '401':
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             example: { error: 'Authentication failed' }
 */

// Admin Login route
router.post("/login", loginController);

router.get("/users", getUsers);

// PUT request to update user information
router.put("/users/:id", updateUser);

// DELETE request to delete a user
router.delete("/users/:id", deleteUser);

export default router;
