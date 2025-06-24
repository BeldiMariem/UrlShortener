const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");

const { authorize } = require("../middleware/authorizeMiddleware");

const {
    createShortenedUrlHandler,
    redirectToOriginalUrlHandler,
    listUserUrlsHandler,
    deleteUrlHandler
  } = require("../controllers/urlController");
  
  
  const CreateShortenedUrl = require("../../usecases/url/createShortenedUrl");
  const ListUserUrls = require("../../usecases/url/listUserUrls");
  const RedirectToOriginalUrl = require("../../usecases/url/redirectToOriginalUrl");
  const DeleteUrl = require("../../usecases/url/deleteUrl");

  const UrlRepository = require("../../infrastructure/repositories/urlRepository");
  const urlRepository = new UrlRepository();
  
  const createShortenedUrl = new CreateShortenedUrl(urlRepository);
  const listUserUrls = new ListUserUrls(urlRepository);
  const redirectToOriginalUrl = new RedirectToOriginalUrl(urlRepository);
  const deleteUrl = new DeleteUrl(urlRepository)

/**
 * @swagger
 * /url/createUrl:
 *   post:
 *     tags: [URL]
 *     summary: Create a shortened URL
 *     description: Create a shortened URL for a given long URL. Requires authentication.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longUrl:
 *                 type: string
 *                 example: https://www.example.com/very-long-url
 *               title:
 *                 type: string
 *                 example: example
 *     responses:
 *       200:
 *         description: Shortened URL created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 *                   description: The shortened URL.
 *                   example: 'http://localhost:5000/abc123'
 *       400:
 *         description: Invalid URL.
 *       500:
 *         description: Internal server error.
 */
router.post("/createUrl", authenticate, createShortenedUrlHandler(createShortenedUrl));


/**
 * @swagger
 * /url/listUrls:
 *   get:
 *     tags: [URL]
 *     summary: List all URLs for the authenticated user
 *     description: Retrieves a list of all shortened URLs created by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's shortened URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   shortId:
 *                     type: string
 *                     example: abc123
 *                   longUrl:
 *                     type: string
 *                     example: https://www.example.com/very-long-url
 *                   userId:
 *                     type: string
 *                     example: 64f1b1b1b1b1b1b1b1b1b1b1
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.get("/listUrls", authenticate, listUserUrlsHandler(listUserUrls));

/**
 * @swagger
 * /url/deleteUrl/{shortId}:
 *   delete:
 *     tags: [URL]
 *     summary: Delete an url by short ID
 *     description: Delete an url by short ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *         description: The url's short ID
 *     responses:
 *       200:
 *         description: Url deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Url deleted successfully
 *       404:
 *         description: Url not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Url not found
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
router.delete("/deleteUrl/:shortId", authenticate,  deleteUrlHandler(deleteUrl));
/**
 * @swagger
 * /url/{shortId}:
 *   get:
 *     tags: [URL]
 *     summary: Redirect to the original URL
 *     description: Redirects to the original URL associated with the provided short ID.
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *         example: abc123
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: Short URL not found
 */
router.get("/:shortId", redirectToOriginalUrlHandler(redirectToOriginalUrl));
module.exports = router;