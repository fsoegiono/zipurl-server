import { Collection, Db } from 'mongodb';
import { databaseClient } from '@/config';
import { UrlSchema } from '@/api/v1/interfaces';

let db: Db;

const connectDB = async (): Promise<void> => {
  try {
    await databaseClient.connect();
    db = await databaseClient.db('ShortenUrls');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB database:', error);
    process.exit(1);
  }
};

const disconnectDB = async (): Promise<void> => {
  try {
    await databaseClient.close();
    console.log('Disconnected from MongoDB database');
  } catch (error) {
    console.error('Error disconnecting from MongoDB database:', error);
  }
};

const getCollection = (): Collection<UrlSchema> => {
  if (!db) throw new Error('Database not connected. Call connectDB first.');
  
  const collection = 'urls';
  return db.collection(collection);
}

export {
  connectDB,
  disconnectDB,
  getCollection
}