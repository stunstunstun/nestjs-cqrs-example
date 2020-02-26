module.exports = async () => {
  // eslint-disable-next-line
  const client = global.__MONGODB_CLIENT__;
  const db = await client.db();
  await db.collection('events').drop();
  await db.collection('mileages').drop();
  await client.close();
};