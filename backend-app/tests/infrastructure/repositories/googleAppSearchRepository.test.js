const axios = require('axios');
const GoogleAppSearchRepository = require('../../../src/infrastructure/repositories/googleAppSearchRepository');
const MockAdapter = require('axios-mock-adapter');

describe('GoogleAppSearchRepository', () => {
  let mockAxios;
  let repository;

  beforeAll(() => {
    mockAxios = new MockAdapter(axios);
    repository = new GoogleAppSearchRepository();
  });

  it('should return URL for valid app name', async () => {
    const mockResponse = {
      items: [{ link: 'https://facebook.com' }]
    };
    mockAxios.onGet().reply(200, mockResponse);

    const url = await repository.search('facebook');
    expect(url).toBe('https://facebook.com');
  });

  it('should return null when no results found', async () => {
    mockAxios.onGet().reply(200, { items: [] });
    const url = await repository.search('nonexistent');
    expect(url).toBeNull();
  });

  afterEach(() => {
    mockAxios.reset();
  });
});