import cuid from 'cuid'; // high collision resistance, shorter than uuid npm package.
import validUrl from 'valid-url';

import { baseUrl } from '@/config';
import urlDatabase from '@/utils/database';

const createShortenUrl = (longUrl: string) => {
  if (!validUrl.isUri(longUrl)) {
    return {
      status: 400,
      error: 'Invalid URL',
    }
  }

  const shortUrl = `${baseUrl}/`;
  const url = longUrl.slice(-1) !== '/' ? longUrl + '/' : longUrl;

  for (const [key, value] of urlDatabase.entries()) {
    if (value === url) return { status: 200, shortUrl: shortUrl + key };
  }

  const shortCode = cuid();
  urlDatabase.set(shortCode, url);

  return { status: 200, shortUrl: shortUrl + shortCode };
}

export default createShortenUrl;