import { pool } from '@/config';
import { UrlSchema } from '@/api/v1/interfaces';

const getLongUrl = async (shortCode: string): Promise<UrlSchema | null> => {
  const query = 'SELECT long_url FROM urls WHERE short_code = $1';
  const result = await pool.query(query, [shortCode]);
  return result?.rows[0] || null;
}

const getShortUrlCode = async (longUrl: string): Promise<UrlSchema | null> => {
  const query = 'SELECT short_code FROM urls WHERE long_url = $1';
  const result = await pool.query(query, [longUrl]);
  return result?.rows[0] || null;
}

export {
  getLongUrl,
  getShortUrlCode
};