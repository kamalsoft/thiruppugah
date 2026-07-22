import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SONGS_DIR = os.path.join(BASE_DIR, "songs")
INDEX_FILE = os.path.join(SONGS_DIR, "index.json")
PLACES_FILE = os.path.join(SONGS_DIR, "place_mappings.json")
