const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
  const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');
    return client.db(process.env.DB_NAME);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

module.exports = {
  connectToMongoDB,
};
