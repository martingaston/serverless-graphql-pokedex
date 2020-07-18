const { getAllPokemon, getPokemon, likePokemon } = require('./db.js')

exports.resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL!',
    allPokemon: (parent, args, context) => getAllPokemon(),
    pokemon: (parent, args, context) => getPokemon(args.id)
  },
  Mutation: {
    likePokemon: (parent, args, context) => likePokemon(args.id)
  },
  Pokemon: {
    type: (parent) => parent.type
  }
}
