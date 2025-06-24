const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/authorizeMiddleware");


/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Create a new user with name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mariem Beldi
 *               email:
 *                 type: string
 *                 example: mariem@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 64f1b1b1b1b1b1b1b1b1b1b1
 *                 name:
 *                   type: string
 *                   example: Mariem Beldi
 *                 email:
 *                   type: string
 *                   example: mariem@example.com
 *                 role:
 *                   type: string
 *                   example: user
 *       400:
 *         description: Invalid input or user already exists
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login a user
 *     description: Authenticate a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: mariem@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64f1b1b1b1b1b1b1b1b1b1b1
 *                     name:
 *                       type: string
 *                       example: Mariem Beldi
 *                     email:
 *                       type: string
 *                       example: mariem@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout a user
 *     description: Blacklists the JWT token to log out the user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post("/logout", authenticate, logout);


module.exports = router;