const { MongoClient } = require("mongodb");
const uri =
  `mongodb+srv://${env.USER}:${env.PASS}@cluster0.zn03d.mongodb.net/Crypto?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function insertToDB(records) {
  try {
    await client.connect();
    const collection = client.db("crypto").collection("pages");
    await collection.insertOne(records);
  } finally {
    await client.close();
  }
}

async function getDBResults() {
  try {
    await client.connect();
    const collection = client.db("crypto").collection("pages");
    const result = await collection.find().sort({ _id: -1 }).toArray();
    return result;
  } catch {
    return [];
  } finally {
    await client.close();
  }
}

async function getLastDBResult() {
  try {
    await client.connect();
    const collection = client.db("crypto").collection("pages");
    const result = await collection.find().sort({ _id: -1 }).limit(1).toArray();
    return result;
  } catch {
    return [];
  } finally {
    await client.close();
  }
}

module.exports = { getDBResults, getLastDBResult, insertToDB };
