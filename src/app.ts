import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { corsOptions } from '@/config';
import { shortenUrlRoutes, redirectShortUrlRoutes } from '@/api/v1/routes';

const app = express();

app.use(helmet()); // mitigate some well-known web vulnerabilities
app.use(cors(corsOptions));
app.use(express.json());

app.use('/', redirectShortUrlRoutes);
app.use('/api/v1', shortenUrlRoutes);

export default app;