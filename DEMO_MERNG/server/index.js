const { ApolloServer,PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const express = require('express')

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
// const { MONGODB } = require('./config.js');
const pubsub = new PubSub();
// const app = express();
// const http = require('http');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: (url) => console.log(url),
  },
  context: ({ req }) => ({ req ,pubsub}),
 
});
// server.applyMiddleware({app});
// const httpServer = http.createServer(app);
// server.installSubscriptionHandlers(httpServer)

mongoose.connect("mongodb+srv://admin_nvq7089:adminnvq7089@cluster0-ohotd.mongodb.net/demoMlab?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
