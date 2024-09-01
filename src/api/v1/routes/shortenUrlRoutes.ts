import express, { Router, Request, Response } from 'express';

import { shortenUrlController } from '@/api/v1/controller';
import { ShortenUrlBodyRequest, ShortenUrlResponse } from '@/api/v1/interfaces';

const router: Router = express.Router();

router.post('/shorten', (req: Request<{}, {}, ShortenUrlBodyRequest>, res: Response<ShortenUrlResponse>) => {
  const { body: { longUrl }} = req;
  const { status, error, shortUrl } = shortenUrlController(longUrl);

  if (error) res.status(status).json({ error });
  res.json({ shortUrl });
});

export default router;