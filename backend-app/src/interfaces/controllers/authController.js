// src/interfaces/controllers/authController.js
const RegisterUser = require("../../usecases/user/registerUser");
const UserRepository = require("../repositories/userRepository");
const LoginUser = require("../../usecases/user/loginUser");

const userRepository = new UserRepository();
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository); 

/**
 * @swagger
 * /auth/register:
 *   post:
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
exports.register = async (req, res) => {
    try {
      const user = await registerUser.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  /**
   * @swagger
   * /auth/login:
   *   post:
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
  exports.login = async (req, res) => {
    try {
      const { token, user } = await loginUser.execute(req.body);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };