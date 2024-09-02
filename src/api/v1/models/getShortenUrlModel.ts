import { getCollection } from '@/utils/database';
import { UrlSchema } from '@/api/v1/interfaces';

const db = getCollection();

const getLongUrl = async (shortCode: string): Promise<UrlSchema | null>  => {
  return db.findOneAndUpdate(
    { shortCode },
    { 
      $currentDate: { lastSeenAt: true }
    }
  );
}

const getShortUrlCode = async (longUrl: string): Promise<UrlSchema | null> => {
  return db.findOneAndUpdate(
    { longUrl },
    { 
      $currentDate: { lastSeen: true }
    }
  );
}

export {
  getLongUrl,
  getShortUrlCode
};