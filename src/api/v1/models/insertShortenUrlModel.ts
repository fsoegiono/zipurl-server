import { getCollection } from '@/utils/database';
import { UrlSchema } from '@/api/v1/interfaces';

const db = getCollection();

const insertShortenUrl = async (longUrl: string, shortCode: string): Promise<UrlSchema> => {
  const newUrl: UrlSchema = {
    longUrl,
    shortCode,
    createdAt: new Date(),
    lastSeen: new Date()
  };

  const result = await db.insertOne(newUrl);

  if (!result.acknowledged) throw new Error('Failed to insert shorten url.');

  return { ...newUrl, _id: result.insertedId };
}

export default insertShortenUrl;



