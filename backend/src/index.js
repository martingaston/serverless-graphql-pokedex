const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
    hello: String!
    allPokemon: [Pokemon]!
    pokemon(id: ID!): Pokemon
  }

  type Mutation {
    likePokemon(id: ID!): Pokemon
  }

  type Pokemon {
    id: ID!
    name: String
    type: [String]
    sprite: String
    likes: Int
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL!'
  }
}

const server = new ApolloServer({typeDefs, resolvers})

exports.handler = server.createHandler()
