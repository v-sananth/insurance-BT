// src/api/ApiService.test.js
import apiService from './ApiService';

global.fetch = jest.fn();

describe('ApiService', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should perform a GET request and return JSON data', async () => {
    const mockData = { message: 'Success' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiService.get('/test-endpoint');
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', expect.any(Object));
    expect(result).toEqual(mockData);
  });

  it('should perform a POST request and return JSON data', async () => {
    const mockResponse = { success: true };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.post('/submit', { name: 'Sasi' });
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/submit',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ name: 'Sasi' }),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error for non-OK response with JSON error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Not Found' }),
    });

    await expect(apiService.get('/fail')).rejects.toThrow('Not Found');
  });

  it('should throw an error for non-OK response with text error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => {
        throw new Error('Invalid JSON');
      },
      text: async () => 'Internal Server Error',
    });

    await expect(apiService.get('/error')).rejects.toThrow('Internal Server Error');
  });
});
