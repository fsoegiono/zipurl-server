import express, { Express, json } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { corsOptions, apiAccessRateLimit } from '@/config';
import { shortenUrlRoutes, redirectShortUrlRoutes } from '@/api/v1/routes';

const app: Express = express();

app.use(helmet()); // mitigate some well-known web vulnerabilities
app.use(apiAccessRateLimit);
app.use(cors(corsOptions));
app.use(json({ limit: '100kb' }));

app.use('/', redirectShortUrlRoutes);
app.use('/api/v1', shortenUrlRoutes);

export default app;