const chalk = require('chalk');
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { findOrCreateUser } = require('./controllers/userController');
require('dotenv').config();

// const uri = "mongodb+srv://employme:vitor123@cluster0.b6tyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const uri = 'mongodb+srv://vitorboccio:Vitor.123@cluster0.0duim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
})
.then(() => console.log(chalk.green('db connect')))
.catch(err => console.log(chalk.red('error connecting to db', err)));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization
      if (authToken) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (err) {
      console.error('unable to auth user', err)
    }
    return { currentUser }
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(chalk.blueBright(`server listening on ${url}`))
});