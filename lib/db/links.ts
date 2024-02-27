import { MongoClient } from "mongodb";

export function resolveLink(path: string) {
  return getMongoClient().db('me').collection('links')
    .findOneAndUpdate({ path }, { $inc: { 'stats.refs': 1 } });
}

export function getLink(filter: object) {
  return getMongoClient().db('me').collection('links')
    .findOne(filter);
}

export function getLinks(pathRegex: string | null = null) {
  const filter = pathRegex == null ? {} : { "path": { "$regex": pathRegex} };
  return getMongoClient().db('me').collection('links')
    .find(filter).toArray();
}

export function addLink(path: string, destination: string) {
  return getMongoClient().db('me').collection('links').insertOne(
    {
      path, destination,
      stats: {refs: 0},
      createdAt: new Date(),
      updatedAt: new Date()
    }
  );
}

export function updateLink(path: string, update: object) {
  return getMongoClient().db('me').collection('links')
    .updateOne({ path }, { $set: update });
}

function getMongoClient() {
  const dbUri = process.env.DB_URI;
  if (dbUri == undefined) {
    throw new Error("DB_URI not defined");
  }
  return new MongoClient(dbUri);
}
