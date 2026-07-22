from fastapi import FastAPI
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
