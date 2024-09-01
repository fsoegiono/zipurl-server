interface ShortenUrlBodyRequest {
  longUrl: string;
}

interface ShortenUrlResponse {
  error?: string
  shortUrl?: string
}

export {
  ShortenUrlBodyRequest,
  ShortenUrlResponse
}