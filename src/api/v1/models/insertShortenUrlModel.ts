import { pool } from '@/config';
import { UrlSchema } from '@/api/v1/interfaces';

const insertShortenUrl = async (longUrl: string, shortCode: string): Promise<UrlSchema> => {
  const query = `
    INSERT INTO urls (long_url, short_code)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [longUrl, shortCode];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export default insertShortenUrl;



