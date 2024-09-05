import { CorsOptions } from "cors";

import databaseClient from "@/config/database";
import rateLimit from 'express-rate-limit';

const port = process.env.PORT || 8080;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000,';
const clientURL = process.env.CLIENT_URL;
const corsOptions: CorsOptions = {
  origin: (originUrl, callback) => {
    // Check if the request origin matches the allowed origin
    // In dev mode, 'origin' might be undefined for same-origin requests
    if ((originUrl && allowedOrigin.includes(originUrl)) || !originUrl) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  optionsSuccessStatus: 200
};
const apiAccessRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 1000 requests per windowMs
});

export {
  port,
  baseUrl,
  allowedOrigin,
  corsOptions,
  databaseClient,
  apiAccessRateLimit,
  clientURL
}