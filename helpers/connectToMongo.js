const dotenv = require('dotenv')

const chalk = require('chalk');
const { MongoClient } = require('mongodb');
dotenv.config() 

async function connectToMongoDB() {
  console.log({ DB_URL: process.env.DB_URL, DB_NAME: process.env.DB_NAME })
  
  const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log(chalk.green('Connected to MongoDB successfully'));
    return client.db(process.env.DB_NAME);
  } catch (err) {
    console.error(chalk.red('Error connecting to MongoDB:', err));
    process.exit(1);
  }
}

module.exports = {
  connectToMongoDB,
};
