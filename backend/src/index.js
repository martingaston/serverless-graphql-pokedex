const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
    hello: String!
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL!'
  }
}

const server = new ApolloServer({typeDefs, resolvers})

exports.handler = server.createHandler()
