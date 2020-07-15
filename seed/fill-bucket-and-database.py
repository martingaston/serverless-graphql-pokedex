import io
import boto3
import requests
from tqdm import tqdm
from time import sleep

DYNAMO_DB_TABLE_NAME = "pokedex"
POKE_API_URL = "https://pokeapi.co/api/v2"
S3_BUCKET = "mg-testybucket"
AWS_REGION = "eu-west-2"

def get_pokemon_api_url(id):
    return f"{POKE_API_URL}/pokemon/{id}"

def parse_pokemon_data_from_api_request(r):
    json = r.json()
    return {
        'id': json['id'],
        'name': json['name'],
        'type': parse_pokemon_type(json['types']),
        'sprite': json['sprites']['front_default'],
        'likes': 0
    }

def parse_pokemon_type(types):
    return {slot['type']['name'] for slot in types}

def put_pokemon_in_table(pokemon, table):
    table.put_item(Item=pokemon)

def upload_pokemon_image_to_bucket(sprite_url, bucket, s3_client):
    sprite = requests.get(sprite_url).content
    filename = get_filename_from_url(sprite_url)

    with io.BytesIO(sprite) as f:
        s3_client.upload_fileobj(f, bucket, filename)

    return f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{filename}"

def get_filename_from_url(sprite_url):
    return sprite_url.split("/")[-1]

if __name__ == "__main__":
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(DYNAMO_DB_TABLE_NAME)
    s3_client = boto3.client('s3')

    for id in tqdm(range(1, 5)):
        request = requests.get(get_pokemon_api_url(id))
        pokemon = parse_pokemon_data_from_api_request(request)
        sprite_upload_url = upload_pokemon_image_to_bucket(pokemon['sprite'], S3_BUCKET, s3_client)
        pokemon['sprite'] = sprite_upload_url
        put_pokemon_in_table(pokemon, table)
        sleep(0.5)

