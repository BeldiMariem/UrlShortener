const ListUserUrls = require('../../../src/usecases/url/listUserUrls');
const MockUrlRepository = require('../../mocks/mockUrlRepository');

describe('ListUserUrls Use Case', () => {
  let mockUrlRepository;
  let listUserUrls;

  beforeEach(() => {
    mockUrlRepository = new MockUrlRepository();
    listUserUrls = new ListUserUrls(mockUrlRepository);
    jest.spyOn(mockUrlRepository, 'findByUserId');
  });

  test('should return URLs for a user', async () => {
    const userId = 'user123';
    await mockUrlRepository.create({ 
      shortId: 'abc123', 
      longUrl: 'https://example.com',
      title:'example',
      userId 
    });
    
    const result = await listUserUrls.execute(userId);
    expect(result).toHaveLength(1);
    expect(mockUrlRepository.findByUserId).toHaveBeenCalledWith(userId);
  });

  test('should return empty array for user with no URLs', async () => {
    const result = await listUserUrls.execute('nonexistent');
    expect(result).toEqual([]);
  });
});