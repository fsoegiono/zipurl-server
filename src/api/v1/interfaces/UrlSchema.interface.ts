import { ObjectId } from 'mongodb';

interface UrlSchema {
  _id?: ObjectId;
  longUrl: string;
  shortCode: string;
  createdAt: Date;
  lastSeen: Date;
}

export default UrlSchema;