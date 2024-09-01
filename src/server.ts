import http from 'http';
import app from '@/app';
import { port, baseUrl } from '@/config';
import { connectDB, disconnectDB } from '@/utils/database';

const server = http.createServer(app);

async function startServer() {
  try {
    await connectDB();
    
    const server = app.listen(port, () => {
      console.log(`Server is running on ${baseUrl}`);
    });

    // Handle shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(async () => {
        console.log('HTTP server closed');
        await disconnectDB();
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();