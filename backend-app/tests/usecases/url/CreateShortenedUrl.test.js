// tests/usecases/url/CreateShortenedUrl.test.js
const CreateShortenedUrl = require('../../../src/usecases/url/createShortenedUrl');
const MockUrlRepository = require('../../mocks/mockUrlRepository');
const { ValidationError } = require('../../../src/usecases/errors');

describe('CreateShortenedUrl Use Case', () => {
  let mockUrlRepository;
  let createShortenedUrl;

  beforeEach(() => {
    // Create a proper instance that implements IUrlRepository
    mockUrlRepository = new MockUrlRepository();
    createShortenedUrl = new CreateShortenedUrl(mockUrlRepository);
    jest.spyOn(mockUrlRepository, 'create');
  });

  test('should create and return a shortened URL', async () => {
    const longUrl = 'https://example.com';
    const userId = 'user123';
    
    const result = await createShortenedUrl.execute(longUrl, userId);
    
    expect(mockUrlRepository.create).toHaveBeenCalled();
    expect(result.shortUrl).toMatch(/http:\/\/.+\/url\/redirectOriginalUrl\/.+/);
  });

  test('should throw ValidationError for invalid URL', async () => {
    await expect(createShortenedUrl.execute('invalid-url', 'user123'))
      .rejects.toThrow(ValidationError);
  });

  test('should throw when repository is not IUrlRepository', () => {
    // Test with a plain object that doesn't implement the interface
    expect(() => new CreateShortenedUrl({})).toThrow('Invalid url repository');
  });
});