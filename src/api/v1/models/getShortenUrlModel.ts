import { getCollection } from '@/utils/database';
import { UrlSchema } from '@/api/v1/interfaces';
import NodeCache from 'node-cache';

const db = getCollection();
const cache = new NodeCache({ stdTTL: 86400 }); // 1 day TTL in seconds

const getLongUrl = async (shortCode: string): Promise<UrlSchema | null>  => {
  const cachedUrl = await cache.get<UrlSchema>(shortCode);

  if (cachedUrl) return cachedUrl;
  
  const responseUrl = db.findOneAndUpdate(
    { shortCode },
    { $currentDate: { lastSeenAt: true }
  });

  if (responseUrl) cache.set(shortCode, responseUrl);

  return responseUrl;
}

const getShortUrlCode = async (longUrl: string): Promise<UrlSchema | null> => {
  const cachedShortCode = cache.get<UrlSchema>(longUrl);

  if (cachedShortCode) {
    return cachedShortCode;
  }

  const responseShortCode = db.findOneAndUpdate(
    { longUrl },
    { 
      $currentDate: { lastSeen: true }
    }
  );

  if (responseShortCode) cache.set(longUrl, responseShortCode);

  return responseShortCode;
}

export {
  getLongUrl,
  getShortUrlCode
};