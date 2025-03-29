const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');

// Dependency setup
const SearchApp = require('../../usecases/searchApp/searchApp');
const GoogleAppSearchRepository = require('../../infrastructure/repositories/googleAppSearchRepository');
const SearchAppController = require('../controllers/searchAppController');

const repository = new GoogleAppSearchRepository();
const useCase = new SearchApp(repository);
const controller = new SearchAppController(useCase);

/**
 * @swagger
 * /search/app:
 *   get:
 *     tags: [Search]
 *     summary: Find official URL by app name
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: twitter
 *     responses:
 *       200:
 *         description: Official URL found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "https://twitter.com"
 *       400:
 *         description: Missing app name
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/app', authenticate, (req, res) => controller.handle(req, res));

module.exports = router;