import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (uri && (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"))) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!clientPromise) return null;
  return await clientPromise;
}

export async function getMongoDb(): Promise<Db | null> {
  const c = await getMongoClient();
  if (!c) return null;
  const dbName = process.env.MONGODB_DB_NAME || "bazardor";
  return c.db(dbName);
}

export default clientPromise;
