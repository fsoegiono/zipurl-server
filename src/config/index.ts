import { CorsOptions } from "cors";

const port = process.env.PORT || 8080;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Check if the request origin matches the allowed origin
    // In dev mode, 'origin' might be undefined for same-origin requests
    if (origin === allowedOrigin || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  optionsSuccessStatus: 200
};

export {
  port,
  baseUrl,
  allowedOrigin,
  corsOptions
}