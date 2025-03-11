// src/interfaces/controllers/userController.js
const CreateUser = require("../../usecases/user/createUser");
const DeleteUser = require("../../usecases/user/deleteUser");
const GetAllUsers = require("../../usecases/user/getAllUsers");
const GetUserByEmail = require("../../usecases/user/getUserByEmail");
const UpdateUser = require("../../usecases/user/updateUser");
const UserRepository = require("../repositories/userRepository");

const userRepository = new UserRepository();
const createUser = new CreateUser(userRepository);
const getAllUsers = new GetAllUsers(userRepository);
const getUserByEmail = new GetUserByEmail(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /user/createUser:
 *   post:
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
 *                   example: Mariem Beldi
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                   example: mariem@example.com
 *       400:
 *         description: Invalid input
 */
const createUserHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUser.execute({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /user/getAllUsers:
 *   get:
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
 */
const getAllUsersHandler = async (req, res) => {
  try {
    const users = await getAllUsers.execute();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /user/getUserByEmail/{email}:
 *   get:
 *     summary: Get a user by Email
 *     description: Retrieve a user by their Email
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's Email
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
 */
const getUserByEmailHandler = async (req, res) => {
  try {
    // Decode the email parameter
    const decodedEmail = decodeURIComponent(req.params.email);
    const user = await getUserByEmail.execute(decodedEmail);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /user/updateUser/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user's information by ID.
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
 *                 example: Mariem Beldi
 *               email:
 *                 type: string
 *                 example: mariem@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *         description: Invalid input or email already in use
 *       404:
 *         description: User not found
 */
const updateUserHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    const updatedUser = await updateUser.execute(userId, userData);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ error: error.message });
    } else if (error.message === "Email already in use" || error.message === "Invalid input") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /user/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by ID.
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
 */
const deleteUserHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUser.execute(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


module.exports = {
  createUser: createUserHandler,
  getAllUsers: getAllUsersHandler,
  getUserByEmail: getUserByEmailHandler,
  deleteUser: deleteUserHandler,
  updateUser: updateUserHandler
};