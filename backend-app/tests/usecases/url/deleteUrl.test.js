const DeleteUrl = require('../../../src/usecases/url/deleteUrl');
const MockUrlRepository = require('../../mocks/mockUrlRepository');
const { ValidationError, NotFoundError } = require('../../../src/usecases/errors');

describe('DeleteUrl Use Case', () => {
  let mockUrlRepository;
  let deleteUrl;

  beforeEach(() => {
    mockUrlRepository = new MockUrlRepository();
    deleteUrl = new DeleteUrl(mockUrlRepository);
    jest.spyOn(mockUrlRepository, 'deleteByShortId');
  });

  test('should delete existing URL', async () => {
    const mockUrl = { shortId: 'abc123', longUrl: 'https://example.com', userId: 'user123' };
    await mockUrlRepository.create(mockUrl);
    
    await expect(deleteUrl.execute('abc123')).resolves.not.toThrow();
    expect(mockUrlRepository.deleteByShortId).toHaveBeenCalledWith('abc123');
  });

  test('should throw NotFoundError for non-existent URL', async () => {
    await expect(deleteUrl.execute('nonexistent'))
      .rejects.toThrow(NotFoundError);
  });

  test('should throw ValidationError for missing shortId', async () => {
    await expect(deleteUrl.execute()).rejects.toThrow(ValidationError);
  });
});