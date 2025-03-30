const request = require('supertest');
const app = require('../../../src/infrastructure/server/app');

jest.mock('../../../src/interface/middleware/authMiddleware', () => ({
    authenticate: jest.fn()
      .mockImplementationOnce((req, res, next) => {
        req.user = { id: 'test-user-id' };
        next();
      })
      .mockImplementationOnce((req, res, next) => {
        res.status(401).json({ error: 'Unauthorized' });
      })
  }));

describe('GET /search/app', () => {
  it('should return URL when authenticated', async () => {
    jest.spyOn(require('../../../src/infrastructure/repositories/googleAppSearchRepository').prototype, 'search')
      .mockResolvedValue('https://facebook.com');

    const response = await request(app)
      .get('/search/app?name=facebook')
      .set('Authorization', 'Bearer valid-token');
    
    expect(response.status).toBe(200);
    expect(response.body.url).toBe('https://facebook.com');
  });

  it('should return 401 when not authenticated', async () => {
    const response = await request(app)
      .get('/search/app?name=facebook');
    
    expect(response.status).toBe(401);
  });
});