import { MongoClient, Collection, InsertOneResult } from "mongodb";

interface Props<T> {
  url: string;
  dbName: string;
  collectionName: string;
  data: T;
}

async function MongoDBInsert<T>({
  url,
  dbName,
  collectionName,
  data,
}: Props<T>): Promise<InsertOneResult> {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection: Collection<T> = db.collection(collectionName);
  // const result: InsertOneResult = await collection.insertOne(data);
  client.close();
  return {} as InsertOneResult;
}

export default MongoDBInsert;
