import cuid from 'cuid'; // high collision resistance, shorter than uuid npm package.
import validUrl from 'valid-url';

import { baseUrl } from '@/config';
import { getShortUrlCode, insertShortenUrl } from '@/api/v1/models';

const createShortenUrl = async (longUrl: string) => {
  try {
    if (!validUrl.isUri(longUrl)) {
      return {
        status: 400,
        error: 'Invalid URL',
      }
    }

    const shortUrl = `${baseUrl}/`;
    const url = longUrl.slice(-1) !== '/' ? longUrl + '/' : longUrl;

    const findByShortUrlCode = await getShortUrlCode(url);
    if (findByShortUrlCode) return { status: 200, shortUrl: shortUrl + findByShortUrlCode.short_code };

    const shortCode = cuid();
    const newUrl = await insertShortenUrl(url, shortCode);

    return { status: 200, shortUrl: shortUrl + newUrl.short_code };
  } catch (error) {
    console.error(error);
    return {status: 500, error: 'Internal server error' };
  }
}

export default createShortenUrl;