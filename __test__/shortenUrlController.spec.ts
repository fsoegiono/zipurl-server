import { shortenUrlController } from '@/api/v1/controller';
import { getShortUrlCode, insertShortenUrl } from '@/api/v1/models';

jest.mock('@/api/v1/models', () => ({
  getShortUrlCode: jest.fn(),
  insertShortenUrl: jest.fn(),
}));

jest.mock('@/config', () => ({
  baseUrl: 'http://api.example.com',
}));

describe('Shorten URL Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create new short URL', async () => {
    const longUrl = 'https://www.example.com';
    const shortCode = 'a1b2c3';

    (getShortUrlCode as jest.Mock).mockResolvedValue(null);
    (insertShortenUrl as jest.Mock).mockResolvedValue({ shortCode });

    const response = await shortenUrlController(longUrl);

    expect(getShortUrlCode).toHaveBeenCalledWith('https://www.example.com/');
    expect(insertShortenUrl).toHaveBeenCalledWith('https://www.example.com/', expect.any(String));
    expect(response).toEqual({ status: 200, shortUrl: 'http://api.example.com/a1b2c3' });
  });

  it('should return existing short URL if it already exists', async () => {
    const longUrl = 'https://www.example.com';
    const shortCode = 'a1b2c3';

    (getShortUrlCode as jest.Mock).mockResolvedValue({ shortCode });

    const response = await shortenUrlController(longUrl);

    expect(getShortUrlCode).toHaveBeenCalledWith('https://www.example.com/');
    expect(insertShortenUrl).not.toHaveBeenCalled();
    expect(response).toEqual({ status: 200, shortUrl: 'http://api.example.com/a1b2c3' });
  });

  it('should handle invalid URLs', async () => {
    const longUrl = 'invalid-url';

    const response = await shortenUrlController(longUrl);

    expect(getShortUrlCode).not.toHaveBeenCalled();
    expect(insertShortenUrl).not.toHaveBeenCalled();
    expect(response).toEqual({ status: 400, error: 'Invalid URL' });
  });

  it('should handle internal server errors', async () => {
    const longUrl = 'https://www.example.com';

    (getShortUrlCode as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await shortenUrlController(longUrl);

    expect(getShortUrlCode).toHaveBeenCalledWith('https://www.example.com/');
    expect(insertShortenUrl).not.toHaveBeenCalled();
    expect(response).toEqual({ status: 500, error: 'Internal server error' });
  });
});