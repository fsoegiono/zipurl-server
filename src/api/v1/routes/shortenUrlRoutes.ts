import express, { Router, Request, Response } from 'express';

import { shortenUrlController } from '@/api/v1/controller';
import { ShortenUrlBodyRequest, ShortenUrlResponse } from '@/api/v1/interfaces';
import { clientUrl } from '@/config';

const router: Router = express.Router();

router.post('/shorten', async (req: Request<{}, {}, ShortenUrlBodyRequest>, res: Response<ShortenUrlResponse>) => {
  const { body: { longUrl }} = req;
  const { status, error, shortUrl } = await shortenUrlController(longUrl);

  if (error) return res.redirect(`${clientUrl}/${status}`);
  return res.json({ shortUrl });
});

export default router;