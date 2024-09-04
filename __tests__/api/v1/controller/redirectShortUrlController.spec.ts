import { redirectShortUrlController } from '@/api/v1/controller';
import { getLongUrl } from '@/api/v1/models';

jest.mock('@/api/v1/models', () => ({
  getLongUrl: jest.fn(),
  getShortUrlCode: jest.fn(),
}));

jest.mock('@/config', () => ({
  baseUrl: 'http://api.example.com',
}));

describe('Redirect Short URL Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to the long URL when valid short code is provided', async () => {
    const longUrl = 'https://www.example.com';
    const shortCode = 'a1b2c3';

    (getLongUrl as jest.Mock).mockResolvedValue({ longUrl });

    const response = await redirectShortUrlController(shortCode);

    expect(getLongUrl).toHaveBeenCalledWith('a1b2c3');
    expect(response).toEqual({ status: 200, url: 'https://www.example.com' });
  });

  it('should return error when the short code is not found', async () => {
    const shortCode = 'invalid-url';

    (getLongUrl as jest.Mock).mockResolvedValue(null);

    const response = await redirectShortUrlController(shortCode);

    expect(getLongUrl).toHaveBeenCalledWith(shortCode);
    expect(response).toEqual({ status: 404, error: 'URL not found' });
  });

  it('should return error when an internal server error occurs', async () => {
    const shortCode = 'a1b2c3';

    (getLongUrl as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await redirectShortUrlController(shortCode);

    expect(getLongUrl).toHaveBeenCalledWith(shortCode);
    expect(response).toEqual({status: 500, error: 'Internal server error' });
  });
});