import io
import json
import requests
import os
from tqdm import tqdm
from time import sleep

POKE_API_URL = "https://pokeapi.co/api/v2"
OUTPUT_FILENAME = "pokedex.json"
SPRITE_FOLDER = "sprites"

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
    return [slot['type']['name'] for slot in types]

def save_sprite(pokemon):
    if not os.path.exists(SPRITE_FOLDER):
        os.makedirs(SPRITE_FOLDER)

    sprite = requests.get(pokemon['sprite']).content
    with io.BytesIO(sprite) as f:
        with open(f"{SPRITE_FOLDER}/{pokemon['id']}.png", "wb") as outfile:
            outfile.write(f.getbuffer())

if __name__ == "__main__":
    pokedex = []
    for id in tqdm(range(1, 152)):
        request = requests.get(get_pokemon_api_url(id))
        pokemon = parse_pokemon_data_from_api_request(request)
        save_sprite(pokemon)
        pokedex.append(pokemon)
        sleep(0.25)

    with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
        json.dump(pokedex, f, ensure_ascii=False, indent=2)

