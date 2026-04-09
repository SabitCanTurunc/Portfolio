import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

declare global {
  // eslint-disable-next-line no-var
  var mongoClientPromise: Promise<MongoClient> | undefined
}

export function getMongoClientPromise() {
  if (!uri) {
    throw new Error('MONGODB_URI tanimli degil.')
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global.mongoClientPromise) {
      const client = new MongoClient(uri)
      global.mongoClientPromise = client.connect()
    }
    return global.mongoClientPromise
  } else {
    const client = new MongoClient(uri)
    return client.connect()
  }
}
