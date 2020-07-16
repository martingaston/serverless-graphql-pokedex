const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://dynamodb:8000'})
const TABLE_NAME = "pokedex"

exports.getPokemon = id => {
  const params = {
    "TableName": TABLE_NAME,
    "Key": {
      "id": parseInt(id),
    }
  }

  return dynamoDb.get(params).promise().then(data => data.Item)
}

exports.getAllPokemon = () => {
  const params = {
    "TableName": TABLE_NAME
  }

  return dynamoDb.scan(params).promise().then(data => data.Items)
}

exports.likePokemon = id => {
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

