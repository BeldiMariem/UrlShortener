const SearchApp = require('../../../src/usecases/searchApp/searchApp');

describe('SearchApp', () => {
  let mockRepository;
  let useCase;

  beforeEach(() => {
    mockRepository = {
      search: jest.fn()
    };
    useCase = new SearchApp(mockRepository);
  });

  it('should call repository with lowercase app name', async () => {
    mockRepository.search.mockResolvedValue('https://test.com');
    await useCase.execute('TestApp');
    expect(mockRepository.search).toHaveBeenCalledWith('testapp');
  });

  it('should throw error for empty app name', async () => {
    await expect(useCase.execute('')).rejects.toThrow("App name cannot be empty");
  });
});