import io
import boto3
import json
import os
from tqdm import tqdm

DYNAMO_DB_TABLE_NAME = "pokedex"
POKE_API_URL = "https://pokeapi.co/api/v2"
S3_BUCKET = "mg-testybucket"
AWS_REGION = "eu-west-2"
OUTPUT_FILENAME = "pokedex.json"
SPRITE_FOLDER = "sprites"

def is_dev():
    return os.getenv('ENV') == 'local'

def get_db():
    if is_dev():
        return boto3.resource('dynamodb', endpoint_url='http://localhost:8000')

    return boto3.resource('dynamodb')

def put_pokemon_in_table(pokemon, table):
    table.put_item(Item=pokemon)

def upload_pokemon_image_to_bucket(sprite_path, bucket, s3_client):
    filename = get_filename_from_path(sprite_url)

    with open(sprite_path, "rb") as f:
        s3_client.upload_fileobj(f, bucket, filename)

    return f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{filename}"

def get_filename_from_path(sprite_path):
    return sprite_path.split("/")[-1]

def load_pokedex():
    with open(OUTPUT_FILENAME) as f:
        pokedex = json.load(f)
        return pokedex

if __name__ == "__main__":
    dynamodb = get_db()
    table = dynamodb.Table(DYNAMO_DB_TABLE_NAME)
    s3_client = boto3.client('s3')

    pokedex = load_pokedex()
    for pokemon in tqdm(pokedex):
        if is_dev():
            pokemon['sprite'] = f"/images/{pokemon['id']}.png"
        else:
            sprite_address = upload_pokemon_image_to_bucket(f"{SPRITE_FOLDER}/{pokemon['id']}.png", S3_BUCKET, s3_client)
            pokemon['sprite'] = sprite_address

        put_pokemon_in_table(pokemon, table)
