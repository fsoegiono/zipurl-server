import urlDatabase from '@/utils/database';

const redirectShortUrl = (shortCode: string) => {
  const longUrl = urlDatabase.get(shortCode);

  if (longUrl) return { status: 200, url: longUrl }
  else return { status: 404, error: 'URL not found' }
}

export default redirectShortUrl;