import { port, baseUrl } from '@/config';
import { connectDB, disconnectDB } from '@/utils/database';

async function startServer() {
  try {
    await connectDB();

    const { default: app } = await import('@/app');
    
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