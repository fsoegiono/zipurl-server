import express, { Router, Request, Response } from 'express';
import { redirectShortUrlController } from '@/api/v1/controller';
import { RedirectShortUrlParams, RedirectShortUrlResponse } from '@/api/v1/interfaces';

const router: Router = express.Router();

router.get('/:shortCode', (req: Request<RedirectShortUrlParams>, res: Response<RedirectShortUrlResponse>) => {
  const { params: {shortCode }} = req;
  const { status, error, url } = redirectShortUrlController(shortCode);
  
  if (error) res.status(status).json({ error });
  res.redirect(url);
});

export default router;