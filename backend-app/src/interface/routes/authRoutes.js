const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/authorizeMiddleware");
const { updateUserHandler } = require("../controllers/userController");
const UpdateUser = require("../../usecases/user/updateUser");
const UserRepository = require("../../infrastructure/repositories/userRepository");
const userRepository = new UserRepository();
const updateUser = new UpdateUser(userRepository);
/**
 * @swagger
 * /auth/profile/{id}:
 *   put:
 *     tags: [Auth]
 *     summary: Update current user's profile
 *     description: Allows an authenticated user to update their name, email, or password.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: Mariem Beldi
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: mariem@example.com
 *               password:
 *                 type: string
 *                 description: The new password (optional)
 *                 example: newSecurePassword123
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access denied
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.put("/profile/:id", authenticate, updateUserHandler(updateUser));
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