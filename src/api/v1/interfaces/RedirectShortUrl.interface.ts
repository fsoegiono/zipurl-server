interface RedirectShortUrlParams {
  shortCode: string;
}

interface RedirectShortUrlResponse {
  error?: string;
  url?: string;
}

export {
  RedirectShortUrlParams,
  RedirectShortUrlResponse
}