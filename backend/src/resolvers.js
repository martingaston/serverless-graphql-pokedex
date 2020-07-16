const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient({endpoint: 'http://dynamodb:8000'})

const getPokemon = id => new Promise((resolve, reject) => {
  params = {
    "TableName": "pokedex",
    "Key": {
      "id": parseInt(id),
    }
  }

  dynamoDb.get(params, function(err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

exports.resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL!',
    pokemon: (parent, args, context) => getPokemon(args.id).then(data => data.Item)
  },
  Pokemon: {
    type: (parent) => parent.type.values
  }
}
