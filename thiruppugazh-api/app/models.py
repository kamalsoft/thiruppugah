from typing import List, Optional
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
