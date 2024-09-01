import express, { Router, Request, Response } from 'express';
import { redirectShortUrlController } from '@/api/v1/controller';
import { RedirectShortUrlParams, RedirectShortUrlResponse } from '@/api/v1/interfaces';
import { baseUrl } from '@/config';

const router: Router = express.Router();

router.get('/:shortCode', async (req: Request<RedirectShortUrlParams>, res: Response<RedirectShortUrlResponse>) => {
  const { params: {shortCode }} = req;
  const { status, error, url } = await redirectShortUrlController(shortCode);
  
  if (error) res.status(status).json({ error });
  
  if (url) res.redirect(url);
  else res.redirect(baseUrl);
});

export default router;