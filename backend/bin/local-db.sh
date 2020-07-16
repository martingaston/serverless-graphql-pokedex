aws dynamodb create-table \
  --endpoint-url http://localhost:8000 \
  --table-name pokedex \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --attribute-definitions \
    AttributeName=id,AttributeType=N\
  --key-schema \
    AttributeName=id,KeyType=HASH
