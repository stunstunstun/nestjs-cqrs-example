import { MongoClient } from 'mongodb';
import { userIds } from './fixtures/event.fixture';

module.exports = async () => {
  const client = await MongoClient.connect('mongodb://127.0.0.1/mileages', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db();

  const [first, second] = userIds;
  const now = new Date();

  await db.collection('mileages').insertMany([
    { userId: first, amount: 0, updated: now, created: now },
    { userId: second, amount: 0, updated: now, created: now },
  ]);

  // eslint-disable-next-line
  global.__MONGODB_CLIENT__ = client;
};