const AWS = require('aws-sdk')

const documentClientOptions = {}
documentClientOptions.endpoint = 'http://dynamodb:8000'

const dynamoDb = new AWS.DynamoDB.DocumentClient(documentClientOptions)
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

exports.getAllPokemon = async () => {
  const params = {
    "TableName": TABLE_NAME
  }

  query = await dynamoDb.scan(params).promise().then(data => data.Items)
  console.log(query)

  query.sort((a, b) => {
    if(a.id < b.id) {
      return -1
    }
    if(b.id > a.id) {
      return 1
    }
    return 0
  })

  return query
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

