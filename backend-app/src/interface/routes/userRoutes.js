// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  createUserHandler,
  getAllUsersHandler,
  getUserByEmailHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../controllers/userController");

const UserRepository = require("../../infrastructure/repositories/userRepository");
const CreateUser = require("../../usecases/user/createUser");
const DeleteUser = require("../../usecases/user/deleteUser");
const GetAllUsers = require("../../usecases/user/getAllUsers");
const GetUserByEmail = require("../../usecases/user/getUserByEmail");
const UpdateUser = require("../../usecases/user/updateUser");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/authorizeMiddleware");

const userRepository = new UserRepository();
const createUser = new CreateUser(userRepository);
const getAllUsers = new GetAllUsers(userRepository);
const getUserByEmail = new GetUserByEmail(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

/**
 * @swagger
 * /user/createUser:
 *   post:
 *     tags: [User]
 *     summary: Create a new user
 *     description: Register a new user with name, email, and password
 *     security:
 *       - BearerAuth: []
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
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID
 *                   example: 12345
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                   example: john@example.com
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input
 *       409:
 *         description: Email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email already in use
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
router.post("/createUser", authenticate, createUserHandler(createUser));

/**
 * @swagger
 * /user/getAllUsers:
 *   get:
 *     tags: [User]
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user's ID
 *                     example: 12345
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                     example: john@example.com
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
router.get("/getAllUsers", authenticate, authorize(["admin"]), getAllUsersHandler(getAllUsers));

/**
 * @swagger
 * /user/getUserByEmail/{email}:
 *   get:
 *     tags: [User]
 *     summary: Get a user by email
 *     description: Retrieve a user by their email
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's email
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID
 *                   example: 12345
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                   example: john@example.com
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
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
router.get("/getUserByEmail/:email", authenticate, authorize(["admin"]), getUserByEmailHandler(getUserByEmail));

/**
 * @swagger
 * /user/updateUser/{id}:
 *   put:
 *     tags: [User]
 *     summary: Update a user
 *     description: Update a user's information by ID
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
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID
 *                   example: 12345
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                   example: john@example.com
 *       400:
 *         description: Invalid input or email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
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
router.put("/updateUser/:id", authenticate, authorize(["admin"]), updateUserHandler(updateUser));

/**
 * @swagger
 * /user/deleteUser/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete a user
 *     description: Delete a user by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
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
router.delete("/deleteUser/:id", authenticate, authorize(["admin"]), deleteUserHandler(deleteUser));

module.exports = router;