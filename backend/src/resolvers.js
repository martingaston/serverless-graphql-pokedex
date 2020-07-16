const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://dynamodb:8000'})

const getPokemon = id => {
  const params = {
    "TableName": "pokedex",
    "Key": {
      "id": parseInt(id),
    }
  }

  return dynamoDb.get(params).promise().then(data => data.Item)
}

const getAllPokemon = () => {
  const params = {
    "TableName": "pokedex"
  }

  return dynamoDb.scan(params).promise().then(data => data.Items)
}


exports.resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL!',
    allPokemon: (parent, args, context) => getAllPokemon(),
    pokemon: (parent, args, context) => getPokemon(args.id)
  },
  Pokemon: {
    type: (parent) => parent.type.values
  }
}
