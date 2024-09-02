import { getLongUrl } from "@/api/v1/models";

const redirectShortUrl = async (shortCode: string) => {
  try {
    const findByLongUrl = await getLongUrl(shortCode);

    if (findByLongUrl) return { status: 200, url: findByLongUrl.longUrl }
    
    return { status: 404, error: 'URL not found' }
  } catch (error) {
    console.error(error);
    return {status: 500, error: 'Internal server error' };
  }
}

export default redirectShortUrl;