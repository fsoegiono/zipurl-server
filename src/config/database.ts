import { MongoClient } from 'mongodb';

const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const databaseClient = new MongoClient(mongoDbUri);

export default databaseClient;