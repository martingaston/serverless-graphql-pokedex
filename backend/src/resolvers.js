const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://dynamodb:8000'})
const TABLE_NAME = "pokedex"

const getPokemon = id => {
  const params = {
    "TableName": TABLE_NAME,
    "Key": {
      "id": parseInt(id),
    }
  }

  return dynamoDb.get(params).promise().then(data => data.Item)
}

const getAllPokemon = () => {
  const params = {
    "TableName": TABLE_NAME
  }

  return dynamoDb.scan(params).promise().then(data => data.Items)
}

const likePokemon = id => {
  const params = {
    "TableName": TABLE_NAME,
    "Key": {
      "id": parseInt(id),
    },
    "UpdateExpression": "SET likes = likes + :i",
    "ExpressionAttributeValues": {
      ":i": 1
    },
    "ReturnValues": "ALL_NEW",
  }

  return dynamoDb.update(params).promise().then(data => data.Attributes)
}


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
    type: (parent) => parent.type.values
  }
}
