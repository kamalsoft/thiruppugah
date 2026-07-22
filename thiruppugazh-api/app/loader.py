import os
import json
from typing import List, Dict, Optional
from app.config import INDEX_FILE, PLACES_FILE, SONGS_DIR

class SongDatabase:
    def __init__(self):
        self.songs_index: List[Dict] = []
        self.places_index: List[Dict] = []
        self.load_indexes()

    def load_indexes(self):
        if os.path.exists(INDEX_FILE):
            with open(INDEX_FILE, 'r', encoding='utf-8') as f:
                self.songs_index = json.load(f)
        
        if os.path.exists(PLACES_FILE):
            with open(PLACES_FILE, 'r', encoding='utf-8') as f:
                self.places_index = json.load(f)

    def get_song_by_number(self, song_num: int) -> Optional[Dict]:
        song_file = os.path.join(SONGS_DIR, f"song_{song_num}.json")
        if os.path.exists(song_file):
            with open(song_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return None

    def search_songs(
        self, 
        query: Optional[str] = None, 
        place: Optional[str] = None, 
        raga: Optional[str] = None, 
        thala: Optional[str] = None,
        chandam: Optional[str] = None
    ) -> List[Dict]:
        results = []

        for item in self.songs_index:
            # Filter by place
            if place and place.lower() not in item.get("category_or_place", "").lower():
                continue

            # Filter by raga
            if raga and raga.lower() not in item.get("raga", "").lower():
                continue

            # Filter by thala
            if thala and thala.lower() not in item.get("thala", "").lower():
                continue

            # Filter by chandam
            if chandam and chandam.lower() not in item.get("chandam_structure", "").lower():
                continue

            # Text search across lyrics/title
            if query:
                song_detail = self.get_song_by_number(item["song_number"])
                if not song_detail:
                    continue
                
                search_target = f"{song_detail['title']} {song_detail['category_or_place']} {song_detail['full_text']}".lower()
                if query.lower() not in search_target:
                    continue

            results.append(item)

        return results

db = SongDatabase()
