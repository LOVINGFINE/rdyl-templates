import AppConfig from '@/App.config';
import { MongoClient } from 'mongodb';

const { host, port, database: dbName } = AppConfig.mongod;

export const client = new MongoClient(`mongodb://${host}:${port}`);

export const database = client.db(dbName);

export function getCollectionBy(name: string) {
  return database.collection(name);
}

export async function syncDatabaseIndex() {
  for (const collection of Object.values(MongoDbCollections)) {
    await collection.createIndex({ id: 1 }, { unique: true });
  }
}

export async function connect() {
  try {
    await client.connect();
    console.log('Mongodb: MongoClient connected');
  } catch (e) {
    console.log(`Mongodb: ${e}`);
  }
}

/** @constant mongodb文档集合 */
export const MongoDbCollections = {
  users: getCollectionBy('users'),
};

export * from './lib/selector';
