const { ApolloServer } = require('apollo-server-lambda')
const { typeDefs } = require('./schema.js')
const { resolvers } = require('./resolvers.js')

const server = new ApolloServer({typeDefs, resolvers})

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  }
})
