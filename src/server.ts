import http from 'http';
import app from '@/app';
import { port, baseUrl } from '@/config';

const server = http.createServer(app);

function startServer() {
  server.listen(port, () => {
    console.log(`Server running on ${baseUrl}`);
  });
}

startServer();