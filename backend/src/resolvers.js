const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://dynamodb:8000'})

const getPokemon = id => {
  params = {
    "TableName": "pokedex",
    "Key": {
      "id": parseInt(id),
    }
  }

  return dynamoDb.get(params).promise()
}


exports.resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL!',
    pokemon: (parent, args, context) => getPokemon(args.id).then(data => data.Item)
  },
  Pokemon: {
    type: (parent) => parent.type.values
  }
}
