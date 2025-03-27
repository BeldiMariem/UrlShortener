const RedirectToOriginalUrl = require('../../../src/usecases/url/redirectToOriginalUrl');
const MockUrlRepository = require('../../mocks/mockUrlRepository');
const { ValidationError } = require('../../../src/usecases/errors');

describe('RedirectToOriginalUrl Use Case', () => {
  let mockUrlRepository;
  let redirectToOriginalUrl;

  beforeEach(() => {
    mockUrlRepository = new MockUrlRepository();
    redirectToOriginalUrl = new RedirectToOriginalUrl(mockUrlRepository);
    jest.spyOn(mockUrlRepository, 'findByShortId');
  });

  test('should return long URL for valid shortId', async () => {
    const mockUrl = { shortId: 'abc123', longUrl: 'https://example.com', userId: 'user123' };
    await mockUrlRepository.create(mockUrl);
    
    const result = await redirectToOriginalUrl.execute('abc123');
    expect(result).toBe('https://example.com');
  });

  test('should throw ValidationError for invalid shortId', async () => {
    await expect(redirectToOriginalUrl.execute(123))
      .rejects.toThrow(ValidationError);
  });

  test('should throw ValidationError for non-existent shortId', async () => {
    await expect(redirectToOriginalUrl.execute('nonexistent'))
      .rejects.toThrow(ValidationError);
  });
});