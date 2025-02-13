// src/interfaces/controllers/userController.js
const express = require("express");
const router = express.Router();
const CreateUser = require("../../usecases/user/createUser");
const UserRepository = require("../repositories/userRepository");

const userRepository = new UserRepository();
const createUser = new CreateUser(userRepository);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Register a new user with name, email, and password
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
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUser.execute({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;