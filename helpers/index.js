
const { connectToMongoDB } = require('./connectToMongo');
const { generateJwtToken } = require('./generateJwtToken');

module.exports = {
  connectToMongoDB,
  generateJwtToken,
}