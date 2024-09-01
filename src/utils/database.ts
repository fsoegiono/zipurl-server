import { pool } from '@/config';

const connectDB = async (): Promise<void> => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Failed to connect to PostgreSQL database:', error);
    process.exit(1);
  }
};

const disconnectDB = async (): Promise<void> => {
  try {
    await pool.end();
    console.log('Disconnected from PostgreSQL database');
  } catch (error) {
    console.error('Error disconnecting from PostgreSQL database:', error);
  }
};

export {
  connectDB,
  disconnectDB
}