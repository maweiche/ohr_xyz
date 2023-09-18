import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}
export async function connectToDatabase() {
  const client = await MongoClient.connect(MONGODB_URI);
  return client;
}
