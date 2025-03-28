const express = require('express');
const request = require('supertest');
const { ValidationError } = require('../../../src/usecases/errors');
const urlController = require('../../../src/interface/controllers/urlController');

// Mock the use cases
jest.mock('../../../src/usecases/url/createShortenedUrl');
jest.mock('../../../src/usecases/url/redirectToOriginalUrl');
jest.mock('../../../src/usecases/url/listUserUrls');
jest.mock('../../../src/usecases/url/deleteUrl');

const CreateShortenedUrl = require('../../../src/usecases/url/createShortenedUrl');
const RedirectToOriginalUrl = require('../../../src/usecases/url/redirectToOriginalUrl');
const ListUserUrls = require('../../../src/usecases/url/listUserUrls');
const DeleteUrl = require('../../../src/usecases/url/deleteUrl');

describe('URL Controller', () => {
  let app;
  let mockCreateShortenedUrl;
  let mockRedirectToOriginalUrl;
  let mockListUserUrls;
  let mockDeleteUrl;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    
    mockCreateShortenedUrl = new CreateShortenedUrl();
    mockRedirectToOriginalUrl = new RedirectToOriginalUrl();
    mockListUserUrls = new ListUserUrls();
    mockDeleteUrl = new DeleteUrl();
    
    const router = express.Router();
    router.post('/createUrl', 
      (req, res, next) => {
        req.user = { id: 'test-user-id' };
        next();
      },
      urlController.createShortenedUrlHandler(mockCreateShortenedUrl)
    );
    
    router.get('/redirectOriginalUrl/:shortId', 
      urlController.redirectToOriginalUrlHandler(mockRedirectToOriginalUrl)
    );
    
    router.get('/listUrls', 
      (req, res, next) => {
        req.user = { id: 'test-user-id' };
        next();
      },
      urlController.listUserUrlsHandler(mockListUserUrls)
    );
    
    router.delete('/deleteUrl/:shortId', 
      (req, res, next) => {
        req.user = { id: 'test-user-id' };
        next();
      },
      urlController.deleteUrlHandler(mockDeleteUrl)
    );
    
    app.use('/url', router);
    
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  describe('POST /url/createUrl', () => {
    it('should create a shortened URL successfully', async () => {
      mockCreateShortenedUrl.execute.mockResolvedValue({
        shortUrl: 'http://localhost/abc123'
      });

      const response = await request(app)
        .post('/url/createUrl')
        .send({ longUrl: 'https://example.com' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        shortUrl: 'http://localhost/abc123'
      });
    });

    it('should return 400 for invalid URL', async () => {
      mockCreateShortenedUrl.execute.mockRejectedValue(
        new ValidationError('Invalid URL')
      );

      const response = await request(app)
        .post('/url/createUrl')
        .send({ longUrl: 'invalid-url' });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /url/redirectOriginalUrl/:shortId', () => {
    it('should redirect to original URL', async () => {
      mockRedirectToOriginalUrl.execute.mockResolvedValue(
        'https://original.com'
      );

      const response = await request(app)
        .get('/url/redirectOriginalUrl/abc123')
        .redirects(0);

      expect(response.status).toBe(302);
      expect(response.header.location).toBe('https://original.com');
    });

    
  });

  describe('DELETE /url/deleteUrl/:shortId', () => {
    it('should delete URL successfully', async () => {
      mockDeleteUrl.execute.mockResolvedValue(true);

      const response = await request(app)
        .delete('/url/deleteUrl/abc123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Url deleted successfully'
      });
    });

   
  });
});