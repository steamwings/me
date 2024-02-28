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
  const filter = pathRegex == null ? {}
    : { "path": { "$regex": pathRegex} };
  return getMongoClient().db('me').collection('links')
    .find(filter).toArray();
}

export function addLink(path: string, destination: string) {
  return getMongoClient().db('me').collection('links')
    .insertOne(
      {
        path, destination,
        stats: {refs: 0},
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );
}

export function updateLink(path: string, destination: string) {
  return getMongoClient().db('me').collection('links')
    .updateOne({ path },
      { $set: { destination },
        $currentDate: { updatedAt: true }
      });
}

export async function deleteLink(path: string) {
  const db = getMongoClient().db('me');
  const doc = await db.collection('links').findOneAndDelete({ path });
  return await db.collection('links-archive')
    .insertOne({ ...doc, deletedAt: new Date() });
}

function getMongoClient() {
  const dbUri = process.env.MONGODB_URI;
  if (dbUri == undefined) {
    throw new Error("MONGODB_URI not defined");
  }
  return new MongoClient(dbUri);
}
