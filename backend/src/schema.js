const { gql } = require("apollo-server-lambda")

exports.typeDefs = gql`
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
