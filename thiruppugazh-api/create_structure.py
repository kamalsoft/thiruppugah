import os

# Define files and their content
FILES = {
    "requirements.txt": """fastapi>=0.100.0
uvicorn>=0.22.0
pydantic>=2.0.0
""",

    "app/__init__.py": "",
    "app/routes/__init__.py": "",

    "app/config.py": """import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SONGS_DIR = os.path.join(BASE_DIR, "songs")
INDEX_FILE = os.path.join(SONGS_DIR, "index.json")
PLACES_FILE = os.path.join(SONGS_DIR, "place_mappings.json")
""",

    "app/models.py": """from typing import List, Optional
from pydantic import BaseModel

class SongSummary(BaseModel):
    song_number: int
    title: str
    category_or_place: str
    raga: str
    thala: str
    chandam_structure: Optional[str] = ""

class SongDetail(SongSummary):
    chandam: List[str] = []
    lyrics: List[str] = []
    full_text: str

class PlaceMapping(BaseModel):
    place: str
    total_songs: int
    song_numbers: List[int]

class PaginatedSongResponse(BaseModel):
    total: int
    page: int
    limit: int
    results: List[SongSummary]
""",

    "app/loader.py": """import os
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
""",

    "app/routes/songs.py": """from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from app.models import SongSummary, SongDetail, PlaceMapping, PaginatedSongResponse
from app.loader import db

router = APIRouter(prefix="/api", tags=["Songs"])

@router.get("/songs", response_model=PaginatedSongResponse)
def get_songs(
    q: Optional[str] = Query(None, description="Search term for lyrics or title"),
    place: Optional[str] = Query(None, description="Filter by place or category"),
    raga: Optional[str] = Query(None, description="Filter by raga"),
    thala: Optional[str] = Query(None, description="Filter by thala"),
    chandam: Optional[str] = Query(None, description="Filter by chandam pattern"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page")
):
    all_matched = db.search_songs(query=q, place=place, raga=raga, thala=thala, chandam=chandam)
    
    total = len(all_matched)
    start = (page - 1) * limit
    end = start + limit
    paginated_results = all_matched[start:end]

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "results": paginated_results
    }

@router.get("/songs/{song_number}", response_model=SongDetail)
def get_song_detail(song_number: int):
    song = db.get_song_by_number(song_number)
    if not song:
        raise HTTPException(status_code=404, detail=f"Song number {song_number} not found.")
    return song

@router.get("/places", response_model=list[PlaceMapping])
def get_places():
    return db.places_index
""",

    "app/main.py": """from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import songs

app = FastAPI(
    title="Thiruppugazh Search API",
    description="API server for querying Thiruppugazh songs, lyrics, places, and chandam patterns.",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(songs.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to Thiruppugazh API",
        "docs": "/docs"
    }
"""
}

def build_project():
    print("Creating FastAPI Backend Structure...")
    for path, content in FILES.items():
        dir_name = os.path.dirname(path)
        if dir_name:
            os.makedirs(dir_name, exist_ok=True)
            
        with open(path, "w", encoding="utf-8") as f:
            f.write(content.strip() + "\n")
        print(f" -> Created {path}")

    print("\nProject Structure Created Successfully!")

if __name__ == "__main__":
    build_project()